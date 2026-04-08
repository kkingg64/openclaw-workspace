import { SkillContext, SkillArgs } from '@openclaw/core';

// --- Constants ---
const GITHUB_MODELS_API_URL = 'https://models.inference.ai.azure.com/chat/completions';
const DEFAULT_MODEL = 'gpt-4.1';        // confirmed working 2026-04-01
const SECURITY_MODEL = 'o4-mini';       // reasoning model, better for security audit
const MAX_TOKENS = 4096;

type ReviewType = 'design_review' | 'code_review' | 'uat_review' | 'security_review' | 'strategy';

interface CopilotReviewerArgs extends SkillArgs {
  problem: string;
  context: string;
  review_type: ReviewType;
  focus?: string[];
  model?: string; // override default model (e.g. 'o4-mini' for security, 'gpt-4.1' for strategy)
}

// --- Prompt builder ---
function buildReviewPrompt(
  problem: string,
  context: string,
  reviewType: ReviewType,
  focus: string[]
): string {
  const rolesByType: Record<ReviewType, string> = {
    design_review: `You are a Senior Technical Architect reviewing a design document for feasibility.
Focus on: whether proposed components have real library/framework support, whether data structures are sound, 
whether the design can actually be implemented as specified, and whether there are any OWASP security concerns.`,

    code_review: `You are a Senior Code Reviewer (reference: Superpowers code-reviewer agent).
You MUST verify independently — do NOT trust any claims in the submission.
Focus on: code correctness, anti-patterns, TypeScript type safety, test coverage, dead code, 
unused imports, single responsibility principle, and whether each file has a clear interface.
CRITICAL: Flag any Math.random() used for data generation, hardcoded mock/dummy/fake data, 
placeholder content, or TODO/FIXME/HACK comments that indicate incomplete work.`,

    uat_review: `You are a UAT Compliance Reviewer.
Verify that: every test case has corresponding evidence (screenshot path or command output),
all P0 test cases are marked PASS with evidence, test results match actual code behavior,
no test scenarios are missing, and all API integrations return real data (not static JSON).`,

    security_review: `You are a Security Engineer (OWASP expert).
Check for: XSS/SQL injection vulnerabilities, hardcoded credentials or API keys, 
missing input sanitization, missing rate limiting, missing authentication/authorization,
exposed server information in headers, and insecure data transmission.`,

    strategy: `You are a Senior Business Strategy Advisor.
Analyze: market fit, ROI potential, competitive differentiation, go-to-market risks,
resource requirements, timeline realism, and business model sustainability.
Be direct about risks. Identify assumptions that could invalidate the business case.`,
  };

  const role = rolesByType[reviewType];
  const focusSection = focus.length > 0
    ? `\n## Specific Focus Areas\n${focus.map((f, i) => `${i + 1}. ${f}`).join('\n')}\n`
    : '';

  return `${role}

## Task
${problem}

${focusSection}

## Material to Review
${context}

## CRITICAL INSTRUCTIONS
- Do NOT trust any claims in the material — verify independently by reading actual content
- Flag any evidence of "delivery hallucination" (claims without evidence, mock data passed as real)
- Be specific: cite exact lines, exact file paths, exact values when reporting issues

## Required Output Format

### Verdict: ✅ PASS / ❌ FAIL / ⚠️ CONDITIONAL

### Strengths
[What was done well]

### Issues Found
**Critical (must fix before proceeding):**
- [issue with file:line reference]

**Important (should fix):**
- [issue with details]

**Minor (suggestions):**
- [issue]

### Anti-Hallucination Check
- [ ] No Math.random() for data generation
- [ ] No hardcoded mock/dummy/fake data
- [ ] No placeholder/TODO/TBD content
- [ ] All API routes return real data
- [ ] All claims have supporting evidence

### Recommendation
[PASS to next phase / BLOCK with specific fixes needed]`;
}

// --- GitHub Models API call ---
async function callGitHubModel(prompt: string, model: string): Promise<string> {
  const apiKey = process.env.GITHUB_PERSONAL_ACCESS_TOKENS_CLASSIC;
  if (!apiKey) {
    throw new Error('GITHUB_PERSONAL_ACCESS_TOKENS_CLASSIC not set — cannot call GitHub Models');
  }

  // o4-mini (reasoning model) uses max_completion_tokens instead of max_tokens
  const isReasoningModel = model.startsWith('o1') || model.startsWith('o3') || model.startsWith('o4');
  const tokenParam = isReasoningModel ? 'max_completion_tokens' : 'max_tokens';

  const response = await fetch(GITHUB_MODELS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      [tokenParam]: MAX_TOKENS,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub Models (${model}) API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || `No response from ${model}`;
}

// --- Main entry point ---
export default async function copilotReviewer(
  args: CopilotReviewerArgs,
  context: SkillContext
): Promise<string> {
  const {
    problem,
    context: reviewContext,
    review_type = 'code_review',
    focus = [],
    model: modelOverride,
  } = args;

  // Auto-select best model per review type if not overridden
  const model = modelOverride ?? (review_type === 'security_review' ? SECURITY_MODEL : DEFAULT_MODEL);

  context.log(`[Copilot Reviewer] Starting ${review_type} review...`);
  context.log(`[Copilot Reviewer] Problem: ${problem}`);
  context.log(`[Copilot Reviewer] Model: ${model}`);

  const prompt = buildReviewPrompt(problem, reviewContext, review_type, focus);

  try {
    const response = await callGitHubModel(prompt, model);

    const header = [
      `## 🤖 Copilot Reviewer Report (${model})`,
      `**Review Type:** ${review_type}`,
      `**Model:** ${model}`,`
      `**Timestamp:** ${new Date().toLocaleString('zh-HK', { timeZone: 'Asia/Hong_Kong' })} HKT`,
      '',
      '---',
      '',
    ].join('\n');

    context.log('[Copilot Reviewer] Review complete.');
    return header + response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    context.log(`[Copilot Reviewer] Error: ${errorMessage}`);

    if (errorMessage.includes('GITHUB_PERSONAL_ACCESS_TOKENS_CLASSIC')) {
      return `❌ Copilot Reviewer unavailable: GitHub token not configured.\nSet GITHUB_PERSONAL_ACCESS_TOKENS_CLASSIC in .env to enable GitHub Models reviews.`;
    }

    return `❌ Copilot Reviewer error: ${errorMessage}\nPlease retry or check API configuration.`;
  }
}

# Dispatch & Planning Protocol

## Parallel Agent Dispatch

When 2+ independent tasks exist, dispatch in parallel:

### Conditions
- Tasks have no shared state
- Tasks don't need each other's results
- Each agent gets self-contained context

### Template
```python
sessions_spawn(task="Read agents/cto/agent.md, then [tech task]")
sessions_spawn(task="Read agents/ciso/agent.md, then [security task]")
# Wait for both, then merge results
```

### Don't Parallel When:
- Sequential dependency (design before tech review)
- Modifying same file
- Need system-wide state analysis

## Plan Document Standard

Every Phase 3 Tech Spec and Phase 1 Research must follow:

```markdown
# [ProjectID] [Phase Name] Plan

**Goal:** [one sentence]
**Architecture:** [2-3 sentences]
**Tech Stack:** [key technologies]

---

### Task N: [Component]

**Files:**
- Create: `exact/path/to/file.ts`
- Modify: `exact/path/to/file.ts:123-145`
- Test: `exact/path/to/test.ts`

- [ ] Step 1: Write failing test
- [ ] Step 2: Run → verify FAIL
- [ ] Step 3: Implement
- [ ] Step 4: Run → verify PASS
- [ ] Step 5: Commit
```

Plans must be reviewed by plan-document-reviewer before execution.
See: `skills/verification/plan_reviewer_prompt.md`

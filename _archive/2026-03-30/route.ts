// API Route for Meal Generation - OpenAI-Compatible (MiniMax)
import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_MINIMAX_BASE_URL = 'https://api.minimax.io/v1';

export async function POST(request: NextRequest) {
  const MINIMAX_BASE_URL = process.env.MINIMAX_BASE_URL || DEFAULT_MINIMAX_BASE_URL;
  const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY;
  
  if (!MINIMAX_API_KEY) {
    return NextResponse.json({ 
      success: false, 
      error: 'Server configuration error: API key missing' 
    }, { status: 500 });
  }
  
  try {
    const body = await request.json();
    const { cuisine, dietary } = body;

    // 使用 user 既 cuisine 同 dietary 參數
    const cuisineStr = cuisine || 'any';
    const dietaryStr = dietary && dietary.toLowerCase() !== 'none' && dietary.trim() !== '' 
      ? dietary 
      : 'no restriction';
    
    const prompt = `I need 3 ${cuisineStr} recipes. Dietary restriction: ${dietaryStr}. Output ONLY valid JSON, NO explanation.

{"recipes":[{"name":"番茄炒蛋","method":"炒","ingredients":[{"name":"番茄","quantity":"2個","category":"蔬菜"},{"name":"雞蛋","quantity":"3隻","category":"蛋類"},{"name":"鹽","quantity":"少許","category":"調味"}]},{"name":"麻婆豆腐","method":"炒","ingredients":[{"name":"豆腐","quantity":"1盒","category":"豆製品"},{"name":"牛肉","quantity":"100克","category":"肉類"},{"name":"辣椒","quantity":"1條","category":"蔬菜"}]},{"name":"蛋炒飯","method":"炒","ingredients":[{"name":"白飯","quantity":"1碗","category":"主食"},{"name":"雞蛋","quantity":"2隻","category":"蛋類"},{"name":"蔥","quantity":"2條","category":"蔬菜"}]}]}

IMPORTANT: 
- Cuisine must be: ${cuisineStr}
- Dietary restriction must be: ${dietaryStr}
- Replace the example recipes with REAL ${cuisineStr} recipes that match the dietary restriction.
- Use real ingredient names in Chinese.
- Output starts with { and ends with }.`;

    const apiKey = process.env.MINIMAX_API_KEY;
    if (!apiKey) {
      throw new Error('MINIMAX_API_KEY is not set');
    }
    
    // Use OpenAI-compatible chat completions endpoint
    const apiUrl = `${MINIMAX_BASE_URL}/chat/completions`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "MiniMax-M2.5",
        max_tokens: 8192,
        messages: [
          { role: 'user', content: prompt }
        ]
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MiniMax API error:', response.status, errorText);
      throw new Error(`MiniMax API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    console.log('Raw response (first 300 chars):', content.substring(0, 300));
    
    // Clean tokens
    content = content.replace(/<\|thought\|>/gi, '');
    content = content.replace(/<\|thinking_start\|>/gi, '');
    content = content.replace(/<\|thinking_end\|>/gi, '');
    content = content.replace(/<\|thinking\|>/gi, '');
    content = content.replace(/<\|[\w_]+\|>/gi, '');
    
    // Clean markdown
    content = content.replace(/```json/g, '').replace(/```/g, '');
    content = content.replace(/^```[\s\S]*?```$/gm, '');
    
    // Find JSON
    const jsonMatch = content.match(/\{[^{}]*"recipes"\s*:/);
    
    if (!jsonMatch) {
      console.log('No recipes key found. Content:', content.substring(0, 200));
      throw new Error('No valid JSON with recipes found in response');
    }
    
    const jsonStart = jsonMatch.index;
    let jsonStr = content.substring(jsonStart);
    
    // Find closing brace
    let braceCount = 0;
    let jsonEnd = -1;
    for (let i = 0; i < jsonStr.length; i++) {
      if (jsonStr[i] === '{') braceCount++;
      else if (jsonStr[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          jsonEnd = i;
          break;
        }
      }
    }
    
    if (jsonEnd === -1) {
      console.log('No valid JSON structure found. Content:', jsonStr.substring(0, 200));
      throw new Error('No valid JSON found in response');
    }
    
    jsonStr = jsonStr.substring(0, jsonEnd + 1);
    jsonStr = jsonStr.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
    
    console.log('Cleaned JSON string:', jsonStr.substring(0, 200));
    
    let recipes = null;
    try {
      const parsed = JSON.parse(jsonStr);
      recipes = parsed.recipes || parsed;
    } catch (parseErr: any) {
      console.log('Parse failed:', parseErr.message);
      console.log('JSON string attempt:', jsonStr.substring(0, 200));
      throw new Error('JSON parse failed: ' + parseErr.message);
    }

    const safeRecipes = Array.isArray(recipes) ? recipes.slice(0, 3) : [];
    
    if (safeRecipes.length === 0) {
      throw new Error('No recipes parsed from AI response');
    }

    return NextResponse.json({ success: true, recipes: safeRecipes });
  } catch (error: any) {
    console.error('Generate error:', error);
    
    const fallbackRecipes = [
      {
        "name": "洋蔥炒牛肉",
        "method": "炒",
        "ingredients": [
          { "name": "牛肉", "quantity": "200克", "category": "街市" },
          { "name": "洋蔥", "quantity": "1個", "category": "街市" },
          { "name": "醬油", "quantity": "1湯匙", "category": "超市" }
        ]
      },
      {
        "name": "清蒸石斑",
        "method": "蒸",
        "ingredients": [
          { "name": "石斑魚", "quantity": "1條", "category": "街市" },
          { "name": "薑蔥", "quantity": "適量", "category": "街市" },
          { "name": "豉油", "quantity": "1湯匙", "category": "超市" }
        ]
      },
      {
        "name": "蒜蓉炒菜心",
        "method": "炒",
        "ingredients": [
          { "name": "菜心", "quantity": "300克", "category": "街市" },
          { "name": "蒜頭", "quantity": "3瓣", "category": "街市" },
          { "name": "鹽", "quantity": "少許", "category": "超市" }
        ]
      }
    ];
    
    return NextResponse.json({ 
      success: true, 
      recipes: fallbackRecipes,
      isFallback: true 
    });
  }
}

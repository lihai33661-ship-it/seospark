/**
 * Shared AI call utility — OpenRouter primary, SiliconFlow fallback
 */
const OR_KEY = process.env.OPENROUTER_API_KEY || "";
const OR_URL = "https://openrouter.ai/api/v1/chat/completions";
const SF_KEY = process.env.SILICONFLOW_API_KEY || "";
const SF_URL = "https://api.siliconflow.cn/v1/chat/completions";

async function callOpenRouter(prompt: string, maxTokens: number, temp: number): Promise<string> {
  const res = await fetch(OR_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OR_KEY}`,
      "HTTP-Referer": "https://seospark.net",
      "X-Title": "SEO Spark",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-maverick",
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
      temperature: temp,
    }),
  });
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

async function callSiliconFlow(prompt: string, maxTokens: number, temp: number): Promise<string> {
  const res = await fetch(SF_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SF_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-ai/DeepSeek-V3",
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
      temperature: temp,
    }),
  });
  if (!res.ok) throw new Error(`SiliconFlow ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

export async function callAI(prompt: string, maxTokens = 2000, temp = 0.8): Promise<string> {
  try {
    return await callOpenRouter(prompt, maxTokens, temp);
  } catch (e) {
    console.warn("[AI] OpenRouter failed, falling back to SiliconFlow:", String(e).slice(0, 100));
    return callSiliconFlow(prompt, maxTokens, temp);
  }
}

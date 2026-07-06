/**
 * Shared AI call utility — reused across all products
 */
const KEY = process.env.OPENROUTER_API_KEY || "";
const URL = "https://openrouter.ai/api/v1/chat/completions";

export async function callAI(prompt: string, maxTokens = 2000, temp = 0.8): Promise<string> {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
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
  if (!res.ok) throw new Error(`AI error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

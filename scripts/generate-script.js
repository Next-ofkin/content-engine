const OpenAI = require("openai");
const fs = require("fs");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function generateScript(topic) {
  const config = JSON.parse(fs.readFileSync("./scripts/niche-config.json", "utf8"));

  const prompt = `You are writing a short script for a faceless YouTube Short.
Niche: ${config.niche}
Tone: ${config.tone}
Topic: ${topic}

Write a script with exactly three parts, labeled clearly:
HOOK: (1 sentence, attention-grabbing, under 12 words)
BODY: (2-3 sentences explaining the surprising fact or insight)
TAKEAWAY: (1 sentence, a clear closing thought or call to action)

Keep total script under 60 words. Output ONLY the three labeled parts, nothing else.`;

  const response = await client.chat.completions.create({
    model: "openrouter/free",
    messages: [{ role: "user", content: prompt }],
  });

  const script = response.choices[0].message.content;
  // UPDATED PATH BELOW:
  fs.writeFileSync("./output/latest-script.txt", script);
  console.log("Script generated:");
  console.log(script);
}

const topic = process.argv[2] || "a surprising fact about mobile money in Africa";
generateScript(topic);
// File: pages/api/generate.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { type, input } = req.body;
  if (!type || !input) {
    return res.status(400).json({ error: "Missing `type` or `input`" });
  }

  let systemPrompt;
  switch (type) {
    case "script":
      systemPrompt = `You are a professional video scriptwriter…`; // etc.
      break;
    case "title":
      systemPrompt = `You are a YouTube title expert…`;
      break;
    case "idea":
      systemPrompt = `You are a creative strategist…`;
      break;
    case "keyword":
      systemPrompt = `You are an SEO specialist…`;
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input }
      ],
      temperature: 0.8,
    });
    res.status(200).json({ result: completion.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate content" });
  }
}

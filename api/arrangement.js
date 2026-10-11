import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of flowers that a user has
and suggests a bouquet arrangement they could make with some or all
of those flowers. You may include a few additional flowers.
Format your response in markdown.
`;

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { flowers } = req.body;

    if (!Array.isArray(flowers) || flowers.length === 0) {
      return res.status(400).json({ error: "Please provide flowers." });
    }

    const flowersString = flowers.join(", ");

    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-Nemo-Instruct-2407",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${flowersString}. Please recommend a bouquet arrangement.`,
        },
      ],
      max_tokens: 1024,
    });

    const recipe = response.choices[0].message.content;

    return res.status(200).json({ recipe });
  } catch (err) {
    console.error("Arrangement API error:", err);
    return res.status(500).json({
      error: "Failed to generate arrangement.",
    });
  }
}

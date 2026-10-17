import type { VercelRequest, VercelResponse } from "@vercel/node";

type GroqResponse = {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const SYSTEM_PROMPT =
    "You are an assistant that receives a list of flowers a user has and suggests a bouquet arrangement they could make with some or all of them. You don't need to use every flower. The arrangement can include a few extra flowers they didn't mention. Format your response in markdown using headings, bullet lists, and numbered lists only. Do not use tables. Do not use emojis.";

  try {
    const { flowers } = req.body as { flowers?: unknown };

    if (
      !Array.isArray(flowers) ||
      flowers.length === 0 ||
      flowers.length > 20 ||
      flowers.some((i: unknown) => typeof i !== "string" || i.length > 25)
    ) {
      res.status(400).json({ error: "Invalid flowers" });
      return;
    }

    const flowerList = flowers as string[];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `I have ${flowerList.join(", ")}. Please give me an arrangement you'd recommend I make!`,
            },
          ],
          max_tokens: 1024,
        }),
      },
    );

    const data = (await response.json()) as GroqResponse;

    if (!response.ok) {
      res
        .status(response.status)
        .json({ error: data.error?.message || "Groq request failed" });
      return;
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      res.status(502).json({ error: "Empty response from Groq" });
      return;
    }

    const clean = content.replace(/\p{Extended_Pictographic}/gu, "");
    res.status(200).json({ recipe: clean });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
}

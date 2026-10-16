export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const SYSTEM_PROMPT =
    "You are an assistant that receives a list of flowers a user has and suggests a bouquet arrangement they could make with some or all of them. You don't need to use every flower. The arrangement can include a few extra flowers they didn't mention. Format your response in markdown using headings, bullet lists, and numbered lists only. Do not use tables. Do not use emojis.";

  try {
    const { flowers } = req.body;

    if (
      !Array.isArray(flowers) ||
      flowers.length === 0 ||
      flowers.length > 20 ||
      flowers.some((i) => typeof i !== "string" || i.length > 25)
    ) {
      return res.status(400).json({ error: "Invalid flowers" });
    }

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
              content: `I have ${flowers.join(", ")}. Please give me an arrangement you'd recommend I make!`,
            },
          ],
          max_tokens: 1024,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.error?.message || "Groq request failed" });
    }

    const clean = data.choices[0].message.content.replace(
      /\p{Extended_Pictographic}/gu,
      "",
    );
    res.status(200).json({ recipe: clean });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

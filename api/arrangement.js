import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of flowers that a user has and suggests a bouquet arrangement they could make with some or all of those flowers. You don't need to use every flower they mention in your arrangement. The arrangement can include additional flowers they didn't mention, but try not to include too many extra flowers. Format your response in markdown to make it easier to render to a web page
`;
const hf = new InferenceClient(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function getArrangementFromMistral(flowersArr) {
  const flowersString = flowersArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-Nemo-Instruct-2407",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${flowersString}. Please give me an arrangement you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error(err.message);
  }
}

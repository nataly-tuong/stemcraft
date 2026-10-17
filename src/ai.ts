type ArrangementResponse = {
  recipe?: string;
  error?: string;
};

export async function generateArrangement(
  flowersArr: string[],
): Promise<string> {
  const res = await fetch("/api/arrangement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ flowers: flowersArr }),
  });

  const data = (await res.json()) as ArrangementResponse;

  if (!res.ok) throw new Error(data.error || "Request failed");
  if (!data.recipe) throw new Error("Empty response");

  return data.recipe;
}

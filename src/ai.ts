export async function generateArrangement(flowersArr: string[]) {
  const res = await fetch("/api/arrangement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ flowers: flowersArr }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data.recipe;
}

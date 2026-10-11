import React from "react";
import AIArrangement from "./AIArrangement.jsx";
import FlowersList from "./FlowersList.jsx";
import { generateArrangement } from "../ai";

export default function Main() {
  const [flowers, setFlowers] = React.useState([]);

  const [arrangement, setArrangement] = React.useState("");

  async function getArrangement() {
    const arrangementMarkdown = await generateArrangement(flowers);
    setArrangement(arrangementMarkdown);
  }

  function handleClick() {
    console.log("I was clicked!");
  }

  function addFlower(formData) {
    const newFlower = formData.get("flower");
    setFlowers((prevFlowers) => [...prevFlowers, newFlower]);
  }

  return (
    <main className="flex flex-col gap-3">
      <form
        action={addFlower}
        className="max-w-md w-full mx-auto flex rounded-lg border-2 border-moss overflow-hidden"
      >
        <input
          maxLength={25}
          name="flower"
          aria-label="Add a flower"
          type="text"
          placeholder="e.g. peony"
          className="flex-1 text-black px-4 py-2 outline-none bg-white  placeholder:text-gray-400"
        />
        <button
          onClick={handleClick}
          type="submit"
          className="bg-moss before:content-['+'] before:mr-2
          text-moss-light px-5 py-2 font-medium hover:opacity-90"
        >
          Add flower
        </button>
      </form>
      {flowers.length > 0 && (
        <FlowersList getArrangement={getArrangement} flowers={flowers} />
      )}

      {arrangement && <AIArrangement arrangement={arrangement} />}
    </main>
  );
}

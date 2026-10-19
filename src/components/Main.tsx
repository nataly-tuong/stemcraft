import React from "react";
import type { JSX } from "react";
import AIArrangement from "./AIArrangement";
import FlowersList from "./FlowersList";
import { generateArrangement } from "../ai";
import { FlowerIcon } from "@phosphor-icons/react";

export default function Main(): JSX.Element {
  const [flowers, setFlowers] = React.useState<string[]>([]);

  const [arrangement, setArrangement] = React.useState<string>("");
  const arrangementSection = React.useRef<HTMLDivElement>(null);

  React.useEffect((): void => {
    if (arrangement !== "" && arrangementSection.current !== null) {
      arrangementSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [arrangement]);

  async function getArrangement(): Promise<void> {
    const arrangementMarkdown: string = await generateArrangement(flowers);
    setArrangement(arrangementMarkdown);
  }

  function handleClick(): void {
    console.log("I was clicked!");
  }

  function addFlower(formData: FormData): void {
    const newFlower = formData.get("flower");
    if (typeof newFlower !== "string" || newFlower.trim() === "") return;

    setFlowers((prevFlowers: string[]): string[] => [
      ...prevFlowers,
      newFlower,
    ]);
  }

  return (
    <main className="flex flex-col px-6 gap-3">
      <form
        action={addFlower}
        className="max-w-md border-[#E3E0D5] border w-full rounded-3xl items-center shadow-sm mx-auto flex bg-white pl-4 py-1 gap-2"
      >
        <FlowerIcon
          size={22}
          weight="duotone"
          className="text-moss shrink-0"
          aria-hidden="true"
        />

        <input
          maxLength={25}
          name="flower"
          aria-label="Add a flower"
          type="text"
          placeholder="e.g. peony"
          className="flex-1 min-w-0 text-black py-2 outline-none bg-transparent placeholder:text-gray-400"
        />

        <button
          onClick={handleClick}
          type="submit"
          className="bg-moss relative right-1 before:content-['+'] before:mr-2
    text-moss-light px-5 rounded-4xl py-2 font-medium hover:opacity-90"
        >
          Add flower
        </button>
      </form>
      <h2 className="font-bold text-xl mb-5">Flowers on hand</h2>
      <FlowersList
        ref={arrangementSection}
        getArrangement={getArrangement}
        flowers={flowers}
      />

      {arrangement && <AIArrangement arrangement={arrangement} />}
    </main>
  );
}

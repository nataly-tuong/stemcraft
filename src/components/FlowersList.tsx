import type { JSX, RefObject } from "react";

type FlowersListProps = {
  flowers: string[];
  ref: RefObject<HTMLDivElement | null>;
  getArrangement: () => void;
};

const MIN_FLOWERS = 4;

export default function FlowersList({
  ref,
  getArrangement,
  flowers,
}: FlowersListProps): JSX.Element {
  const flowersListItems = flowers.map((flower, i) => (
    <li key={`${flower}-${i}`}>{flower}</li>
  ));

  const isReady = flowers.length >= MIN_FLOWERS;
  const remaining = MIN_FLOWERS - flowers.length;

  return (
    <section>
      {flowers.length === 0 ? (
        <div className="h-37.5 border-[#E3E0D5] border mb-5 shadow-sm flex flex-col rounded-md w-full bg-moss-light items-center justify-center">
          <p className="text-gray-400">No flowers yet, add one to begin!</p>
        </div>
      ) : (
        <div className="h-full mb-5 shadow-sm border-[#E3E0D5] border flex flex-col rounded-md w-full bg-moss-light items-left">
          <ul className="list-disc pl-10 py-5" aria-live="polite">
            {flowersListItems}
          </ul>
        </div>
      )}

      <div
        ref={ref}
        className={`border-solid shadow-sm border-[#E3E0D5] border rounded-lg p-4 flex flex-col gap-4 w-full items-center justify-center ${
          isReady ? "bg-moss-light" : "bg-[#E5E9DE]"
        }`}
      >
        <h3 className={`font-bold ${isReady ? "" : "text-moss"}`}>
          Ready for a bouquet?
        </h3>

        <p className={isReady ? "" : "text-[#7C8577]"}>
          {isReady
            ? "Generate an arrangement from your list of flowers."
            : `Add ${remaining} more ${remaining === 1 ? "flower" : "flowers"} to generate an arrangement.`}
        </p>

        <button
          onClick={getArrangement}
          disabled={!isReady}
          className={`font-medium px-4 py-2 rounded-3xl ${
            isReady
              ? "hover:opacity-80 bg-moss text-moss-light"
              : "bg-[#C6CCBE] text-[#7C8577] cursor-not-allowed"
          }`}
        >
          Get an arrangement
        </button>
      </div>
    </section>
  );
}

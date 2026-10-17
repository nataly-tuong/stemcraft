import type { JSX, RefObject } from "react";

type FlowersListProps = {
  flowers: string[];
  ref: RefObject<HTMLDivElement | null>;
  getArrangement: () => void;
};

export default function FlowersList({
  ref,
  getArrangement,
  flowers,
}: FlowersListProps): JSX.Element {
  const flowersListItems = flowers.map((flower) => (
    <li key={flower}>{flower}</li>
  ));

  return (
    <section className="px-6">
      <h2 className="font-bold text-xl mb-5">Flowers on hand:</h2>
      <ul className="list-disc pl-10 mb-5" aria-live="polite">
        {flowersListItems}
      </ul>
      {flowers.length > 3 && (
        <div className="bg-white border-solid border-2 border-moss rounded-lg p-4 flex gap-4 w-full items-center justify-between">
          <div ref={ref}>
            <h3 className="font-bold mb-2">Ready for a bouquet?</h3>
            <p>Generate an arrangement from your list of flowers.</p>
          </div>
          <button
            onClick={getArrangement}
            className="hover:opacity-80 font-medium bg-moss px-4 py-2 text-moss-light rounded-lg"
          >
            Get an arrangement
          </button>
        </div>
      )}
    </section>
  );
}

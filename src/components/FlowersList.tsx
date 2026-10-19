import type { JSX, RefObject } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import FlowerIllustration from "../assets/flower-svgrepo-com.svg";

export type Flower = { name: string; qty: number };

type FlowersListProps = {
  flowers: Flower[];
  ref: RefObject<HTMLDivElement | null>;
  getArrangement: () => void;
  onChangeQty: (name: string, delta: number) => void;
  onRemove: (name: string) => void;
};

const MIN_FLOWERS = 4;

export default function FlowersList({
  ref,
  getArrangement,
  flowers,
  onChangeQty,
  onRemove,
}: FlowersListProps): JSX.Element {
  const flowersListItems = flowers.map(({ name, qty }: Flower) => (
    <li
      key={name}
      className="bg-[#FAF8F1] border border-[#E3E0D5] rounded-3xl font-medium py-2 px-4"
    >
      <div className="flex items-center gap-3">
        {name}

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full border border-[#E3E0D5] bg-[#E5E9DE] p-1">
            <button
              type="button"
              onClick={() => onChangeQty(name, -1)}
              disabled={qty <= 1}
              aria-label={`Decrease ${name}`}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-moss text-moss-light hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <MinusIcon size={14} weight="bold" aria-hidden="true" />
            </button>

            <span className="w-6 text-center tabular-nums" aria-live="polite">
              {qty}
            </span>

            <button
              type="button"
              onClick={() => onChangeQty(name, 1)}
              disabled={qty >= 99}
              aria-label={`Increase ${name}`}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-moss text-moss-light hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <PlusIcon size={14} weight="bold" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(name)}
            aria-label={`Remove ${name}`}
            className="p-1 text-[#7C8577] hover:text-moss"
          >
            <TrashIcon size={22} weight="fill" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  ));

  const isReady: boolean = flowers.length >= MIN_FLOWERS;
  const remaining: number = MIN_FLOWERS - flowers.length;

  return (
    <section>
      {flowers.length === 0 ? (
        <div className="h-37.5 border-[#E3E0D5] border mb-5 shadow-sm flex flex-col gap-2 rounded-md w-full bg-moss-light items-center justify-center">
          <img
            src={FlowerIllustration}
            alt=""
            aria-hidden="true"
            className="h-15 w-15 opacity-70"
          />
          <p className="text-gray-400">No flowers yet, add one to begin!</p>
        </div>
      ) : (
        <div className="h-full mb-5 shadow-sm border-[#E3E0D5] border flex flex-col rounded-md w-full bg-moss-light items-left">
          <ul
            className="list-none flex flex-col gap-2 pl-10 pr-5 py-5"
            aria-live="polite"
          >
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

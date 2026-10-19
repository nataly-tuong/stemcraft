import React from "react";
import type { JSX } from "react";
import AIArrangement from "./AIArrangement";
import FlowersList from "./FlowersList";
import type { Flower } from "./FlowersList";
import { generateArrangement } from "../ai";
import { ArrowCounterClockwiseIcon, FlowerIcon } from "@phosphor-icons/react";
import { Flowers } from "../flowers";

export default function Main(): JSX.Element {
  const [flowers, setFlowers] = React.useState<Flower[]>([]);

  const [query, setQuery] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<number>(-1);
  const [error, setError] = React.useState<string>("");

  const [arrangement, setArrangement] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [arrangementError, setArrangementError] = React.useState<string>("");
  const [lastGenerated, setLastGenerated] = React.useState<string | null>(null);
  const [confirmReset, setConfirmReset] = React.useState<boolean>(false);
  const arrangementSection = React.useRef<HTMLDivElement>(null);

  const signature: string = flowers
    .map((f: Flower) => `${f.name}:${f.qty}`)
    .sort()
    .join("|");
  const isUnchanged: boolean = lastGenerated === signature;

  React.useEffect((): void => {
    if (arrangement !== "" && arrangementSection.current !== null) {
      arrangementSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [arrangement]);

  React.useEffect((): (() => void) | undefined => {
    if (!confirmReset) return undefined;
    const timer = setTimeout(() => setConfirmReset(false), 3000);
    return () => clearTimeout(timer);
  }, [confirmReset]);

  async function getArrangement(): Promise<void> {
    if (isUnchanged) return;
    const requestedSignature: string = signature;
    setIsLoading(true);
    setArrangementError("");
    try {
      const arrangementMarkdown: string = await generateArrangement(
        flowers.map((f: Flower) => (f.qty > 1 ? `${f.qty} ${f.name}` : f.name)),
      );
      setArrangement(arrangementMarkdown);
      setLastGenerated(requestedSignature);
    } catch {
      setArrangementError(
        "Something went wrong making your arrangement. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const q: string = query.trim().toLowerCase();

  function score(name: string): number {
    const n = name.toLowerCase();
    if (n === q) return 0;
    if (n.startsWith(q)) return 1;
    if (n.split(" ").some((word: string) => word.startsWith(q))) return 2;
    return 3;
  }

  const matches: string[] =
    q === ""
      ? []
      : Flowers.filter((f: string) => f.toLowerCase().includes(q))
          .sort(
            (a: string, b: string) =>
              score(a) - score(b) || a.length - b.length || a.localeCompare(b),
          )
          .slice(0, 6);

  function addFlower(name: string): void {
    setFlowers((prev: Flower[]): Flower[] =>
      prev.some((f: Flower) => f.name === name)
        ? prev.map((f: Flower) =>
            f.name === name ? { ...f, qty: Math.min(f.qty + 1, 99) } : f,
          )
        : [...prev, { name, qty: 1 }],
    );
    setQuery("");
    setOpen(false);
    setActive(-1);
    setError("");
  }

  function changeQty(name: string, delta: number): void {
    setFlowers((prev: Flower[]): Flower[] =>
      prev.map((f: Flower) =>
        f.name === name
          ? { ...f, qty: Math.min(99, Math.max(1, f.qty + delta)) }
          : f,
      ),
    );
  }

  function removeFlower(name: string): void {
    setFlowers((prev: Flower[]): Flower[] =>
      prev.filter((f: Flower) => f.name !== name),
    );
  }

  function resetAll(): void {
    setFlowers([]);
    setArrangement("");
    setLastGenerated(null);
    setArrangementError("");
    setQuery("");
    setError("");
    setOpen(false);
    setActive(-1);
    setConfirmReset(false);
  }

  function handleResetClick(): void {
    if (confirmReset) {
      resetAll();
    } else {
      setConfirmReset(true);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (q === "") return;

    const pick: string | undefined = matches[active] ?? matches[0];

    if (pick) {
      addFlower(pick);
    } else {
      setError(`"${query.trim()}" isn't in the flower list.`);
      setOpen(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i: number) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i: number) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <main className="flex flex-col px-6 gap-3">
      <form
        onSubmit={handleSubmit}
        className="relative max-w-md border-[#E3E0D5] border w-full rounded-3xl items-center shadow-sm mx-auto flex bg-white pl-4 py-1 gap-2"
      >
        <FlowerIcon
          size={22}
          weight="duotone"
          className="text-moss shrink-0"
          aria-hidden="true"
        />

        <input
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          maxLength={25}
          name="flower"
          autoComplete="off"
          role="combobox"
          aria-expanded={open && matches.length > 0}
          aria-controls="flower-listbox"
          aria-activedescendant={
            active >= 0 ? `flower-option-${active}` : undefined
          }
          aria-label="Add a flower"
          type="text"
          placeholder="e.g. peony"
          className="flex-1 min-w-0 text-black py-2 outline-none bg-transparent placeholder:text-gray-400"
        />

        <button
          type="submit"
          className="bg-moss relative right-1 before:content-['+'] before:mr-2
    text-moss-light px-5 rounded-4xl py-2 font-medium hover:opacity-90"
        >
          Add flower
        </button>

        {open && matches.length > 0 && (
          <ul
            id="flower-listbox"
            role="listbox"
            className="absolute left-0 right-0 top-full mt-2 z-10 overflow-hidden rounded-2xl bg-white shadow-md border border-[#E3E0D5] p-1"
          >
            {matches.map((flower: string, i: number) => (
              <li
                key={flower}
                id={`flower-option-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e: React.MouseEvent): void => {
                  e.preventDefault();
                  addFlower(flower);
                }}
                className={`px-4 py-2 rounded-xl cursor-pointer text-black transition-colors ${
                  i === active ? "bg-[#E5E9DE] text-moss" : ""
                }`}
              >
                {flower}
              </li>
            ))}
          </ul>
        )}
      </form>

      {error && (
        <p role="alert" className="text-center text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-xl">Flowers on hand</h2>

        {flowers.length > 0 && (
          <button
            type="button"
            onClick={handleResetClick}
            disabled={isLoading}
            aria-label={
              confirmReset ? "Confirm erase all flowers" : "Erase all flowers"
            }
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
              confirmReset
                ? "border-red-700 bg-red-50 text-red-700"
                : "border-[#E3E0D5] bg-white text-[#7C8577] hover:text-moss"
            }`}
          >
            <ArrowCounterClockwiseIcon
              size={16}
              weight="bold"
              aria-hidden="true"
            />
            {confirmReset ? "Click again to confirm" : "Erase all"}
          </button>
        )}
      </div>

      <FlowersList
        ref={arrangementSection}
        getArrangement={getArrangement}
        flowers={flowers}
        onChangeQty={changeQty}
        onRemove={removeFlower}
        isLoading={isLoading}
        isUnchanged={isUnchanged}
      />

      {isLoading && (
        <div
          role="status"
          className="border border-[#E3E0D5] shadow-sm rounded-lg bg-moss-light p-6 flex flex-col gap-3 animate-pulse"
        >
          <div className="h-5 w-1/3 rounded bg-[#E5E9DE]" />
          <div className="h-4 w-full rounded bg-[#E5E9DE]" />
          <div className="h-4 w-5/6 rounded bg-[#E5E9DE]" />
          <div className="h-4 w-2/3 rounded bg-[#E5E9DE]" />
          <span className="sr-only">Generating your arrangement</span>
        </div>
      )}

      {arrangementError && (
        <p role="alert" className="text-center text-sm text-red-700">
          {arrangementError}
        </p>
      )}

      {arrangement && !isLoading && <AIArrangement arrangement={arrangement} />}
    </main>
  );
}

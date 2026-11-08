import React from "react";
import type { JSX } from "react";
import {
  ArrowCounterClockwiseIcon,
  ArrowRightIcon,
  FlowerIcon,
  PlusIcon,
  SparkleIcon,
  SpinnerIcon,
} from "@phosphor-icons/react";
import AIArrangement from "./AIArrangement";
import FlowersList from "./FlowersList";
import type { Flower } from "./FlowersList";
import { generateArrangement } from "../ai";
import { Flowers } from "../flowers";

export default function Main(): JSX.Element {
  const [flowers, setFlowers] = React.useState<Flower[]>([]);
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const [error, setError] = React.useState("");
  const [arrangement, setArrangement] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [arrangementError, setArrangementError] = React.useState("");
  const [lastGenerated, setLastGenerated] = React.useState<string | null>(null);
  const [confirmReset, setConfirmReset] = React.useState(false);

  const arrangementSection = React.useRef<HTMLDivElement>(null);
  const requestInFlight = React.useRef(false);
  const listboxId = React.useId();

  const signature = flowers
    .map((flower) => `${flower.name}:${flower.qty}`)
    .sort()
    .join("|");

  const isUnchanged = lastGenerated === signature;
  const q = query.trim().toLowerCase();

  React.useEffect(() => {
    if (!arrangement || isLoading) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    arrangementSection.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [arrangement, isLoading]);

  React.useEffect(() => {
    if (!confirmReset) return;

    const timer = window.setTimeout(() => setConfirmReset(false), 3000);

    return () => window.clearTimeout(timer);
  }, [confirmReset]);

  function score(name: string): number {
    const normalized = name.toLowerCase();

    if (normalized === q) return 0;
    if (normalized.startsWith(q)) return 1;

    if (normalized.split(" ").some((word) => word.startsWith(q))) {
      return 2;
    }

    return 3;
  }

  const matches =
    q === ""
      ? []
      : Flowers.filter((flower: string) => flower.toLowerCase().includes(q))
          .sort(
            (a: string, b: string) =>
              score(a) - score(b) || a.length - b.length || a.localeCompare(b),
          )
          .slice(0, 6);

  const showSuggestions = open && matches.length > 0;

  async function getArrangement(): Promise<void> {
    if (requestInFlight.current || flowers.length < 4 || isUnchanged) {
      return;
    }

    const requestedSignature = signature;

    requestInFlight.current = true;
    setIsLoading(true);
    setArrangementError("");
    setConfirmReset(false);
    setOpen(false);

    try {
      const arrangementMarkdown = await generateArrangement(
        flowers.map((flower) =>
          flower.qty > 1 ? `${flower.qty} ${flower.name}` : flower.name,
        ),
      );

      setArrangement(arrangementMarkdown);
      setLastGenerated(requestedSignature);
    } catch {
      setArrangementError(
        "Something went wrong making your arrangement. Please try again.",
      );
    } finally {
      requestInFlight.current = false;
      setIsLoading(false);
    }
  }

  function addFlower(name: string): void {
    if (requestInFlight.current) return;

    setFlowers((previous) =>
      previous.some((flower) => flower.name === name)
        ? previous.map((flower) =>
            flower.name === name
              ? { ...flower, qty: Math.min(flower.qty + 1, 99) }
              : flower,
          )
        : [...previous, { name, qty: 1 }],
    );

    setQuery("");
    setOpen(false);
    setActive(-1);
    setError("");
    setConfirmReset(false);
  }

  function changeQty(name: string, delta: number): void {
    if (requestInFlight.current) return;

    setFlowers((previous) =>
      previous.map((flower) =>
        flower.name === name
          ? {
              ...flower,
              qty: Math.min(99, Math.max(1, flower.qty + delta)),
            }
          : flower,
      ),
    );

    setConfirmReset(false);
  }

  function removeFlower(name: string): void {
    if (requestInFlight.current) return;

    setFlowers((previous) => previous.filter((flower) => flower.name !== name));

    setConfirmReset(false);
  }

  function resetAll(): void {
    if (requestInFlight.current) return;

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
    if (requestInFlight.current) return;

    if (confirmReset) {
      resetAll();
    } else {
      setConfirmReset(true);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!q || requestInFlight.current) return;

    const pick = matches[active] ?? matches[0];

    if (pick) {
      addFlower(pick);
    } else {
      setError(`"${query.trim()}" isn't in the flower list.`);
      setOpen(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((index) => Math.min(index + 1, matches.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActive((index) => (matches.length > 0 ? Math.max(index - 1, 0) : -1));
    } else if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  }

  return (
    <>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-orb" aria-hidden="true" />

          <div className="hero-content">
            <span className="eyebrow">
              <SparkleIcon
                size={16}
                className="eyebrow-icon"
                aria-hidden="true"
              />
              A fresh approach to flower arranging
            </span>

            <h1 id="hero-title" className="hero-title">
              <span className="hero-title-line">Your flowers.</span>
              <span className="hero-title-line">
                A little <span className="hero-title-accent">AI.</span>
              </span>
              <span className="hero-title-line">Endless possibility.</span>
            </h1>

            <p className="hero-description">
              Beautiful arrangements begin with what you have. Tell us what’s in
              your vase and let a little{" "}
              <span className="text-sprout">artificial intelligence</span> help
              bring it together.
            </p>

            <p className="hero-note">Less guesswork. More growing things.</p>
          </div>
        </section>

        <section
          id="bouquet-builder"
          className="workspace scroll-mt-8"
          aria-labelledby="builder-title"
        >
          <div className="workspace-inner">
            <div className="section-heading">
              <div>
                <p className="section-label">The arrangement studio</p>
                <h2 id="builder-title" className="section-title">
                  Start with your stems.
                </h2>
              </div>

              <p className="section-description">
                Pick your flowers, adjust the quantities, and we’ll help you
                find their best arrangement.
              </p>
            </div>

            <div className="workspace-grid">
              <section
                className="inventory-panel"
                aria-labelledby="inventory-title"
              >
                <div className="panel-heading">
                  <h3 id="inventory-title" className="panel-title">
                    Flowers on hand
                  </h3>

                  <span className="count-badge">Your flower collection</span>
                </div>

                <form onSubmit={handleSubmit} className="flower-form">
                  <FlowerIcon
                    className="search-icon"
                    weight="light"
                    aria-hidden="true"
                  />

                  <input
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setOpen(true);
                      setActive(-1);
                      setError("");
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setOpen(true)}
                    onBlur={() => {
                      setOpen(false);
                      setActive(-1);
                    }}
                    disabled={isLoading}
                    maxLength={25}
                    name="flower"
                    autoComplete="off"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={showSuggestions}
                    aria-controls={listboxId}
                    aria-activedescendant={
                      showSuggestions && active >= 0
                        ? `${listboxId}-option-${active}`
                        : undefined
                    }
                    aria-label="Search for a flower to add"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${listboxId}-error` : undefined}
                    type="text"
                    placeholder="Try peony, rose, or tulip"
                    className="flower-input disabled:opacity-50"
                  />

                  <button
                    type="submit"
                    disabled={isLoading || !q}
                    aria-label="Add flower"
                    className="add-button disabled:opacity-30"
                  >
                    <PlusIcon size={20} weight="bold" aria-hidden="true" />
                  </button>

                  {showSuggestions && (
                    <ul
                      id={listboxId}
                      role="listbox"
                      aria-label="Matching flowers"
                      className="flower-options"
                    >
                      {matches.map((flower: string, index: number) => (
                        <li
                          key={flower}
                          id={`${listboxId}-option-${index}`}
                          role="option"
                          aria-selected={index === active}
                          onMouseEnter={() => setActive(index)}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            addFlower(flower);
                          }}
                          className={`flower-option ${
                            index === active ? "flower-option-active" : ""
                          }`}
                        >
                          <span>{flower}</span>
                          <PlusIcon size={16} aria-hidden="true" />
                        </li>
                      ))}
                    </ul>
                  )}
                </form>

                {error && (
                  <p
                    id={`${listboxId}-error`}
                    role="alert"
                    className="form-error"
                  >
                    {error}
                  </p>
                )}

                <div className="inventory-toolbar">
                  <span className="inventory-caption">Your selection</span>

                  {flowers.length > 0 && (
                    <button
                      type="button"
                      onClick={handleResetClick}
                      disabled={isLoading}
                      aria-label={
                        confirmReset
                          ? "Confirm erase all flowers"
                          : "Erase all flowers"
                      }
                      className={`reset-button ${
                        confirmReset ? "reset-button-confirm" : ""
                      }`}
                    >
                      <ArrowCounterClockwiseIcon size={14} aria-hidden="true" />
                      {confirmReset ? "Click again to confirm" : "Clear all"}
                    </button>
                  )}
                </div>

                <FlowersList
                  flowers={flowers}
                  onChangeQty={changeQty}
                  onRemove={removeFlower}
                  getArrangement={getArrangement}
                  isLoading={isLoading}
                  isUnchanged={isUnchanged}
                />
              </section>
            </div>

            <div
              ref={arrangementSection}
              className="arrangement-region"
              aria-busy={isLoading}
            >
              {isLoading && (
                <div role="status" className="loading-card">
                  <div className="loading-label">
                    <SpinnerIcon
                      size={18}
                      className="animate-spin motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    Finding a little flower harmony…
                  </div>

                  <div className="loading-line w-1/3" />
                  <div className="loading-line w-full" />
                  <div className="loading-line w-5/6" />
                  <div className="loading-line w-2/3" />
                </div>
              )}

              {arrangementError && (
                <p role="alert" className="arrangement-error">
                  {arrangementError}
                </p>
              )}

              {arrangement && !isLoading && (
                <AIArrangement arrangement={arrangement} />
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>stemcraft</span>
      </footer>
    </>
  );
}

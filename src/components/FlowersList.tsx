import type { JSX } from "react";
import {
  ArrowRightIcon,
  FlowerTulipIcon,
  MinusIcon,
  PlusIcon,
  SparkleIcon,
  SpinnerIcon,
  TrashIcon,
} from "@phosphor-icons/react";

export type Flower = {
  name: string;
  qty: number;
};

type FlowersListProps = {
  flowers: Flower[];
  getArrangement: () => void;
  onChangeQty: (name: string, delta: number) => void;
  onRemove: (name: string) => void;
  isLoading: boolean;
  isUnchanged: boolean;
};

const MIN_FLOWERS = 4;

export default function FlowersList({
  flowers,
  getArrangement,
  onChangeQty,
  onRemove,
  isLoading,
  isUnchanged,
}: FlowersListProps): JSX.Element {
  const isReady = flowers.length >= MIN_FLOWERS;
  const remaining = Math.max(0, MIN_FLOWERS - flowers.length);
  const locked = !isReady || isUnchanged;
  const totalStems = flowers.reduce((total, flower) => total + flower.qty, 0);

  return (
    <>
      <div>
        {flowers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <FlowerTulipIcon size={32} weight="light" aria-hidden="true" />
            </div>

            <h3 className="empty-title">Room for something lovely.</h3>

            <p className="empty-description">
              Add the flowers you have on hand. Your arrangement starts here.
            </p>
          </div>
        ) : (
          <ul className="flower-list" aria-label="Your selected flowers">
            {flowers.map(({ name, qty }, index) => (
              <li key={name} className="flower-row">
                <div className="flower-name-group">
                  <span className="flower-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flower-name">{name}</span>
                </div>

                <div className="flower-controls">
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => onChangeQty(name, -1)}
                      disabled={qty <= 1 || isLoading}
                      aria-label={`Decrease ${name}`}
                      className="quantity-button"
                    >
                      <MinusIcon size={14} weight="bold" aria-hidden="true" />
                    </button>

                    <span
                      className="quantity-value"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <span className="sr-only">{name} quantity: </span>
                      {qty}
                    </span>

                    <button
                      type="button"
                      onClick={() => onChangeQty(name, 1)}
                      disabled={qty >= 99 || isLoading}
                      aria-label={`Increase ${name}`}
                      className="quantity-button"
                    >
                      <PlusIcon size={14} weight="bold" aria-hidden="true" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemove(name)}
                    disabled={isLoading}
                    aria-label={`Remove ${name}`}
                    className="remove-button disabled:opacity-30"
                  >
                    <TrashIcon size={18} aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="inventory-summary" aria-live="polite">
          <span>
            {flowers.length} flower {flowers.length === 1 ? "type" : "types"}
          </span>

          <span>
            {totalStems} {totalStems === 1 ? "stem" : "stems"} in total
          </span>
        </div>
      </div>

      <aside className="generate-panel" aria-labelledby="generate-title">
        <div className="generate-topline">
          <span className="generate-label">Your personal flower studio</span>

          <SparkleIcon
            size={24}
            weight="light"
            className="generate-icon"
            aria-hidden="true"
          />
        </div>

        <h3 id="generate-title" className="generate-title">
          A little help from <span className="text-sprout">AI.</span>
          <br />A lot of possibility.
        </h3>

        <p id="generate-description" className="generate-description">
          {!isReady
            ? `Add ${remaining} more flower ${remaining === 1 ? "type" : "types"} to discover an arrangement made for what you have.`
            : isUnchanged
              ? "Your arrangement is ready below. Change your flower selection or quantities to create something new."
              : "Turn your flowers into a thoughtful bouquet with a personalized, step-by-step arrangement."}
        </p>

        <div className="progress-track" aria-hidden="true">
          {Array.from({ length: MIN_FLOWERS }, (_, index) => (
            <span
              key={index}
              className={`progress-segment ${
                index < flowers.length ? "progress-segment-complete" : ""
              }`}
            />
          ))}
        </div>

        <p className="progress-caption">
          {isReady
            ? "Your flowers are ready to arrange"
            : `${flowers.length} of ${MIN_FLOWERS} flower types added`}
        </p>

        <button
          type="button"
          onClick={getArrangement}
          disabled={locked || isLoading}
          aria-busy={isLoading}
          aria-describedby="generate-description"
          className={`primary-button ${
            isLoading ? "primary-button-loading" : ""
          }`}
        >
          {isLoading ? (
            <SpinnerIcon
              size={18}
              className="animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          ) : (
            <SparkleIcon size={18} aria-hidden="true" />
          )}

          {isLoading ? "Arranging your flowers…" : "Create my arrangement"}

          {!isLoading && <ArrowRightIcon size={18} aria-hidden="true" />}
        </button>

        <p className="generate-footnote">Made for the flowers in your hands.</p>
      </aside>
    </>
  );
}

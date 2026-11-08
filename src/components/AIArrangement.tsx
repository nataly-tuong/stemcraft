import ReactMarkdown from "react-markdown";
import { SparkleIcon } from "@phosphor-icons/react";
import type { JSX } from "react";

type AIArrangementProps = {
  arrangement: string;
};

export default function AIArrangement({
  arrangement,
}: AIArrangementProps): JSX.Element {
  return (
    <section className="arrangement-card" aria-labelledby="arrangement-title">
      <div className="arrangement-heading">
        <div>
          <p className="section-label">From stems to something special</p>
          <h2 id="arrangement-title" className="arrangement-title">
            Your arrangement
          </h2>
        </div>

        <span className="count-badge gap-2">
          <SparkleIcon size={14} aria-hidden="true" />
          AI-crafted guide
        </span>
      </div>

      <div className="arrangement-prose">
        <ReactMarkdown>{arrangement}</ReactMarkdown>
      </div>
    </section>
  );
}

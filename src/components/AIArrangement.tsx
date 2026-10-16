import ReactMarkdown from "react-markdown";

type Props = {
  arrangement: string;
};

export default function AIArrangement(props: Props) {
  return (
    <section className="px-6 mb-2 prose max-w-none prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-li:my-0.5 [--tw-prose-body:currentColor] [--tw-prose-headings:currentColor] [--tw-prose-bold:currentColor] [--tw-prose-bullets:currentColor] [--tw-prose-counters:currentColor]">
      <ReactMarkdown>{props.arrangement}</ReactMarkdown>
    </section>
  );
}

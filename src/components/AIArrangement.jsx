import ReactMarkdown from "react-markdown";

export default function AIArrangement(props) {
  return (
    <section className="px-6 flex flex-col gap-3 mb-2">
      <ReactMarkdown>{props.arrangement}</ReactMarkdown>
    </section>
  );
}

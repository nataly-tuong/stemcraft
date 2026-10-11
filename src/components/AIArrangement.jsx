import ReactMarkdown from "react-markdown";

export default function AIArrangement(props) {
  return (
    <section className="px-6 prosemax-w-non mb-2">
      <ReactMarkdown>{props.arrangement}</ReactMarkdown>
    </section>
  );
}

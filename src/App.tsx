import type { JSX } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App(): JSX.Element {
  return (
    <div className="flex flex-col gap-8">
      <Header />
      <Main />
    </div>
  );
}

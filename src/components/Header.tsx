import { ArrowDownIcon, FlowerTulipIcon } from "@phosphor-icons/react";
import type { JSX } from "react";

export default function Header(): JSX.Element {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#" className="brand" aria-label="Stemcraft home">
          <FlowerTulipIcon
            className="brand-icon"
            weight="light"
            aria-hidden="true"
          />
          <span className="brand-wordmark">stemcraft</span>
        </a>

        <a href="#bouquet-builder" className="nav-link">
          Start arranging
          <ArrowDownIcon size={16} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}

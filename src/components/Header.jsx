import { FlowerTulipIcon } from "@phosphor-icons/react";

export default function Header() {
  return (
    <header className="flex flex-1 items-center justify-center bg-moss py-15 border-b border-moss shadow-sm">
      <FlowerTulipIcon size={60} className="text-moss-light mr-3" />
      <h1 className="text-5xl scale-y-140 font-climatecrisis text-moss-light">
        stemcraft
      </h1>
    </header>
  );
}

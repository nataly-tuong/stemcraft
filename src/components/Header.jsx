import { FlowerTulipIcon } from "@phosphor-icons/react";

export default function Header() {
  return (
    <header className="flex flex-1 align-middle justify-center bg-moss py-10 border-b border-moss shadow-sm">
      <FlowerTulipIcon size={50} className="text-moss-light mr-3" />
      <h1 className="text-5xl font-climatecrisis text-moss-light">stemcraft</h1>
    </header>
  );
}

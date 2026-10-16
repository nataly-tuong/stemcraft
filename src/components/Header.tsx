import { FlowerTulipIcon } from "@phosphor-icons/react";

export default function Header() {
  return (
    <header className="flex gap-0.5 flex-1 items-center justify-center bg-moss py-4 border-b border-moss">
      <FlowerTulipIcon size={50} className="text-moss-light" />
      <h1 className="text-3xl scale-y-140 font-climatecrisis text-moss-light">
        stemcraft
      </h1>
    </header>
  );
}

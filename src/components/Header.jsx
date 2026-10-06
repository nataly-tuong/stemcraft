import { FlowerTulipIcon } from "@phosphor-icons/react";

export default function Header() {
  return (
    <header className="flex flex-1 items-center justify-center bg-moss py-8 border-b border-moss">
      <FlowerTulipIcon size={40} className="text-moss-light mr-1" />
      <h1 className="text-3xl scale-y-140 font-climatecrisis text-moss-light">
        stemcraft
      </h1>
    </header>
  );
}

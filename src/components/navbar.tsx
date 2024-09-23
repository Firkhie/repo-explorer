"use client";

import Link from "next/link";
import { SearchForm } from "@/components/search-form";
import { TextSearch } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [showSearch, setShowSearch] = useState(false);

  const onClick = () => {
    setShowSearch((prevState) => !prevState);
  };

  return (
    <div className="h-20 bg-[#0d1117] border-b-[1px]">
      <div className="max-w-screen-xl h-full flex items-center justify-between gap-x-10 sm:gap-x-24 px-5 sm:px-8 md:px-10 xl:mx-auto xl:px-0">
        <Link href="/" className="text-xl font-bold">
          RepoExplorer
        </Link>
        <div className="hidden sm:block">
          <SearchForm
            formStyle="grid w-full grid-cols-12 gap-2 rounded-lg border focus-within:shadow-sm overflow-hidden"
            formItemStyle="relative col-span-10 px-2"
            formButtonStyle="w-full col-span-2 rounded-none"
            icon
          />
        </div>
        <div
          className="block sm:hidden relative p-2 rounded-lg bg-[#161d28]"
          onClick={onClick}
        >
          <TextSearch className="w-[22px] h-[22px]" />
        </div>
        <div
          className={cn(
            "absolute top-24 right-5 z-50 bg-black ml-5",
            showSearch ? "block" : "hidden"
          )}
        >
          <SearchForm
            formStyle="grid w-full grid-cols-12 gap-2 rounded-lg border focus-within:shadow-sm overflow-hidden"
            formItemStyle="relative col-span-10 px-2"
            formButtonStyle="w-full col-span-2 rounded-none"
            icon
          />
        </div>
      </div>
    </div>
  );
}

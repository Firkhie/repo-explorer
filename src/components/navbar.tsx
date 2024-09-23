import Link from "next/link";
import { SearchForm } from "@/components/search-form";

export function Navbar() {
  return (
    <div className="h-20 bg-slate-800">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between h-full">
        <Link href="/" className="text-xl font-bold">
          RepoExplorer
        </Link>
        <div>
          <SearchForm
            formStyle="grid w-full grid-cols-12 gap-2 rounded-lg border focus-within:shadow-sm p-2"
            formItemStyle="relative col-span-10"
            formButtonStyle="w-full col-span-2"
          />
        </div>
      </div>
    </div>
  );
}

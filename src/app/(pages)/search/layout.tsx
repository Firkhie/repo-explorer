import { Loading } from "@/components/loading";
import { Suspense } from "react";

interface SearchLayoutProps {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <div className="min-h-full">
      <div className="h-full max-w-screen-xl mx-auto">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-[80vh]">
              <Loading title="Loading..." />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}

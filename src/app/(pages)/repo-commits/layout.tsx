import { Loading } from "@/components/loading";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";

interface RepoCommitLayoutProps {
  children: React.ReactNode;
}

export default function RepoCommitLayout({ children }: RepoCommitLayoutProps) {
  return (
    <div className="min-h-full">
      <Navbar />
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

import { Navbar } from "@/components/navbar";

interface RepoCommitLayoutProps {
  children: React.ReactNode;
}

export default function RepoCommitLayout({ children }: RepoCommitLayoutProps) {
  return (
    <div className="min-h-full">
      <Navbar />
      <div className="h-full max-w-screen-xl mx-auto">{children}</div>
    </div>
  );
}

import { Navbar } from "@/components/navbar";

interface OrgRepoLayoutProps {
  children: React.ReactNode;
}

export default function OrgRepoLayout({ children }: OrgRepoLayoutProps) {
  return (
    <div className="min-h-full">
      <Navbar />
      <div className="h-full max-w-screen-xl mx-auto">{children}</div>
    </div>
  );
}

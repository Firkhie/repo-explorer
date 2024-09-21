interface SearchLayoutProps {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <div className="min-h-full">
      <div className="h-full max-w-screen-xl mx-auto">{children}</div>
    </div>
  );
}

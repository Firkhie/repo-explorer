interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="h-full max-w-screen-xl mx-auto">{children}</div>
    </div>
  );
}

import { LoaderCircle } from "lucide-react";

interface LoadingProps {
  title: string;
}

export function Loading({ title }: LoadingProps) {
  return (
    <div className="flex flex-col gap-y-5 items-center justify-center">
      <LoaderCircle className="w-24 h-24 animate-spin" />
      <p className="text-xl text-center">{title}</p>
    </div>
  );
}

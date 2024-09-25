import Image from "next/image";

export interface NotFoundProps {
  title: string;
  description: string;
}

export function NotFound({ title, description }: NotFoundProps) {
  return (
    <div className="flex flex-col gap-y-3 items-center justify-center">
      <div className="w-48 h-48 relative">
        <Image src="/images/no-results.png" alt={title} fill />
      </div>
      <h3 className="text-2xl font-semibold text-center">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
}

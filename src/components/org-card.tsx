"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export interface OrgCardProps {
  orgProfile: {
    login: string;
    name: string;
    avatar_url: string;
    description: string;
    location: string;
  };
}

export function OrgCard({ orgProfile }: OrgCardProps) {
  const { login, name, avatar_url, description, location = "-" } = orgProfile;
  const router = useRouter();

  function onClick(org: string) {
    router.push(`/org-repos?org=${org}`);
  }

  return (
    <div
      onClick={() => onClick(login)}
      className="cursor-pointer border border-input rounded-lg h-fit p-5 hover:opacity-70"
    >
      <div className="flex gap-x-2 mb-3">
        <div className="relative h-12 w-12 rounded-md overflow-hidden">
          <Image src={avatar_url} alt={login} fill />
        </div>
        <div>
          <p className="font-bold line-clamp-1">{name}</p>
          <p className="text-xs line-clamp-1">{location ? location : "-"}</p>
        </div>
      </div>
      <p className="text-sm line-clamp-1">
        {description ? description : "No description provided"}
      </p>
    </div>
  );
}

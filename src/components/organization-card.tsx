"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface OrganizationCardProps {
  org: {
    name: string;
    orgname: string;
    image: string;
    description: string;
    place: string;
  };
}

export function OrganizationCard({ org }: OrganizationCardProps) {
  const { name, orgname, image, description, place } = org;
  const router = useRouter();

  function onClick(orgname: string) {
    router.push(`/search?orgname=${orgname}`);
  }
  
  return (
    <div
      onClick={() => onClick(orgname)}
      className="cursor-pointer border border-input rounded-lg h-fit p-5 hover:opacity-70"
    >
      <div className="flex gap-x-2 mb-3">
        <div className="relative h-12 w-12 rounded-md overflow-hidden">
          <Image src={image} alt={orgname} fill />
        </div>
        <div>
          <p className="font-bold line-clamp-1">{name}</p>
          <p className="text-xs">{place}</p>
        </div>
      </div>
      <p className="text-sm line-clamp-2">{description}</p>
    </div>
  );
}

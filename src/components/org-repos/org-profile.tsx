import {
  CircleCheck,
  Folders,
  Link as LinkIcon,
  Link2,
  MapPin,
  Users,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface OrgProfileProps {
  orgDetails: {
    login: string;
    name: string;
    description: string;
    avatar_url: string;
    location: string;
    is_verified: boolean;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
    blog: string;
  };
}

export function OrgProfile({ orgDetails }: OrgProfileProps) {
  const {
    name,
    avatar_url,
    description,
    is_verified,
    location,
    public_repos,
    followers,
    following,
    html_url,
    blog,
  } = orgDetails;
  return (
    <div className="col-span-12 lg:col-span-4 xl:col-span-3 border border-input rounded-lg flex justify-center flex-col h-fit">
      <div className="w-full flex flex-col items-center justify-center p-4 border-b-[1px]">
        <div className="relative h-28 w-28 rounded-lg overflow-hidden">
          <Image src={avatar_url} alt={name} fill />
        </div>
        <div className="pt-3 text-center">
          <span className="font-bold text-2xl">{name}</span>
          {is_verified && (
            <CircleCheck className="inline w-[18px] h-[18px] text-green-600 ml-2 mb-[6px]" />
          )}
        </div>
        <div className="flex gap-x-[6px] items-center">
          <MapPin className="w-4 h-4" />
          <p className="text-sm line-clamp-1">{location ? location : "-"}</p>
        </div>
      </div>
      {description ? (
        <div className="border-b-[1px] py-2 px-4">
          <p className="text-center text-sm">{description}</p>
        </div>
      ) : (
        ""
      )}
      <div className="p-4 flex flex-col gap-y-1">
        <div className="flex gap-x-3 items-center">
          <Folders className="w-5 h-5" />
          <p className="text-sm line-clamp-1">
            {public_repos} public repositories
          </p>
        </div>
        <div className="flex gap-x-3 items-center">
          <Users className="w-5 h-5" />
          <p className="text-sm line-clamp-1">{followers} followers</p>
        </div>
        <div className="flex gap-x-3 items-center">
          <UsersRound className="w-5 h-5" />
          <p className="text-sm line-clamp-1">{following} following</p>
        </div>
        <div className="flex gap-x-3 items-center">
          <LinkIcon className="w-5 h-5" />
          <Link
            href={html_url}
            target="_blank"
            className="text-sm line-clamp-1"
          >
            {html_url}
          </Link>
        </div>
        <div className="flex gap-x-3 items-center">
          <Link2 className="w-5 h-5" />
          {blog ? (
            <Link href={blog} target="_blank" className="text-sm line-clamp-1">
              {blog}
            </Link>
          ) : (
            "-"
          )}
        </div>
      </div>
    </div>
  );
}

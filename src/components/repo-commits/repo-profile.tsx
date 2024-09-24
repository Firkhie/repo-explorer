import Image from "next/image";
import Link from "next/link";

import {
  Link as LinkIcon,
  Star,
  GitFork,
  Eye,
  CircleDot,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface RepoProfileProps {
  repoDetails: {
    name: string;
    private: boolean;
    description: string;
    html_url: string;
    owner: {
      avatar_url: string;
    };
    stargazers_count: number;
    watchers_count: number;
    language: string; //TODO: Fix route to get languages
    forks_count: number;
    open_issues_count: number;
    topics: string[];
  };
}

export function RepoProfile({ repoDetails }: RepoProfileProps) {
  const {
    description,
    forks_count,
    html_url,
    name,
    owner,
    private: isPrivate,
    stargazers_count,
    open_issues_count,
    watchers_count,
  } = repoDetails;
  return (
    <div className="col-span-12 lg:col-span-4 xl:col-span-3 border border-input rounded-lg flex justify-center flex-col h-fit">
      <div className="w-full flex flex-col items-center justify-center p-4 border-b-[1px]">
        <div className="relative h-28 w-28 rounded-lg overflow-hidden">
          <Image src={owner.avatar_url} alt={name} fill />
        </div>
        <p className="pt-3 pb-1 text-center font-bold text-2xl">{name}</p>
        <Badge variant="outline">{isPrivate ? "Private" : "Public"}</Badge>
      </div>
      {description ? (
        <div className="border-b-[1px] py-2 px-4">
          <p className="text-center text-sm">
            {description ? description : ""}
          </p>
        </div>
      ) : (
        ""
      )}
      <div className="p-4 flex flex-col gap-y-1">
        <div className="flex gap-x-3 items-center">
          <Star className="w-5 h-5" />
          <p className="text-sm">{stargazers_count} stars</p>
        </div>
        <div className="flex gap-x-3 items-center">
          <GitFork className="w-5 h-5" />
          <p className="text-sm">{forks_count} forks</p>
        </div>
        <div className="flex gap-x-3 items-center">
          <Eye className="w-5 h-5" />
          <p className="text-sm">{watchers_count} watchers</p>
        </div>
        <div className="flex gap-x-3 items-center">
          <CircleDot className="w-5 h-5" />
          <p className="text-sm">{open_issues_count} issues</p>
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
      </div>
    </div>
  );
}

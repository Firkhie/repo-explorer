import { cn } from "@/lib/utils";
import {
  CircleCheck,
  Folders,
  Link as LinkIcon,
  Link2,
  MapPin,
  Users,
  UsersRound,
  Star,
  Eye,
  GitFork,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import langColor from "@/data/github-colors.json";

export interface OrgReposDetailsProps {
  orgRepos: {
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
    repoList: {
      name: string;
      private: boolean;
      description: string;
      language: string;
      stargazers_count: number;
      forks: number;
      watchers: number;
    }[];
  };
}

export function OrgReposDetails({
  orgRepos: { orgDetails, repoList },
}: OrgReposDetailsProps) {
  const {
    login,
    name,
    description,
    avatar_url,
    location,
    is_verified,
    public_repos,
    followers,
    following,
    html_url,
    blog,
  } = orgDetails;
  return (
    <div className="w-full grid grid-cols-12 gap-5">
      {/* Org Detail */}
      <div className="col-span-3 border border-input rounded-lg flex justify-center flex-col h-fit">
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
            <p className="text-sm">{location ? location : "-"}</p>
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
            <p className="text-sm">{public_repos} public repositories</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <Users className="w-5 h-5" />
            <p className="text-sm">{followers} followers</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <UsersRound className="w-5 h-5" />
            <p className="text-sm">{following} following</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <LinkIcon className="w-5 h-5" />
            <Link href={html_url} target="_blank" className="text-sm">
              {html_url}
            </Link>
          </div>
          <div className="flex gap-x-3 items-center">
            <Link2 className="w-5 h-5" />
            {blog ? (
              <Link href={blog} target="_blank" className="text-sm">
                {blog}
              </Link>
            ) : (
              "-"
            )}
          </div>
        </div>
      </div>
      {/* Repo List */}
      <div className="col-span-9 border border-input rounded-lg h-fit">
        {repoList.length > 0 ? (
          repoList.map((repo, index) => (
            <div
              key={repo.name}
              className={cn(
                "px-4 py-3",
                repoList.length - 1 !== index ? "border-b-[1px]" : ""
              )}
            >
              <Link
                href={`/repo-commits/?owner=${login}&repo=${repo.name}`}
                className="font-semibold"
              >
                {repo.name}
              </Link>
              <p className="text-sm text-gray-400 line-clamp-3">
                {repo.description || "No description available"}
              </p>
              <div className="flex gap-x-5 text-xs pt-3">
                <div className="flex gap-x-1 items-center">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        langColor[repo.language as keyof typeof langColor]
                          ?.color || "gray",
                    }}
                  ></div>
                  <p>{repo.language || "Unknown"}</p>
                </div>
                <div className="flex gap-x-1 items-center">
                  <Star className="w-4 h-4" />
                  <p>{repo.stargazers_count}</p>
                </div>
                <div className="flex gap-x-1 items-center">
                  <GitFork className="w-4 h-4" />
                  <p>{repo.forks}</p>
                </div>
                <div className="flex gap-x-1 items-center">
                  <Eye className="w-4 h-4" />
                  <p>{repo.watchers}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Empty</div>
        )}
      </div>
    </div>
  );
}

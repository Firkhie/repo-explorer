import { cn } from "@/lib/utils";
import Link from "next/link";
import langColor from "@/data/github-colors.json";
import { Star, Eye, GitFork } from "lucide-react";
import { NotFound } from "@/components/not-found";

export interface OrgLoginProps {
  login: string;
}

export interface OrgRepoListProps extends OrgLoginProps {
  repoList: {
    name: string;
    private: boolean;
    description: string;
    language: string;
    stargazers_count: number;
    forks: number;
    watchers: number;
  }[];
}

export function OrgRepoList({ repoList, login }: OrgRepoListProps) {
  return (
    <div className="col-span-12 lg:col-span-8 xl:col-span-9 border border-input rounded-lg h-fit">
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
            <div className="flex gap-x-5 gap-y-[6px] text-xs pt-3 flex-wrap">
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
        <div className="py-36">
          <NotFound
            title="No repositories found"
            description="The repositories you looking for does not exist."
          />
        </div>
      )}
    </div>
  );
}

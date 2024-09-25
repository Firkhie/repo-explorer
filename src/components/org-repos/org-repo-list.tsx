"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import langColor from "@/data/github-colors.json";
import { Star, Eye, GitFork } from "lucide-react";

import { NotFound } from "@/components/not-found";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationProvider } from "@/components/pagination-provider";

interface OrgLoginProps {
  login: string;
}

export interface PaginationProps {
  pagination: {
    perPage: number;
    currentPage: number;
    totalRepos: number;
    totalPages: number;
  };
}

export interface OrgRepoListProps extends OrgLoginProps, PaginationProps {
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

export function OrgRepoList({ repoList, login, pagination }: OrgRepoListProps) {
  const { currentPage, totalPages } = pagination;

  const searchParams = useSearchParams();
  const initialOrg = searchParams.get("org") || "";
  const initialSort = searchParams.get("sort_by") || "stars";

  const handleSortChange = (value: string) => {
    const newUrl = `/org-repos?org=${initialOrg}&sort_by=${value}&page=1`;
    window.history.pushState({}, "", newUrl);
  };

  const handlePageChange = (page: number) => {
    const newUrl = `/org-repos?org=${initialOrg}&sort_by=${initialSort}&page=${page}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-4">
      {/* Select */}
      <div className="flex w-full justify-start">
        <Select onValueChange={handleSortChange} value={initialSort}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stars">Stars</SelectItem>
            <SelectItem value="forks">Forks</SelectItem>
            <SelectItem value="updated">Last Updated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Repo List */}
      <div className="border border-input rounded-lg h-fit">
        {repoList.length > 0 ? (
          repoList.map((repo, index) => (
            <div
              key={repo.name}
              className={cn(
                "px-4 py-3",
                repoList.length - 1 !== index ? "border-b-[1px]" : ""
              )}
            >
              <Link href={`/repo-commits?org=${login}&repo=${repo.name}`} className="hover:opacity-70">
                <p className="font-semibold">{repo.name}</p>
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
              </Link>
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
      {/* Pagination */}
      <PaginationProvider
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}

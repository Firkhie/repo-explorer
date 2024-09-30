"use client";

import { useSearchParams } from "next/navigation";

import { Loading } from "@/components/loading";
import { NotFound } from "@/components/not-found";
import {
  RepoCommitsDetails,
  RepoCommitsDetailsProps,
} from "@/components/repo-commits/repo-commits-details";
import useFetch from "@/hooks/useFetch";

export default function RepoCommitPage() {
  const searchParams = useSearchParams();
  const initialOrg = searchParams.get("org") || "";
  const initialRepo = searchParams.get("repo") || "";
  const initialPage = searchParams.get("page") || "1";

  const { data, error, loading } = useFetch<RepoCommitsDetailsProps["RepoCommits"]>(
    `/api/github-repo-commits?org=${initialOrg}&repo=${initialRepo}&page=${initialPage}`
  );

  if (error) {
    console.error(error);
  }

  return (
    <div className="h-full space-y-10 lg:space-y-16 px-5 sm:px-8 md:px-10 xl:px-0 py-7 sm:py-10">
      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loading title="Fetching repository detail and commit history list..." />
        </div>
      ) : data ? (
        <RepoCommitsDetails RepoCommits={data} />
      ) : (
        <div className="flex items-center justify-center h-[80vh]">
          <NotFound
            title="No commit history found"
            description="The commit history you looking for does not exist."
          />
        </div>
      )}
    </div>
  );
}

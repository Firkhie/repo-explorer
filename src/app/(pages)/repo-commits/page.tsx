"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import { Loading } from "@/components/loading";
import { NotFound } from "@/components/not-found";
import { RepoCommitsDetails } from "@/components/repo-commits/repo-commits-details";

export default function RepoCommitPage() {
  const searchParams = useSearchParams();
  const org = searchParams.get("owner") || "";
  const repo = searchParams.get("repo") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [repoCommits, setRepoCommits] = useState(null);
  // const [commitList, setCommitList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!org || !repo) return;

      setIsLoading(true);

      try {
        const [repoCommitsResponse] = await Promise.all([
          axios.get(`/api/github-repo-commits?owner=${org}&repo=${repo}`),
        ]);

        setRepoCommits(repoCommitsResponse.data);
      } catch (error) {
        console.error(error);
        setRepoCommits(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [org, repo]);

  return (
    <div className="h-full space-y-10 lg:space-y-16 px-5 sm:px-8 md:px-10 xl:px-0 py-7 sm:py-10">
      {isLoading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loading title="Fetching repository detail and commit history list..." />
        </div>
      ) : repoCommits ? (
        <RepoCommitsDetails RepoCommits={repoCommits} />
      ) : (
        <div className="flex items-center justify-center h-[80vh]">
          <NotFound
            title="No commit history found"
            description="The commit history you looking for does not exist/"
          />
        </div>
      )}
    </div>
  );
}
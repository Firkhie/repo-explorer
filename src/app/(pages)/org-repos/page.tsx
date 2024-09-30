"use client";

import { useSearchParams } from "next/navigation";

import { Loading } from "@/components/loading";
import { NotFound } from "@/components/not-found";
import {
  OrgReposDetails,
  OrgReposDetailsProps,
} from "@/components/org-repos/org-repos-details";
import useFetch from "@/hooks/useFetch";

export default function OrgRepoPage() {
  const searchParams = useSearchParams();
  const initialOrg = searchParams.get("org") || "";
  const initialSortBy = searchParams.get("sort_by") || "stars";
  const initialPage = searchParams.get("page") || "1";

  const url = `/api/github-org-repos?org=${initialOrg}&sort_by=${initialSortBy}&page=${initialPage}`;

  const { data, error, loading } = useFetch<OrgReposDetailsProps["orgRepos"]>(url);

  if (error) {
    console.error(error);
  }

  return (
    <div className="h-full space-y-10 lg:space-y-16 px-5 sm:px-8 md:px-10 xl:px-0 py-7 sm:py-10">
      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loading title="Fetching organization repositories..." />
        </div>
      ) : data ? (
        <OrgReposDetails orgRepos={data} />
      ) : (
        <div className="flex items-center justify-center h-[80vh]">
          <NotFound
            title="No organization found"
            description="The organization you looking for does not exist, write the correct name or else it wont show up."
          />
        </div>
      )}
    </div>
  );
}

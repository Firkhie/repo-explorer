"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import { Loading } from "@/components/loading";
import { NotFound } from "@/components/not-found";
import { OrgReposDetails } from "@/components/org-repos/org-repos-details";

export default function OrgRepoPage() {
  const searchParams = useSearchParams();
  const initialOrgname = searchParams.get("orgname") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [orgRepos, setOrgRepos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!initialOrgname) return;

      setIsLoading(true);

      try {
        const response = await axios.get(
          `/api/github-org-repos?org=${initialOrgname}`
        );
        setOrgRepos(response.data);
      } catch (error) {
        console.error(error);
        setOrgRepos(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initialOrgname]);

  return (
    <div className="h-full space-y-10 lg:space-y-16 px-5 sm:px-8 md:px-10 xl:px-0 py-7 sm:py-10">
      {isLoading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loading title="Fetching organization repositories..." />
        </div>
      ) : orgRepos ? (
        <OrgReposDetails orgRepos={orgRepos} />
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

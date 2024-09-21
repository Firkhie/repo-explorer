"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import { Loading } from "@/components/loading";
import { NotFound } from "@/components/not-found";
import { OrganizationDetails } from "@/components/organization-details";
import { SearchForm } from "@/components/search-form";
import { toast } from "sonner";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialOrgname = searchParams.get("orgname") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [orgDetails, setOrgDetails] = useState(null);
  const [repoList, setRepoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!initialOrgname) return;

      setIsLoading(true);

      try {
        const [orgResponse, repoResponse] = await Promise.all([
          axios.get(`/api/github-org?org=${initialOrgname}`),
          axios.get(`/api/github-repo?org=${initialOrgname}`),
        ]);

        setOrgDetails(orgResponse.data);
        setRepoList(repoResponse.data);
      } catch (error) {
        console.error(error);
        setOrgDetails(null);
        setRepoList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initialOrgname]);

  const handleSearch = (orgname: string) => {
    if (initialOrgname !== orgname) {
      // Update the URL with the new search query
      const newUrl = `/search?orgname=${orgname}`;
      window.history.pushState({}, "", newUrl);

      // Trigger data fetching with the new orgname
      setOrgDetails(null);
      setRepoList([]);
      setIsLoading(true);
    } else {
      toast.info("You're already viewing searched organization.");
    }
  };

  return (
    <div className="h-full space-y-10 lg:space-y-16 px-5 sm:px-8 md:px-10 xl:px-0 py-7 sm:py-10">
      <SearchForm onSearch={handleSearch} />
      {isLoading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <Loading title="Fetching organization repositories..." />
        </div>
      ) : orgDetails ? (
        <OrganizationDetails orgDetails={orgDetails} repoList={repoList} />
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <NotFound
            title="No organization found"
            description="The organization you looking for does not exist, write the correct name or else it wont show up."
          />
        </div>
      )}
    </div>
  );
}

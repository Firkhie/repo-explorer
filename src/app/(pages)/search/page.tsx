"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import { Loading } from "@/components/loading";
import { NotFound } from "@/components/not-found";
import { SearchForm } from "@/components/search-form";
import { toast } from "sonner";
import { OrgCard } from "@/components/org-card";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialOrgname = searchParams.get("orgname") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [orgList, setOrgList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!initialOrgname) return;

      setIsLoading(true);

      try {
        const response = await axios.get(
          `/api/github-org-list?orgname=${initialOrgname}`
        );
        setOrgList(response.data);
      } catch (error) {
        console.error(error);
        setOrgList([]);
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
      setOrgList([]);
      setIsLoading(true);
    } else {
      toast.info("You're already viewing searched organization.");
    }
  };

  return (
    <div className="h-full space-y-10 lg:space-y-16 px-5 sm:px-8 md:px-10 xl:px-0 py-7 sm:py-10">
      <SearchForm
        onSearch={handleSearch}
        formStyle="grid w-full grid-cols-12 gap-2 rounded-lg border focus-within:shadow-sm px-3 py-3 lg:py-2"
        formItemStyle="relative col-span-12 lg:col-span-10"
        formButtonStyle="col-span-12 w-full lg:col-span-2"
      />
      {isLoading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <Loading title="Fetching organization repositories..." />
        </div>
      ) : orgList ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {orgList.map((org, index) => (
            <OrgCard org={org} key={index} />
          ))}
        </div>
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

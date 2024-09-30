"use client";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Loading } from "@/components/loading";
import { NotFound } from "@/components/not-found";
import { SearchForm } from "@/components/search-form";
import { OrgCard, OrgCardProps } from "@/components/org-card";
import useFetch from "@/hooks/useFetch";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialOrg = searchParams.get("org") || "";

  const { data, error, loading } = useFetch<OrgCardProps["orgProfile"][]>(
    `/api/github-org-list?org=${initialOrg}`
  );

  if (error) {
    console.error(error);
  }

  const handleSearch = (org: string) => {
    if (initialOrg !== org) {
      // Update the URL with the new search query
      const newUrl = `/search?org=${org}`;
      window.history.pushState({}, "", newUrl);
    } else {
      toast.info("You're already viewing searched organization.", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
      });
    }
  };

  return (
    <div className="h-full space-y-10 lg:space-y-16 px-5 sm:px-8 md:px-10 xl:px-0 py-5 lg:py-10">
      <SearchForm
        onSearch={handleSearch}
        formStyle="grid w-full grid-cols-12 gap-2 rounded-lg border focus-within:shadow-sm px-3 py-3 lg:py-2"
        formItemStyle="relative col-span-12 lg:col-span-10"
        formButtonStyle="col-span-12 w-full lg:col-span-2"
        showMessage
      />
      {loading ? (
        <div className="flex items-center justify-center h-[65vh]">
          <Loading title="Fetching organization repositories..." />
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          {data.map((org, index) => (
            <OrgCard orgProfile={org} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[65vh]">
          <NotFound
            title="No organization found"
            description="The organization you looking for does not exist, write the correct name or else it wont show up."
          />
        </div>
      )}
    </div>
  );
}

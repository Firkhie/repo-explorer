import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { formatDistance, subDays } from "date-fns";
import { cn } from "@/lib/utils";

import { NotFound } from "@/components/not-found";
import { PaginationProvider } from "@/components/pagination-provider";
import { PaginationProps } from "@/components/org-repos/org-repo-list";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export interface RepoCommitListProps extends PaginationProps {
  commitList: {
    sha: string;
    commit: {
      message: string;
      author: {
        name: string;
        email: string;
        date: string;
      };
    };
    html_url: string;
    committer: {
      login: string;
      avatar_url: string;
    };
  }[];
}

export function RepoCommitList({
  commitList,
  pagination,
}: RepoCommitListProps) {
  const { currentPage, totalPages } = pagination;

  const searchParams = useSearchParams();
  const initialOrg = searchParams.get("org") || "";
  const initialRepo = searchParams.get("repo") || "";

  const [showFullMessage, setShowFullMessage] = useState(
    Array(commitList.length).fill(false) // set false to all array
  );

  // Toggle function to update the visibility of a specific commit message
  const toggleMessage = (index: number) => {
    setShowFullMessage((prevState) =>
      prevState.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  const handlePageChange = (page: number) => {
    const newUrl = `/repo-commits?org=${initialOrg}&repo=${initialRepo}&page=${page}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-4">
      {/* Back Button */}
      <div className="flex w-full justify-start">
        <Link
          href={`/org-repos?org=${initialOrg}`}
          className="border border-input rounded-lg h-fit py-2 px-5 text-sm flex items-center gap-x-1 hover:bg-white hover:text-black"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Repo
        </Link>
      </div>
      {/* Commit List */}
      <div className="border border-input rounded-lg h-fit">
        {commitList.length > 0 ? (
          commitList.map((item, index) => {
            // Split the message into the header and the rest of the message
            const [header, ...rest] = item.commit.message.split("\n\n");
            const restOfMessage = rest.join("\n\n");
            const date = item.commit.author.date;
            const commitDate = formatDistance(subDays(new Date(), 0), date);

            return (
              <div
                key={item.commit.message}
                className={cn(
                  "p-4",
                  commitList.length - 1 !== index ? "border-b-[1px]" : ""
                )}
              >
                {/* Header and Toggle Button */}
                <div className="flex justify-between items-center gap-x-5">
                  <h3 className="font-semibold text-sm line-clamp-1">
                    {header}
                  </h3>
                  <button
                    onClick={() => toggleMessage(index)}
                    className="text-blue-500 hover:text-blue-700 text-xs"
                  >
                    {showFullMessage[index] ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Show the rest of the message if the button is clicked */}
                {showFullMessage[index] && (
                  <pre className="my-2 p-2 text-xs rounded-md whitespace-pre-wrap bg-slate-900 overflow-auto scrollbar-hide">
                    {restOfMessage ? restOfMessage : "-"}
                  </pre>
                )}
                <div className="flex gap-x-[6px] items-center">
                  <div className="min-w-3 min-h-3 max-w-3 max-h-3 relative rounded-full overflow-hidden">
                    {item.committer && item.committer.avatar_url ? (
                      <Image
                        src={item.committer.avatar_url}
                        alt="commiter_image"
                        fill
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded-full">
                        <span className="text-gray-400">-</span>
                      </div>
                    )}
                  </div>
                  <p className="text-neutral-500 text-xs">
                    {item.commit &&
                    item.commit.author &&
                    item.commit.author.name
                      ? item.commit.author.name
                      : ""}{" "}
                    authored and{" "}
                    {item.committer && item.committer.login
                      ? item.committer.login
                      : ""}{" "}
                    committed {commitDate} ago
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-36">
            <NotFound
              title="No commits found"
              description="The commits you looking for does not exist."
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

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDistance, subDays } from "date-fns";
import { useState } from "react";

import {
  Link as LinkIcon,
  Users,
  Star,
  GitFork,
  Eye,
  CircleDot,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface RepoCommitsDetailsProps {
  RepoCommits: {
    repoDetails: {
      name: string;
      private: boolean;
      description: string;
      html_url: string;
      owner: {
        avatar_url: string;
      };
      stargazers_count: number;
      watchers_count: number;
      language: string; //TODO: FIX TO GET ALL LANGUAGES
      forks_count: number;
      open_issues_count: number;
      topics: string[];
      subscribers_count: number;
    };
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
  };
}

export function RepoCommitsDetails({ RepoCommits }: RepoCommitsDetailsProps) {
  const {
    description,
    forks_count,
    html_url,
    name,
    owner,
    private: isPrivate,
    stargazers_count,
    open_issues_count,
    subscribers_count,
    watchers_count,
  } = RepoCommits.repoDetails;

  const commitList = RepoCommits.commitList;

  const [showFullMessage, setShowFullMessage] = useState(
    Array(commitList.length).fill(false) // set false to all array
  );

  // Toggle function to update the visibility of a specific commit message
  const toggleMessage = (index: number) => {
    setShowFullMessage((prevState) =>
      prevState.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  return (
    <div className="w-full grid grid-cols-12 gap-5">
      {/* Repo Detail */}
      <div className="col-span-3 border border-input rounded-lg flex justify-center flex-col h-fit">
        <div className="w-full flex flex-col items-center justify-center p-4 border-b-[1px]">
          <div className="relative h-28 w-28 rounded-lg overflow-hidden">
            <Image src={owner.avatar_url} alt={name} fill />
          </div>
          <p className="pt-3 pb-1 text-center font-bold text-2xl">{name}</p>
          <Badge variant="outline">{isPrivate ? "Private" : "Public"}</Badge>
        </div>
        {description ? (
          <div className="border-b-[1px] py-2 px-4">
            <p className="text-center text-sm">
              {description ? description : ""}
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="p-4 flex flex-col gap-y-1">
          <div className="flex gap-x-3 items-center">
            <Star className="w-5 h-5" />
            <p className="text-sm">{stargazers_count} stars</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <GitFork className="w-5 h-5" />
            <p className="text-sm">{forks_count} forks</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <Eye className="w-5 h-5" />
            <p className="text-sm">{watchers_count} watchers</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <CircleDot className="w-5 h-5" />
            <p className="text-sm">{open_issues_count} issues</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <Users className="w-5 h-5" />
            <p className="text-sm">{subscribers_count} subscribers</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <LinkIcon className="w-5 h-5" />
            <Link
              href={html_url}
              target="_blank"
              className="text-sm line-clamp-1"
            >
              {html_url}
            </Link>
          </div>
        </div>
      </div>
      {/* Commit List */}
      <div className="col-span-9 border border-input rounded-lg h-fit">
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
                  "px-4 py-3",
                  commitList.length - 1 !== index ? "border-b-[1px]" : ""
                )}
              >
                {/* Header and Toggle Button */}
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">{header}</h3>
                  <button
                    onClick={() => toggleMessage(index)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    {showFullMessage[index] ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Show the rest of the message if the button is clicked */}
                {showFullMessage[index] && (
                  <pre className="my-2 p-2 text-xs rounded-md whitespace-pre-wrap bg-slate-900">
                    {restOfMessage ? restOfMessage : "-"}
                  </pre>
                )}
                <p className="text-xs">
                  {item.committer.login} committed {commitDate} ago
                </p>
              </div>
            );
          })
        ) : (
          <div>Empty</div>
        )}
      </div>
    </div>
  );
}

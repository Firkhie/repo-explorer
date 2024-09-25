import {
  RepoCommitList,
  RepoCommitListProps,
} from "@/components/repo-commits/repo-commits-list";
import {
  RepoProfile,
  RepoProfileProps,
} from "@/components/repo-commits/repo-profile";
import { PaginationProps } from "../org-repos/org-repo-list";

export interface RepoCommitsDetailsProps {
  RepoCommits: {
    repoDetails: RepoProfileProps["repoDetails"];
    commitList: RepoCommitListProps["commitList"];
    pagination: PaginationProps["pagination"];
  };
}

export function RepoCommitsDetails({
  RepoCommits: { commitList, repoDetails, pagination },
}: RepoCommitsDetailsProps) {
  return (
    <div className="w-full grid grid-cols-12 gap-5">
      <RepoProfile repoDetails={repoDetails} />
      <RepoCommitList commitList={commitList} pagination={pagination} />
    </div>
  );
}

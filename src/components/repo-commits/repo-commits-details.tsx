import {
  RepoCommitList,
  RepoCommitListProps,
} from "@/components/repo-commits/repo-commits-list";
import {
  RepoProfile,
  RepoProfileProps,
} from "@/components/repo-commits/repo-profile";

interface RepoCommitsDetailsProps {
  RepoCommits: {
    repoDetails: RepoProfileProps["repoDetails"];
    commitList: RepoCommitListProps["commitList"];
  };
}

export function RepoCommitsDetails({
  RepoCommits: { commitList, repoDetails },
}: RepoCommitsDetailsProps) {
  return (
    <div className="w-full grid grid-cols-12 gap-5">
      <RepoProfile repoDetails={repoDetails} />
      <RepoCommitList commitList={commitList} />
    </div>
  );
}

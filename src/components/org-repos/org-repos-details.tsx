import {
  OrgProfile,
  OrgProfileProps,
} from "@/components/org-repos/org-profile";
import {
  OrgRepoList,
  OrgRepoListProps,
  RepoPagination,
} from "@/components/org-repos/org-repo-list";

interface OrgReposDetailsProps {
  orgRepos: {
    orgDetails: OrgProfileProps["orgDetails"];
    repoList: OrgRepoListProps["repoList"];
    pagination: RepoPagination["pagination"];
  };
}

export function OrgReposDetails({
  orgRepos: { orgDetails, repoList, pagination },
}: OrgReposDetailsProps) {
  const { login } = orgDetails;
  return (
    <div className="w-full grid grid-cols-12 gap-5">
      <OrgProfile orgDetails={orgDetails} />
      <OrgRepoList repoList={repoList} login={login} pagination={pagination} />
    </div>
  );
}

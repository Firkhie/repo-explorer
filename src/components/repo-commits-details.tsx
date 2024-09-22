export interface RepoCommitsDetailsProps {
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

export function RepoCommitsDetails() {
  return <div>DETAIL</div>;
}

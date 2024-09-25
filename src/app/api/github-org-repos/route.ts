import { Octokit } from "@octokit/core";
import { NextResponse } from "next/server";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const org = searchParams.get("org");

  let sortBy = searchParams.get("sort_by") || "stars";
  let sortDirection = searchParams.get("direction") || "desc";

  const perPage = parseInt(searchParams.get("per_page") || "10");
  const page = parseInt(searchParams.get("page") || "1");

  if (!org) {
    return new NextResponse("Organization name is required", { status: 400 });
  }

  const validSortBy = ["stars", "updated", "forks", "help-wanted-issues"];
  const validOrder = ["asc", "desc"];

  if (!validSortBy.includes(sortBy)) {
    sortBy = "stars";
  }
  if (!validOrder.includes(sortDirection)) {
    sortDirection = "desc";
  }

  try {
    const orgDetailsPromise = await octokit.request("GET /orgs/{org}", {
      org: org,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const repoListPromise = await octokit.request("GET /search/repositories", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      q: `org:${org}`,
      sort: sortBy as "stars" | "updated" | "forks" | "help-wanted-issues",
      order: sortDirection as "asc" | "desc",
      per_page: perPage,
      page: page,
    });

    const [orgDetailsResponse, repoListResponse] = await Promise.all([
      orgDetailsPromise,
      repoListPromise,
    ]);

    const orgDetails = orgDetailsResponse.data;
    const repoList = repoListResponse.data;

    return NextResponse.json(
      {
        orgDetails,
        repoList: repoList.items,
        pagination: {
          perPage,
          currentPage: page,
          totalRepos: repoList.total_count,
          totalPages: Math.ceil(repoList.total_count / perPage),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET_ORG_REPOS_ROUTE]", error);
    return new NextResponse("Failed to fetch repositories", { status: 500 });
  }
}

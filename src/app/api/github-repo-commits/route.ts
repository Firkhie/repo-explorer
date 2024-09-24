import { Octokit } from "@octokit/core";
import { NextResponse } from "next/server";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const owner = url.searchParams.get("owner");
    const repo = url.searchParams.get("repo");

    const perPage = parseInt(url.searchParams.get("per_page") || "10");
    const page = parseInt(url.searchParams.get("page") || "1");

    if (!owner || !repo) {
      return new NextResponse("Owner and repo name is required", {
        status: 400,
      });
    }

    const repoDetailsPromise = await octokit.request(
      "GET /repos/{owner}/{repo}",
      {
        owner: owner,
        repo: repo,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const commitListPromise = await octokit.request(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner: owner,
        repo: repo,
        per_page: perPage,
        page: page,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const [repoDetailsResponse, commitListResponse] = await Promise.all([
      repoDetailsPromise,
      commitListPromise,
    ]);

    const totalPages = parseInt(commitListResponse.headers.link?.match(/page=(\d+)>; rel="last"/)?.[1] ||"0");
    const totalCommit = totalPages * perPage;

    const repoDetails = repoDetailsResponse.data;
    const commitList = commitListResponse.data; 

    return NextResponse.json(
      {
        repoDetails,
        commitList,
        pagination: {
          perPage,
          currentPage: page,
          totalCommit: totalCommit,
          totalPages: totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET_COMMIT_ROUTE]", error);
    return new NextResponse("Failed to fetch repository commits", {
      status: 500,
    });
  }
}

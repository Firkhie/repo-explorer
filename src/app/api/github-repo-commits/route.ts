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
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const [repoDetailsResponse, commitListResponse] = await Promise.all([
      repoDetailsPromise,
      commitListPromise,
    ]);

    const repoDetails = repoDetailsResponse.data;
    const commitList = commitListResponse.data;

    return NextResponse.json({ repoDetails, commitList }, { status: 200 });
  } catch (error) {
    console.log("[GET_COMMIT_ROUTE]", error);
    return new NextResponse("Failed to fetch repository commits", {
      status: 500,
    });
  }
}

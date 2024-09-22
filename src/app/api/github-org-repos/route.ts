import { Octokit } from "@octokit/core";
import { NextResponse } from "next/server";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const org = url.searchParams.get("org");

  if (!org) {
    return new NextResponse("Organization name is required", { status: 400 });
  }

  try {
    const orgDetailsPromise = await octokit.request("GET /orgs/{org}", {
      org: org,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const repoListPromise = await octokit.request("GET /orgs/{org}/repos", {
      org: org,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const [orgDetailsResponse, repoListResponse] = await Promise.all([
      orgDetailsPromise,
      repoListPromise,
    ]);

    const orgDetails = orgDetailsResponse.data;
    const repoList = repoListResponse.data;

    return NextResponse.json({ orgDetails, repoList }, { status: 200 });
  } catch (error) {
    console.log("[GET_ORG_ROUTE]", error);
    return new NextResponse("Failed to fetch organization details", {
      status: 500,
    });
  }
}

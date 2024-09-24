import { Octokit } from "@octokit/core";
import { NextResponse } from "next/server";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const org = url.searchParams.get("org");

  if (!org) {
    return new NextResponse("Search org is required", { status: 400 });
  }

  try {
    // Fetch organizations that match the search query
    const orgListResponse = await octokit.request("GET /search/users", {
      q: `${org} in:login`,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    // Filter results to include only organizations
    const organizations = orgListResponse.data.items.filter(
      (item) => item.type === "Organization"
    );

    // Fetch detailed information for each organization
    const orgDetailsPromises = organizations.map(async (org) => {
      const orgDetailResponse = await octokit.request("GET /orgs/{org}", {
        org: org.login,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      return orgDetailResponse.data;
    });

    const orgsWithDetails = await Promise.all(orgDetailsPromises);

    return NextResponse.json(orgsWithDetails, { status: 200 });
  } catch (error) {
    console.log("[GET_ORG_LIST_ROUTE]", error);
    return new NextResponse("Failed to fetch organizations", {
      status: 500,
    });
  }
}

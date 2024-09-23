import orgData from "@/data/popular-organizations.json";
import { OrgCard } from "@/components/org-card";
import { SearchForm } from "@/components/search-form";

export default function HomePage() {
  return (
    <div className="h-full space-y-10 lg:space-y-20 px-5 sm:px-8 md:px-10 xl:px-0 py-7 sm:py-10">
      <div className="space-y-5">
        <h1 className="text-4xl sm:text-5xl font-bold">RepoExplorer</h1>
        <p className="text-base">
          RepoExplorer allows you to search for any GitHub organization and
          explore their public repositories. View project details, track recent
          commits, and discover popular repositories ranked by metrics like
          stars and forks. Stay up-to-date with the latest development activity,
          all in one place.
        </p>
      </div>

      <div className="space-y-5">
        <p className="text-center">
          Search for github organization to find the repositories
        </p>
        <SearchForm
          formStyle="grid w-full grid-cols-12 gap-2 rounded-lg border focus-within:shadow-sm px-3 py-3 lg:py-2"
          formItemStyle="relative col-span-12 lg:col-span-10"
          formButtonStyle="col-span-12 w-full lg:col-span-2"
          showMessage
        />
      </div>

      <div className="space-y-5">
        <p className="text-center">
          Or you can explore popular github organization below
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          {orgData.map((org) => (
            <OrgCard org={org} key={org.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

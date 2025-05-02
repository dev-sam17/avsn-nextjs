import { Suspense } from "react";
import Activities from "@/components/activities/activities";
import { Skeleton } from "@/components/ui/skeleton";
import { getActivities } from "@/lib/actions/activities";

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Activities Timeline
          </h1>
          <p className="text-muted-foreground">
            Explore our activities through time with beautiful galleries.
          </p>
        </div>
        <Suspense fallback={<ActivitiesSkeleton />}>
          <Activities activities={activities} />
        </Suspense>
      </div>
    </div>
  );
}

function ActivitiesSkeleton() {
  return (
    <div className="space-y-10">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(4)
                .fill(0)
                .map((_, j) => (
                  <Skeleton key={j} className="aspect-square rounded-md" />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}

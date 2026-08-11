import { MovieGridSkeleton, NavBarSkeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <NavBarSkeleton />
      <div className="flex-1">
        <MovieGridSkeleton count={8} />
      </div>
    </div>
  );
}

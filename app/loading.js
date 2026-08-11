import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center">
      <LoadingSpinner label="Loading MovieGrid pages..." />
    </div>
  );
}

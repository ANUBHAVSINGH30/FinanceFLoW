import { Skeleton } from "../../../components/ui/Skeleton";
import { Card, CardContent } from "../../../components/ui/Card";

export default function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-6 space-y-6">
      <Skeleton className="h-4 w-16" />

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-5">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
      </div>
    </div>
  );
}
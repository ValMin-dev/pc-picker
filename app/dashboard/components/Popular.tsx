// Блок с популярными публичными сборками.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPopularBuilds } from "@/lib/builds";
import { Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";

export async function Popular() {
  const builds = await getPopularBuilds(5);

  if (builds.length === 0) {
    return (
      <Card className="rounded-md border bg-popover p-4">
        <CardHeader className="text-sm text-muted-foreground">
          <CardTitle>Популярные сборки</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Пока нет популярных сборок.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-md border bg-popover p-4">
      <CardHeader className="text-sm text-muted-foreground">
        <CardTitle>Популярные сборки</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {builds.map((build) => (
          <div
            key={build.id}
            className="flex flex-col gap-1 rounded-lg border bg-muted/30 px-3 py-2"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-sm leading-tight min-w-0">
                {" "}
                {build.name}
              </p>
              <Link href={`/builds/${build.id}/edit`}>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="tabular-nums">
                {new Intl.NumberFormat("ua-UA", {
                  notation: "compact",
                }).format(build.totalPrice || 0)}{" "}
              </span>
              <span className="tabular-nums flex">
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                {build._count?.likes > 0 ? build._count.likes : ""}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

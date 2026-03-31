import { auth } from "@/auth";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { getPublicBuilds } from "@/lib/builds";
import { notFound } from "next/navigation";
import { BuildCard } from "../components/BuildCard";
import { toggleLikeAction } from "../actions";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

export default async function ExplorePage() {
  const session = await auth();

  if (!session?.user.id) {
    notFound();
  }

  const publicBuilds = await getPublicBuilds(session.user.id);

  return (
    <div className="py-6">
      <TypographyH1>Публичные сборки</TypographyH1>
      <br />
      {publicBuilds.length === 0 ? (
        <p className="text-muted-foreground">Пока нет публичных сборок.</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {publicBuilds.map((b) => {
            const isLiked = Array.isArray(b.likes) && b.likes.length > 0;

            return (
              <BuildCard key={b.id} build={b}>
                <div className="flex flex-wrap gap-2">
                  <form action={toggleLikeAction} className="contents">
                    <input type="hidden" name="buildId" value={b.id} />
                    <Button
                      type="submit"
                      variant={isLiked ? "ghost" : "secondary"}
                      size="sm"
                    >
                      <ThumbsUp
                        className={`h-4 w-4 ${isLiked ? "text-blue-500" : "text-gray-500"}`}
                      />
                      {b._count?.likes > 0 ? b._count.likes : ""}
                    </Button>
                  </form>
                </div>
              </BuildCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

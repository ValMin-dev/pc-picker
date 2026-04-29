// Страница со сборками текущего пользователя.
import { auth } from "@/auth";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { getMyBuilds } from "@/lib/builds";
import { redirect } from "next/navigation";
import { BuildCard } from "./components/BuildCard";
import { DeleteBuildBtn } from "./components/DeleteBuildBtn";
import { deleteBuildAction, setBuildPublicAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export default async function MyByilds() {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/login");
  }
  const builds = await getMyBuilds(session.user.id);

  return (
    <div className="py-6">
      <TypographyH3>Мои сборки</TypographyH3>
      <br />

      <div className="grid gap-4 lg:grid-cols-3">
        {builds.length === 0 ? (
          <p className="text-muted-foreground">
            У вас пока нет сохраненных сборок.
          </p>
        ) : (
          builds.map((b) => (
            <BuildCard key={b.id} build={b}>
              <DeleteBuildBtn buildId={b.id} deleteAction={deleteBuildAction} />
              <form action={setBuildPublicAction} className="contents">
                <input type="hidden" name="buildId" value={b.id} />
                <input
                  type="hidden"
                  name="isPublic"
                  value={!b.isPublic ? "true" : "false"}
                />

                <Button
                  type="submit"
                  variant={`${!b.isPublic ? "secondary" : "ghost"}`}
                  size="sm"
                >
                  <Share2
                    className={`h-4 w-4 ${!b.isPublic ? "text-red-500" : "text-green-500"}`}
                  />
                  {!b.isPublic ? "" : "Скрыть"}
                </Button>
              </form>
            </BuildCard>
          ))
        )}
      </div>
    </div>
  );
}

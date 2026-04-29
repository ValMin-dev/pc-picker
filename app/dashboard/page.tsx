// Главная страница dashboard со сборкой и популярным.
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CurrentBuild } from "./components/CurrentBuild";
import { Popular } from "./components/Popular";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col max-w-9xl gap-6 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">
        <CurrentBuild />
      </div>
      <aside className="shrink-0 lg:sticky lg:top-6 lg:w-60">
        <Popular />
      </aside>
    </div>
  );
}

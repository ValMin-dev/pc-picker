// Верхняя шапка сайта с логотипом и навигацией.
import Link from "next/link";
import { TypographyH3 } from "./ui/typography-h3";
import { HeaderNav } from "./header-nav";
import { auth } from "@/auth";

export async function Header() {
  const session = await auth();
  console.log("Session in Header:", session);
  return (
    <header className="container mx-auto flex items-center p-4">
      <div className="shrink-0">
        <TypographyH3>
          <Link
            href={session?.user ? "/dashboard" : "/"}
            className="text-2xl font-bold"
          >
            PC Picker
          </Link>
        </TypographyH3>
      </div>
      <nav className="min-w-0 flex-1">
        <HeaderNav session={session} />
      </nav>
    </header>
  );
}

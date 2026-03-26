"use client";
import { getTabValue } from "@/lib/utils";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

type Props = {
  session: Session | null;
};

export function HeaderNav({ session }: Props) {
  const pathName = usePathname();
  const tabValue = getTabValue(pathName);

  if (!session?.user) {
    return (
      <div className="flex justify-center">
        <Button
          variant={tabValue === "login" ? "default" : "outline"}
          className="mx-2"
        >
          <Link href="/login">Войти</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <div className=" flex justify-center">
        <Tabs defaultValue={tabValue} className="w-fit">
          <TabsList className="grid w-max grid-cols-3">
            <TabsTrigger value="dashboard">
              <Plus className="mr-2 h-4 w-4" />
              <Link href="/dashboard">Создать сборку</Link>
            </TabsTrigger>
            <TabsTrigger value="builds">
              <Plus className="mr-2 h-4 w-4" />
              <Link href="/builds">Мои сборки</Link>
            </TabsTrigger>
            <TabsTrigger value="explore">
              <Plus className="mr-2 h-4 w-4" />
              <Link href="/builds/explore">Публичные </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => signOut({ redirectTo: "/login" })}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
}

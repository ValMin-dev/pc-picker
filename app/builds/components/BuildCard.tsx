import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { Pencil } from "lucide-react";
import Link from "next/link";

type BuildCard = {
  user: {
    email: string;
    name: string | null;
  };
  id: string;
  name: string | null;
  totalPrice: number;
  createdAt: Date | null;
  components: Array<{
    id: string;
    component: {
      name: string;
      type: string;
      price: number;
    };
  }>;
};

type Props = {
  build: BuildCard;
  children?: React.ReactNode;
};
export function BuildCard({ build, children }: Props) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2 flex flex-row justify-between pag-2 items-start">
        <div className="flex mix-w-0">
          <CardTitle>
            <TypographyH3>{build.name || "Без названия"}</TypographyH3>
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1 ">
            Создал{" "}
            {build.user.name?.trim() ||
              build.user.email?.trim() ||
              "Неизвестный"}
          </p>
        </div>
        <div className="shrink-0">
          <Button variant="outline" size="sm">
            <Link href={`/${build.id}`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-0 space-y-1 pag-2">
        {build.components.length > 0 && (
          <>
            <p className="text-sm font-medium mt-2">Компоненты:</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              {build.components.map((bc) => (
                <li key={bc.id}>{bc.component.name}</li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-row justify-between gap-2 pt-4 border-t">
        <CardDescription className="text-sm font-medium tabular-nums flex flex-col justify-between">
          <span className="text-sky-500 text-lg font-bold">
            {new Intl.NumberFormat("ua-UA", {
              style: "currency",
              currency: "UAH",
            }).format(build.totalPrice)}
          </span>

          {build.createdAt && (
            <p className="text-muted-foreground text-xs">
              Создано{" "}
              {new Intl.DateTimeFormat("ua-UA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(build.createdAt))}
            </p>
          )}

          <div className="flex flex-row justify-start items-end gap-2">
            {children}
          </div>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

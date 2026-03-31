"use client";
import { SaveBuildDialog } from "@/app/dashboard/components/SaveBuildDialog";
import { TableParts } from "@/app/dashboard/components/table";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { componentCategories } from "@/lib/constants";
import { Component, dbTypeToCategoryId } from "@/lib/types";
import { useCallback, useMemo, useState } from "react";

type BuildComponentInput = {
  id: string;
  name: string;
  type: Component["type"];
  price: number;
  socket: string | null;
};
type Props = {
  buildName: string;
  buildComponents: BuildComponentInput[];
};

export function EditBuildForm({ buildName, buildComponents }: Props) {
  function buildInitialSelected(
    components: BuildComponentInput[],
  ): Record<string, Component | null> {
    const selected: Record<string, Component | null> = {};
    for (const c of components) {
      const categoryId = dbTypeToCategoryId[c.type];

      if (categoryId) {
        selected[categoryId] = {
          id: c.id,
          name: c.name,
          type: c.type,
          price: c.price,
          socket: c.socket,
        };
      }
    }
    return selected;
  }
  const onSelectedComponent = useCallback(
    (categoryId: string, component: Component | null) => {
      setSelectedByCategory((prev) => ({
        ...prev,
        [categoryId]: component,
      }));
    },
    [],
  );

  const initialSelected = useMemo(
    () => buildInitialSelected(buildComponents),
    [buildComponents],
  );
  const [selectedByCategory, setSelectedByCategory] =
    useState<Record<string, Component | null>>(initialSelected);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  return (
    <>
      <div className="flex justify-between mb-8">
        <TypographyH3>Редактирование сборки: {buildName}</TypographyH3>
        <Button onClick={() => setOpenSaveDialog(true)}>Сохранить</Button>
      </div>
      <div className="flex justify-center">
        <TableParts
          components={componentCategories}
          selectedByCategory={selectedByCategory}
          onSelectedComponent={onSelectedComponent}
        />
      </div>
      <SaveBuildDialog
        open={openSaveDialog}
        onOpenChange={setOpenSaveDialog}
        selectedByCategory={selectedByCategory}
        defaultName={buildName}
        redirectPath="/builds"
      />
    </>
  );
}

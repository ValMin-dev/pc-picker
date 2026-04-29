// Блок, где пользователь собирает свой ПК.
"use client";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typography-h3";
import type { Component } from "@/lib/types";
import { useCallback, useState } from "react";
import { TableParts } from "./table";
import { componentCategories } from "@/lib/constants";
import { SaveBuildDialog } from "./SaveBuildDialog";

export const CurrentBuild = () => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [selectedByCategory, setSelectedByCategory] = useState<
    Record<string, Component | null>
  >({});
  const onSelectComponent = useCallback(
    (categoryId: string, component: Component | null) => {
      setSelectedByCategory((prev) => ({ ...prev, [categoryId]: component }));
    },
    [],
  );

  return (
    <>
      <div className="flex justify-between mb-8">
        <TypographyH3>Собери свою сборку</TypographyH3>
        <Button
          onClick={() => setSaveDialogOpen(true)}
          disabled={!selectedByCategory}
        >
          Сохранить сборку
        </Button>
      </div>
      <div className="min-w-0 overflow-x-auto">
        <TableParts
          components={componentCategories}
          onSelectedComponent={onSelectComponent}
          selectedByCategory={selectedByCategory}
        />

        <SaveBuildDialog
          open={saveDialogOpen}
          onOpenChange={setSaveDialogOpen}
          selectedByCategory={selectedByCategory}
        />
      </div>
    </>
  );
};

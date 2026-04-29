// ???????, ? ??????? ?????????? ?? ?? ??????????.
"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Component, ComponentCategory } from "@/lib/types";
import {
  Box,
  Cpu,
  Fan,
  Monitor,
  HardDrive,
  MemoryStick,
  Server,
  Zap,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { AddComponentDialog } from "./AddComponentDialog";

const iconMap: Record<ComponentCategory["icon"], React.ElementType> = {
  Cpu,
  Monitor,
  Server,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan,
};
type CategoryRow = {
  id: string;
  name: string;
  icon: string;
};
type Props = {
  components: CategoryRow[];
  selectedByCategory: Record<string, Component | null>;
  onSelectedComponent: (
    categoryId: string,
    component: Component | null,
  ) => void;
};

export function TableParts({
  components,
  selectedByCategory,
  onSelectedComponent,
}: Props) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const totalPrice = Object.values(selectedByCategory).reduce(
    (total, component) => total + (component ? component.price : 0),
    0,
  );
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Компонент</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Модель</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {components.map((category) => {
          const Icon = iconMap[category.icon];
          const selectedComponent = selectedByCategory[category.id];
          return (
            <TableRow className="my-2 " key={category.id}>
              <TableCell>
                <Icon className="h-6 w-6 " />
              </TableCell>
              <TableCell className="font-bold">{category.name}</TableCell>
              <TableCell>{selectedComponent?.name ?? "Не выбрано"}</TableCell>
              <TableCell>{selectedComponent?.price ?? "-"} грн</TableCell>
              <TableCell className="text-right">
                <Dialog
                  open={openCategoryId === category.id}
                  onOpenChange={(open) =>
                    setOpenCategoryId(open ? category.id : null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      {selectedComponent ? "Изменить" : "Выбрать"}
                    </Button>
                  </DialogTrigger>
                  <AddComponentDialog
                    categoryId={category.id}
                    name={category.name}
                    onSelect={(component) => {
                      onSelectedComponent(category.id, component);
                      setOpenCategoryId(null);
                    }}
                  />
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="text-right font-bold">
            Итого:
          </TableCell>
          <TableCell className="font-bold">
            {totalPrice > 0
              ? new Intl.NumberFormat("uk-UA", {
                  style: "currency",
                  currency: "UAH",
                }).format(totalPrice)
              : "-"}
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

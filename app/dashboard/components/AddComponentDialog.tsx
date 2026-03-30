"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Component } from "@/lib/types";
import { useEffect, useState } from "react";
import { ComponentCard } from "./ComponentCard";
import { getComponentsByCategory } from "../actions";

type Props = {
  categoryId: string;
  name: string;
  onSelect: (component: Component) => void;
};

export function AddComponentDialog({ categoryId, name, onSelect }: Props) {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getComponentsByCategory(categoryId)
      .then((data) => setComponents(data))
      .finally(() => setLoading(false));
  }, [categoryId]);
  return (
    <DialogContent className="max-w-10xl w-[90vw] max-h-[95vh] overflow-hidden flex flex-col">
      <DialogHeader>
        <DialogTitle>{`Добавить компонент - ${name}`}</DialogTitle>
      </DialogHeader>
      <div className="overflow-y-auto flex-1 mx-1 px-1">
        {loading ? (
          <p className="text-center text-sm text-muted-foreground">
            Загрузка...
          </p>
        ) : components.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
            {components.map((c) => (
              <ComponentCard
                key={c.id}
                name={c.name}
                price={c.price}
                onClick={() => onSelect(c)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Нет доступных компонентов
          </p>
        )}
      </div>
    </DialogContent>
  );
}

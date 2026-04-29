// Кнопка удаления сборки с подтверждением.
"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";

type Props = {
  buildId: string;
  deleteAction: (formData: FormData) => void;
};
export function DeleteBuildBtn({ buildId, deleteAction }: Props) {
  const [isPanding, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm("Вы уверены, что хотите удалить эту сборку?")) {
      return;
    }
    const formData = new FormData();
    formData.set("buildId", buildId);
    startTransition(() => {
      deleteAction(formData);
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleClick}
      disabled={isPanding}
      size="sm"
    >
      Удалить
    </Button>
  );
}

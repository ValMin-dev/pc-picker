// Диалог сохранения сборки.
import { Component } from "@/lib/types";
import { saveBuildAction, SaveBuildFormState } from "../actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedByCategory: Record<string, Component | null>;
  defaultName?: string;
  redirectPath?: string;
};

const initialState: SaveBuildFormState = {
  status: "idle",
};

export function SaveBuildDialog({
  open,
  onOpenChange,
  selectedByCategory,
  defaultName,
  redirectPath,
}: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  const [state, formAction] = useActionState(saveBuildAction, initialState);
  const componentIds = useMemo(
    () =>
      Object.values(selectedByCategory)
        .filter((component): component is Component => component !== null)
        .map((component) => component.id),
    [selectedByCategory],
  );
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      formRef.current?.reset();
    }
    onOpenChange(open);
  };

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message || "Сборка успешно сохранена");
      formRef.current?.reset();
      onOpenChange(false);
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.refresh();
      }
    }
  }, [onOpenChange, redirectPath, router, state]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Сохранить сборку</DialogTitle>
          <DialogDescription>
            Введите название для вашей сборки и сохраните её, чтобы поделиться с
            друзьями или вернуться к ней позже.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} ref={formRef} className="space-y-4">
          <Input
            name="name"
            defaultValue={defaultName}
            placeholder="Название сборки"
            required
          />
          <input
            type="hidden"
            name="componentIds"
            value={componentIds.join(",")}
          />
          <DialogFooter>
            <Button
              type="submit"
              form={formRef.current?.id}
              disabled={pending || componentIds.length === 0}
            >
              {pending ? "Сохранение..." : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

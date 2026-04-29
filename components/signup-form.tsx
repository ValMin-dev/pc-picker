// ????? ??????????? ????????????.
"use client";
import { signUpAction, SignupState } from "@/app/signup/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { ErrorMessage } from "./error-message";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [state, formAction] = useActionState<SignupState | null, FormData>(
    signUpAction,
    null,
  );

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
        <CardDescription>
          Введите вашу информацию ниже, чтобы создать аккаунт
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Имя</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Имя Фамилия"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Электронная почта</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                Мы будем использовать это для связи с Вами.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input id="password" name="password" type="password" required />
              <FieldDescription>
                Должен быть не менее 8 символов.
              </FieldDescription>
            </Field>
            {state?.error && <ErrorMessage message={state.error} />}
            <FieldGroup>
              <Field>
                <Button type="submit">Создать аккаунт</Button>

                <FieldDescription className="px-6 text-center">
                  Уже есть аккаунт? <a href="/login">Войти</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

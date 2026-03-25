"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString().trim() ?? "";

  if (!email || !password) return { error: "Введите email и пароль" };
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Неверный email или пароль" };
      }
      return { error: "Ошибка при входе" };
    }
    throw error;
  }
}

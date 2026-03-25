"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

import bcrypt from "bcryptjs";

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignupState = { error?: string };
export async function signUpAction(
  _prevState: SignupState | null,
  formData: FormData,
): Promise<SignupState> {
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const name = formData.get("name")?.toString() ?? "";

  if (!email) return { error: "Введите email" };
  if (!EMAIL_REGEX.test(email)) return { error: "Неверный формат email" };

  if (!password || password.length < MIN_PASSWORD_LENGTH)
    return {
      error: `Пароль должен быть не менее ${MIN_PASSWORD_LENGTH} символов`,
    };
  if (!name) return { error: "Введите имя" };

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) return { error: "Email уже используется" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  redirect("/login");
}

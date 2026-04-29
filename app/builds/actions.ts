// Серверные действия для лайков, удаления и публикации сборок.
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleLikeAction(formData: FormData) {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/login");
  }
  const buildId = String(formData.get("buildId"));

  if (!buildId) {
    return;
  }
  const build = await prisma.build.findUnique({
    where: { id: buildId },
    select: { isPublic: true },
  });

  if (!build?.isPublic) {
    return;
  }
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_buildId: {
        buildId,
        userId: session.user.id,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        buildId,
        userId: session.user.id,
      },
    });
  }

  revalidatePath("/builds/explore");
  revalidatePath("/builds");
  revalidatePath("/dashboard");
}

export async function setBuildPublicAction(formData: FormData) {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/login");
  }

  const buildId = String(formData.get("buildId"));
  const isPublic = formData.get("isPublic") === "true";

  if (!buildId) {
    return;
  }

  await prisma.build.updateMany({
    where: {
      id: buildId,
      userId: session.user.id,
    },
    data: {
      isPublic,
    },
  });

  revalidatePath("/builds/explore");
  revalidatePath("/builds");
}

export async function deleteBuildAction(formData: FormData) {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/login");
  }

  const buildId = String(formData.get("buildId"));

  if (!buildId) {
    return;
  }

  await prisma.build.deleteMany({
    where: {
      id: buildId,
      userId: session.user.id,
    },
  });

  revalidatePath("/builds/explore");
  revalidatePath("/builds");
}

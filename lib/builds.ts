import { prisma } from "./db";

export async function getMyBuilds(userId: string) {
  return prisma.build.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true, name: true } },
      components: {
        include: {
          component: {
            select: { name: true, type: true, price: true },
          },
        },
      },
    },
  });
}

export async function getPublicBuilds(userId: string) {
  return prisma.build.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true, name: true } },
      components: {
        include: {
          component: {
            select: { name: true, type: true, price: true },
          },
        },
      },
      _count: {
        select: { likes: true },
      },
      likes: { where: { userId }, select: { id: true } },
    },
  });
}

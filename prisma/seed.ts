import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.player.createMany({
    data: [
      {
        username: "Marc",
      },
      {
        username: "Ankur",
      },
      {
        username: "John",
      },
    ],
  });
  console.log(`Created ${users.count} users`)
}

main();

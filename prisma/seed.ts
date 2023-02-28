import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Michael Scott",
    email: "michael.scott@mspc.com",
    tweets: {
      create: [
        {
          title: "Michael Scott Paper company",
          content: "Buy my paper!",
        },
      ],
    },
  },
  {
    name: "Pam Beasley",
    email: "pam.beasley@mspc.com",
  },
  {
    name: "Ryan Howard",
    email: "ryan.howard@mspc.com",
    tweets: {
      create: [
        {
          title: "I was in Thailand",
          content: "My hair is blond now.",
        },
      ],
    },
  },
];

async function main() {
  console.log("Seeding db started");
  for (const u of userData) {
    const user = await prisma.user.create({ data: u });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

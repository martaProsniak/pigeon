import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Michael Scott",
    email: "michael.scott@mspc.com",
    // unhashed password: 'abc' - use to log in as a test user
    password: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
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
    // unhashed password: 'def' - use to log in as a test user
    password: "cb8379ac2098aa165029e3938a51da0bcecfc008fd6795f401178647f96c5b34",
  },
  {
    name: "Ryan Howard",
    email: "ryan.howard@mspc.com",
    // unhashed password: 'ghi' - use to log in as a test user
    password: "50ae61e841fac4e8f9e40baf2ad36ec868922ea48368c18f9535e47db56dd7fb",
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

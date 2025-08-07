const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            { name: 'Alic', email: "alic@example.com" },
            { name: 'Bo', email: "bo@example.com" },
            { name: 'Charli', email: "charli@example.com" }
        ],
    });
}

main()
    .then(() => {
        console.log('Seed completed successfully');
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
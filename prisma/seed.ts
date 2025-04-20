import { PrismaClient } from './generated/client';

const prisma = new PrismaClient();

async function main() {
    // Seed Faculty
    const faculties = [
        {
            name: "Dr. Anita Sharma",
            designation: "Professor",
            department: "Computer Science",
            qualification: "Ph.D. in AI",
            experience: 15,
        },
        {
            name: "Mr. Rakesh Mehta",
            designation: "Assistant Professor",
            department: "Electronics",
            qualification: "M.Tech in VLSI",
            experience: 8,
        },
        {
            name: "Dr. Sneha Roy",
            designation: "Associate Professor",
            department: "Mechanical",
            qualification: "Ph.D. in Robotics",
            experience: 12,
        },
        {
            name: "Ms. Kavita Iyer",
            designation: "Lecturer",
            department: "Information Technology",
            qualification: "M.Tech in Data Science",
            experience: 5,
        },
        {
            name: "Mr. Pranav Deshmukh",
            designation: "Assistant Professor",
            department: "Civil",
            qualification: "M.Tech in Structural Engineering",
            experience: 6,
        }
    ];

    // Seed Notices
    const notices = Array.from({ length: 10 }, (_, i) => ({
        title: `Notice ${i + 1}`,
        notice: `This is the content of notice number ${i + 1}.`,
        date: new Date(Date.now() - i * 86400000), // Subtract i days
    }));

    // Insert into DB
    await prisma.faculty.createMany({ data: faculties });
    await prisma.notices.createMany({ data: notices });

    console.log('✅ Seed completed successfully.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());

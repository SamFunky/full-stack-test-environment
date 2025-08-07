import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const users = await prisma.user.findMany();
			res.status(200).json(users);
		} catch (error) {
			console.error("Error fetching users:", error);
			res.status(500).json({ error: "Something went wrong." });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}

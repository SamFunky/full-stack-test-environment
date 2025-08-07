import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const positions = await prisma.boxPosition.findMany();
    res.status(200).json(positions);
  } else if (req.method === "POST") {
    const { id, x, y } = req.body;
    const position = await prisma.boxPosition.upsert({
      where: { id },
      update: { x, y },
      create: { id, x, y },
    });
    res.status(200).json(position);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
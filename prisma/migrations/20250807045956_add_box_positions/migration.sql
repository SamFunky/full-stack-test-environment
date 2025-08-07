-- CreateTable
CREATE TABLE "public"."BoxPosition" (
    "id" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoxPosition_pkey" PRIMARY KEY ("id")
);

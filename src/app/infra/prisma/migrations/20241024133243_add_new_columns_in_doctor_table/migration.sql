/*
  Warnings:

  - A unique constraint covering the columns `[cns]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "doctors_phone_key";

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "cbo" TEXT,
ADD COLUMN     "cns" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "doctors_cns_key" ON "doctors"("cns");

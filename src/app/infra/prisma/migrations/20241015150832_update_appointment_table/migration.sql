/*
  Warnings:

  - You are about to drop the column `appointment_date` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `diagnosis` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `exam` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `type_query` on the `appointments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "appointment_date",
DROP COLUMN "diagnosis",
DROP COLUMN "exam",
DROP COLUMN "type_query",
ADD COLUMN     "appointment_type" TEXT NOT NULL DEFAULT 'consulta',
ADD COLUMN     "diagnosis_summary" TEXT,
ADD COLUMN     "examination" TEXT,
ALTER COLUMN "scheduled_date" DROP DEFAULT,
ALTER COLUMN "scheduled_date" SET DATA TYPE TIMESTAMP(3);

/*
  Warnings:

  - You are about to drop the `queries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "queries" DROP CONSTRAINT "queries_patient_id_fkey";

-- DropTable
DROP TABLE "queries";

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "type_query" TEXT NOT NULL DEFAULT 'query',
    "exam" TEXT,
    "diagnosis" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

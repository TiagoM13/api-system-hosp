/*
  Warnings:

  - The primary key for the `appointments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `doctors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_doctor_id_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "doctor_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "appointments_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "appointments_id_seq";

-- AlterTable
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "doctors_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "doctors_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

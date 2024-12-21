/*
  Warnings:

  - The values [OTHER] on the enum `Sex` will be removed. If these variants are still used in the database, this will fail.
  - The `appointment_type` column on the `appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `doctors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `material_status` on the `patients` table. All the data in the column will be lost.
  - The `status` column on the `patients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `sex` on the `doctors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sex` on the `patients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Sex_new" AS ENUM ('MALE', 'FEMALE');
ALTER TABLE "patients" ALTER COLUMN "sex" TYPE "Sex_new" USING ("sex"::text::"Sex_new");
ALTER TABLE "doctors" ALTER COLUMN "sex" TYPE "Sex_new" USING ("sex"::text::"Sex_new");
ALTER TYPE "Sex" RENAME TO "Sex_old";
ALTER TYPE "Sex_new" RENAME TO "Sex";
DROP TYPE "Sex_old";
COMMIT;

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "appointment_type",
ADD COLUMN     "appointment_type" "AppointmentType" NOT NULL DEFAULT 'QUERY',
DROP COLUMN "status",
ADD COLUMN     "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "sex",
ADD COLUMN     "sex" "Sex" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "material_status",
ADD COLUMN     "marital_status" "MaritalStatus",
DROP COLUMN "sex",
ADD COLUMN     "sex" "Sex" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

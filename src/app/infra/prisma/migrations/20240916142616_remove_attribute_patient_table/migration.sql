/*
  Warnings:

  - You are about to drop the column `public_id` on the `patients` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_patients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birth_date" DATETIME NOT NULL,
    "cpf" TEXT,
    "cns" TEXT,
    "sex" TEXT NOT NULL,
    "address" TEXT,
    "mother_name" TEXT,
    "father_name" TEXT,
    "material_status" TEXT,
    "occupation" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "health_agent" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_patients" ("address", "birth_date", "cns", "cpf", "created_at", "email", "father_name", "health_agent", "id", "material_status", "mother_name", "name", "occupation", "phone", "sex", "status", "updated_at") SELECT "address", "birth_date", "cns", "cpf", "created_at", "email", "father_name", "health_agent", "id", "material_status", "mother_name", "name", "occupation", "phone", "sex", "status", "updated_at" FROM "patients";
DROP TABLE "patients";
ALTER TABLE "new_patients" RENAME TO "patients";
CREATE UNIQUE INDEX "patients_cpf_key" ON "patients"("cpf");
CREATE UNIQUE INDEX "patients_cns_key" ON "patients"("cns");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

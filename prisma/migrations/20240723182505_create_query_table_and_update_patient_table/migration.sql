/*
  Warnings:

  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Patient";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birth_date" DATETIME NOT NULL,
    "cpf" TEXT,
    "cnes" TEXT,
    "sex" TEXT NOT NULL,
    "address" TEXT,
    "mother_name" TEXT,
    "father_name" TEXT,
    "material_status" TEXT,
    "occupation" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "queries" INTEGER
);

-- CreateTable
CREATE TABLE "queries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "public_id" TEXT NOT NULL,
    "type_query" TEXT NOT NULL DEFAULT 'query',
    "exam" TEXT,
    "diagnosis" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "patient_id" TEXT NOT NULL,
    CONSTRAINT "queries_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_cpf_key" ON "patients"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "patients_cnes_key" ON "patients"("cnes");

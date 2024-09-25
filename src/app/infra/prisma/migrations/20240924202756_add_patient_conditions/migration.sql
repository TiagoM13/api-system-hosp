/*
  Warnings:

  - You are about to drop the column `patient_id` on the `conditions` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PatientCondition" (
    "patient_id" TEXT NOT NULL,
    "condition_id" INTEGER NOT NULL,

    PRIMARY KEY ("patient_id", "condition_id"),
    CONSTRAINT "PatientCondition_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatientCondition_condition_id_fkey" FOREIGN KEY ("condition_id") REFERENCES "conditions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_conditions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_conditions" ("id", "name") SELECT "id", "name" FROM "conditions";
DROP TABLE "conditions";
ALTER TABLE "new_conditions" RENAME TO "conditions";
CREATE UNIQUE INDEX "conditions_name_key" ON "conditions"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

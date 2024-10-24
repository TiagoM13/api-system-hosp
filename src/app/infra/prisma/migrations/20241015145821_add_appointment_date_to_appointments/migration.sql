-- 1. Adicionar a coluna como opcional (aceitando valores NULL)
ALTER TABLE "appointments" ADD COLUMN "appointment_date" TIMESTAMP;

-- 2. Atualizar as linhas existentes com um valor padrão (por exemplo, a data atual)
UPDATE "appointments" SET "appointment_date" = "created_at";

-- 3. Tornar a coluna obrigatória (NOT NULL) depois de atualizar todas as linhas
ALTER TABLE "appointments" ALTER COLUMN "appointment_date" SET NOT NULL;

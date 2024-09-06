import { prisma } from "@app/database/prisma"
import { IPatient } from "@shared/entities"

export class PatientRepository {
    async findAll(name: string | undefined, skip: number, take: number): Promise<IPatient[]> {
        return await prisma.patient.findMany({
            skip,
            take,
            where: {
                name: name ? { contains: name } : undefined
            },
            orderBy: {
                created_at: "desc"
            }
        })
    }

    async findById(id: string): Promise<IPatient | null> {
        return await prisma.patient.findUnique({
            where: { id },
            include: {
                _count: true,
                queries: true
            }
        })
    }

    async findByCPF(cpf: string): Promise<IPatient | null> {
        return await prisma.patient.findUnique({
            where: { cpf }
        })
    }

    async findByCNES(cnes: string): Promise<IPatient | null> {
        return await prisma.patient.findUnique({
            where: { cnes }
        })
    }

    async findFirstByCPF(cpf: string, patientId: string): Promise<IPatient | null> {
        return await prisma.patient.findFirst({
            where: {
                cpf,
                id: { not: patientId }
            }
        })
    }

    async findFirstByCNES(cnes: string, patientId: string): Promise<IPatient | null> {
        return await prisma.patient.findFirst({
            where: {
                cnes,
                id: { not: patientId }
            }
        })
    }

    async count(name: string | undefined): Promise<number> {
        return await prisma.patient.count({
            where: {
                name: name ? { contains: name } : undefined
            }
        });
    }

    async create(data: IPatient): Promise<IPatient> {
        return await prisma.patient.create({ data })
    }

    async update(id: string, data: IPatient): Promise<IPatient> {
        return await prisma.patient.update({
            where: { id },
            data
        })
    }

    async delete(id: string): Promise<IPatient> {
        return await prisma.patient.delete({ where: { id } })
    }
}
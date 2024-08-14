import { prisma } from "@app/database/prisma";
import { IQuery } from "@shared/entities";

export class QueryRepository {
    async findAll(patientId: string, skip: number, take: number, type_query?: string, startDate?: Date, endDate?: Date): Promise<IQuery[]> {
        return await prisma.query.findMany({
            skip,
            take,
            where: {
                patient_id: patientId,
                type_query: type_query ? type_query : undefined,
                created_at: {
                    ...(startDate ? { gte: startDate } : {}),
                    ...(endDate ? { lte: endDate } : {})
                }
            }
        })
    }

    async findById(query_id: number): Promise<IQuery | null> {
        return prisma.query.findUnique({
            where: { id: query_id },
        })
    }

    async count(patientId: string, type_query?: string, startDate?: Date, endDate?: Date): Promise<number> {
        return await prisma.query.count({
            where: {
                patient_id: patientId,
                type_query: type_query ? type_query : undefined,
                created_at: {
                    ...(startDate ? { gte: startDate } : {}),
                    ...(endDate ? { lte: endDate } : {})
                }
            }
        })
    }

    async create(patient_id: string, data: IQuery): Promise<IQuery> {
        return await prisma.query.create({
            data: {
                ...data,
                patient_id
            }
        })
    }

    async update(query_id: number, data: IQuery): Promise<IQuery | null> {
        return await prisma.query.update({
            where: { id: query_id },
            data
        })
    }
}
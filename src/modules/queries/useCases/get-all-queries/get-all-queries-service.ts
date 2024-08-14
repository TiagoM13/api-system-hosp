import { AppError } from "@app/errors";
import { IMetadataResponse, IQuery, IQueryParamsService } from "@shared/entities";
import { PatientRepository, QueryRepository } from "@shared/repositories";

type IGetAllQueriesServiceResponse = {
    queries: IQuery[],
    meta: IMetadataResponse
}

type IGetAllQueriesParams = IQueryParamsService & {
    patient_id: string
    end_date?: Date
    start_date?: Date
    type_query?: string
}

export class GetAllQueriesService {
    private queryRepository: QueryRepository
    private patientRepository: PatientRepository

    constructor(
        queryRepository: QueryRepository,
        patientRepository: PatientRepository
    ) {
        this.queryRepository = queryRepository;
        this.patientRepository = patientRepository;
    }

    async execute({ patient_id, page, items_per_page, type_query, start_date, end_date }: IGetAllQueriesParams): Promise<IGetAllQueriesServiceResponse> {
        const patient = await this.patientRepository.findById(patient_id);

        if (!patient) {
            throw new AppError('Patient not found.');
        }

        if (page <= 0) {
            throw new AppError("Invalid page number.");
        }
        if (items_per_page <= 0 || items_per_page > 50) {
            throw new AppError("Invalid limit number.");
        }

        const currentData = await this.queryRepository.count(patient_id, type_query, start_date, end_date)
        const totalPages = Math.ceil(currentData / items_per_page);

        if (totalPages === 0) {
            return {
                queries: [],
                meta: {
                    page,
                    has_previous_page: false,
                    has_next_page: false,
                    total_pages: 0,
                    total_records: 0,
                    items_per_page,
                    total_current_records: 0
                }
            };
        }

        const skip = (page - 1) * items_per_page

        const queries = await this.queryRepository.findAll(patient_id, skip, items_per_page, type_query, start_date, end_date)

        const totalItemsInCurrentPage = queries.length;
        const hasPreviousPage = page > 1;
        const hasNextPage = page < totalPages;

        return {
            queries,
            meta: {
                page,
                total_pages: totalPages,
                total_records: currentData,
                total_current_records: totalItemsInCurrentPage,
                items_per_page,
                has_previous_page: hasPreviousPage,
                has_next_page: hasNextPage
            }
        }
    }
}
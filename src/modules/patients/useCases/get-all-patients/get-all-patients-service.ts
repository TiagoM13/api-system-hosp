import { AppError } from "@app/errors";
import { IMetadataResponse, IPatient, IQueryParamsService } from "@shared/entities";
import { PatientRepository } from "@shared/repositories";

type IGetAllPatientsServiceResponse = {
    patients: IPatient[];
    meta: IMetadataResponse;
}

export class GetAllPatientsService {
    private patientRepository: PatientRepository

    constructor(patientRepository: PatientRepository) {
        this.patientRepository = patientRepository
    }

    async execute({ name, page, items_per_page }: IQueryParamsService): Promise<IGetAllPatientsServiceResponse> {
        if (isNaN(page) || page <= 0) {
            throw new AppError("Invalid page number.");
        }
        if (isNaN(items_per_page) || items_per_page <= 0) {
            throw new AppError("Invalid limit number.");
        }

        const currentData = await this.patientRepository.count(name)
        const totalPages = Math.ceil(currentData / items_per_page)

        const patients = await this.patientRepository.findAll(name, (page - 1) * items_per_page, items_per_page)

        if (totalPages === 0) {
            return {
                patients: [],
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

        const totalItemsInCurrentPage = patients.length;
        const hasPreviousPage = page > 1;
        const hasNextPage = page < totalPages;

        return {
            patients,
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
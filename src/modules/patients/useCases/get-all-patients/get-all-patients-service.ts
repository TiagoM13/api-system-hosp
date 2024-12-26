import { IPatient, IPatientFilters } from '@shared/entities';
import { PatientRepository } from '@shared/repositories/implementations';
import { FindAndCountAll } from '@shared/utils/format-paginate';
import { validatePaginationParams } from '@shared/utils/validate-paginate';

export class GetAllPatientsService {
  constructor(private readonly patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(params: IPatientFilters): Promise<FindAndCountAll<IPatient>> {
    const { page, items_per_page } = params;
    validatePaginationParams(page, items_per_page);

    const offset = (page - 1) * items_per_page;
    const { rows, count } = await this.patientRepository.findAndCountAll({
      ...params,
      skip: offset,
      take: items_per_page,
    });

    return {
      rows,
      count,
    };
  }
}

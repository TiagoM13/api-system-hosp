import { IPatient, IPaginateRequest } from '@shared/entities';
import { PatientRepository } from '@shared/repositories/implementations';
import { FindAndCountAll } from '@shared/utils/format-paginate';
import { validatePaginationParams } from '@shared/utils/validate-paginate';

export class GetAllPatientsService {
  constructor(private readonly patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute({
    name,
    page = 1,
    items_per_page = 10,
  }: IPaginateRequest): Promise<FindAndCountAll<IPatient>> {
    validatePaginationParams(page, items_per_page);

    const offset = (page - 1) * items_per_page;
    const { rows, count } = await this.patientRepository.findAndCountAll({
      name,
      skip: offset,
      take: items_per_page,
    });

    return {
      rows,
      count,
    };
  }
}

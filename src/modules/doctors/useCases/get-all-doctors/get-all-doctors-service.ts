import { IDoctor, IPaginateRequest } from '@shared/entities';
import { DoctorRepository } from '@shared/repositories/implementations/doctor-repository';
import { validatePaginationParams } from '@shared/utils';
import { FindAndCountAll } from '@shared/utils/format-paginate';

export class GetAllDoctorsService {
  constructor(private readonly doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async execute({
    name,
    page,
    items_per_page,
  }: IPaginateRequest): Promise<FindAndCountAll<IDoctor>> {
    validatePaginationParams(page, items_per_page);

    const offset = (page - 1) * items_per_page;

    const { count, rows } = await this.doctorRepository.findAndCountAll({
      name,
      skip: offset,
      take: items_per_page,
    });

    return { count, rows };
  }
}

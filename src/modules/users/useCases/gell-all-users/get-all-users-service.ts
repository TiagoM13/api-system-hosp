import { UserRepository } from '@modules/users/repositories/user-repository';
import { IPaginateRequest, IUser } from '@shared/entities';
import { type FindAndCountAll } from '@shared/utils/format-paginate';
import { validatePaginationParams } from '@shared/utils/validate-paginate';

export class GetAllUsersService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    name,
    page,
    items_per_page,
  }: IPaginateRequest): Promise<FindAndCountAll<IUser>> {
    validatePaginationParams(page, items_per_page);

    const offset = (page - 1) * items_per_page;
    const { rows, count } = await this.userRepository.findAndCountAll({
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

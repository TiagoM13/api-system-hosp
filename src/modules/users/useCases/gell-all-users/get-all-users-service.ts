import { AppError } from '@app/errors/app-client';
import {
  INVALID_NUMBER_ITEMS_PER_PAGE,
  INVALID_PAGE_NUMBER,
} from '@shared/constants/messages';
import {
  IMetadataResponse,
  IQueryParamsService,
  IUser,
} from '@shared/entities';
import { UserRepository } from '@shared/repositories/implementations';

type IGetAllUsersServiceResponse = {
  users: IUser[];
  meta: IMetadataResponse;
};

export class GetAllUsersService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    name,
    page,
    items_per_page,
  }: IQueryParamsService): Promise<IGetAllUsersServiceResponse> {
    if (isNaN(page) || page <= 0) {
      throw new AppError(INVALID_PAGE_NUMBER);
    }
    if (isNaN(items_per_page) || items_per_page <= 0) {
      throw new AppError(INVALID_NUMBER_ITEMS_PER_PAGE);
    }

    const currentData = await this.userRepository.count(name);
    const totalPages = Math.ceil(currentData / items_per_page);

    if (totalPages === 0) {
      return {
        users: [],
        meta: {
          page,
          has_previous_page: false,
          has_next_page: false,
          total_pages: 0,
          total_records: 0,
          items_per_page,
          total_current_records: 0,
        },
      };
    }

    const skip = (page - 1) * items_per_page;

    const users = await this.userRepository.findAll(name, skip, items_per_page);

    const totalItemsInCurrentPage = users.length;
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    return {
      users,
      meta: {
        page,
        total_pages: totalPages,
        total_records: currentData,
        total_current_records: totalItemsInCurrentPage,
        items_per_page,
        has_previous_page: hasPreviousPage,
        has_next_page: hasNextPage,
      },
    };
  }
}

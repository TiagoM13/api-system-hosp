import { AppError } from '@app/errors/app-client';
import {
  INVALID_PAGE_NUMBER,
  INVALID_NUMBER_ITEMS_PER_PAGE,
} from '@shared/constants/messages';

export function validatePaginationParams(
  page: number,
  items_per_page: number,
): void {
  if (isNaN(page) || page <= 0) {
    throw new AppError(INVALID_PAGE_NUMBER);
  }
  if (isNaN(items_per_page) || items_per_page <= 0) {
    throw new AppError(INVALID_NUMBER_ITEMS_PER_PAGE);
  }
}

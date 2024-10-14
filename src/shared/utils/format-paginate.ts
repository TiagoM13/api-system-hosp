import { IPaginateRequest, type IPaginateResponse } from '../entities';

export type FindAndCountAll<T> = {
  rows: T[];
  count: number;
};

export function formatPaginate<T>(
  params: IPaginateRequest,
  model: FindAndCountAll<T>,
): IPaginateResponse {
  const page = Number(params.page) || 1;
  const items_per_page = Number(params.items_per_page) || 10;
  const total_pages = Math.ceil(model.count / items_per_page);
  const total_current_records = model.rows.length;
  const has_previous_page = page > 1;
  const has_next_page = page < total_pages;

  return {
    page,
    total_pages,
    total_records: model.count,
    total_current_records,
    items_per_page,
    has_previous_page,
    has_next_page,
  };
}

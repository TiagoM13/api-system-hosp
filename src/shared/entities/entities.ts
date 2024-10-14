export interface FindEntitiesAndCountParams {
  name: string | undefined;
  take: number;
  skip: number;
}

export interface FindEntitiesAndCountResult<T> {
  count: number;
  rows: T[];
}

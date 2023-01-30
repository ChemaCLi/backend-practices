import { IsArray } from 'class-validator';

export interface IPaginationInfo {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  nextPage: boolean;
  previousPage: boolean;
}

export class Paginated<T> {
  @IsArray()
  readonly entries: T[];
  readonly paginationInfo: IPaginationInfo;

  constructor(
    data: T[],
    pagination: {
      page: number;
      pageSize: number;
      totalRecords: number;
    },
  ) {
    this.entries = data;
    const totalPages = Math.ceil(pagination.totalRecords / pagination.pageSize);

    this.paginationInfo = {
      ...pagination,
      totalPages,
      page: Number(pagination.page),
      pageSize: Number(pagination.pageSize),
      previousPage: pagination.page > 1,
      nextPage: pagination.page < totalPages,
    };
  }
}

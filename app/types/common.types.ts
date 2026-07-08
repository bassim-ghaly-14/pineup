export interface BaseEntity {
  _id: string;

  createdAt: string;

  updatedAt: string;
}

export interface SelectOption {
  label: string;

  value: string;
}

export interface PaginationMeta {
  page: number;

  limit: number;

  total: number;

  pages: number;
}
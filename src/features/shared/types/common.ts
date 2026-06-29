export interface PaginationMetadata {
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalItemCount: number
  pageCount: number
  currentPage: number
  pageSize: number
}

export interface PaginationResponse<T> {
  metadata: PaginationMetadata
  items: T[]
}

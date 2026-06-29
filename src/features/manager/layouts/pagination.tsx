import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination"

interface Props {
  metadata: {
    currentPage: number
    pageCount: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  onPageChange: (page: number) => void
}

export function PaginationSection({ metadata, onPageChange }: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (metadata.hasPreviousPage) onPageChange(metadata.currentPage - 1)
            }}
          />
        </PaginationItem>

        {Array.from({ length: metadata.pageCount }).map((_, index) => {
          const page = index + 1
          return (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === metadata.currentPage} onClick={() => onPageChange(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (metadata.hasNextPage) onPageChange(metadata.currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

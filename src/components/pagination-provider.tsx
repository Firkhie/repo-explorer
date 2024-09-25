import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export interface PaginationProviderProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export function PaginationProvider({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProviderProps) {
  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap justify-center">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={cn(
              "cursor-pointer",
              currentPage <= 1 ? "pointer-events-none opacity-50" : ""
            )}
          />
        </PaginationItem>

        {/* First Page: Only show if currentPage is not 1 */}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              className="cursor-pointer"
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis before currentPage */}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Current Page */}
        <PaginationItem>
          <PaginationLink isActive className="cursor-pointer">
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {/* Next Page: Only show if not on the last page */}
        {currentPage < totalPages && currentPage + 1 !== totalPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(currentPage + 1)}
              className="cursor-pointer"
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis after currentPage */}
        {currentPage + 1 < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last Page: Only show if not already on the last page */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              className="cursor-pointer"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            aria-disabled={currentPage >= totalPages}
            className={cn(
              "cursor-pointer",
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

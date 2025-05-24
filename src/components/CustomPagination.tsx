import { Pagination, PaginationItem } from "@mui/material";

interface PaginationProps {
  pageNumber?: number;
  setPageNumber: (page: number) => void;
  totalPages: number;
}

const CustomPagination =({ pageNumber, setPageNumber, totalPages }: PaginationProps) => {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={(event, value) => setPageNumber(value)}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          siblingCount={0}
          boundaryCount={0}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "rgba(157, 164, 172, 0.8)",
                  color: "white",
                },
                "&:hover": {
                  backgroundColor: "rgba(157, 164, 172, 0.8)",
                  color: "white",
                },
              }}
            />
          )}
        />
      </div>
    );
  };

export default CustomPagination;

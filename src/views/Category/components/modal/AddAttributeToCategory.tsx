import {
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
  } from "@mui/material";
  import { useInfiniteQuery } from "@tanstack/react-query";
  import InfiniteScroll from "react-infinite-scroll-component";
  import { useState } from "react";
  import { IAttribute } from "src/Interfaces/IAttribute";
  import attributeApi from "src/services/api/Attributes";
  
  interface Props {
    categoryId: number;
    open: boolean;
    onClose: () => void;
  }
  
  const AddAttributeToCategory = ({ categoryId, open, onClose }: Props) => {
    const [selected, setSelected] = useState<number[]>([]);
    const pageSize = 10;
  
    const {
      data,
      fetchNextPage,
      hasNextPage,
    //   isFetchingNextPage,
      isLoading,
    } = useInfiniteQuery({
      queryKey: ["attributes"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await attributeApi.getPagingApi({
          pageNumber: pageParam,
          pageSize,
        });
        return {
          items: res.data.items.$values,
          nextPage:
            res.data.currentPage < res.data.totalPages
              ? pageParam + 1
              : undefined,
        };
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
      enabled: open,
    });
  
    const handleToggle = (id: number) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };
  
    const handleSubmit = async () => {
      console.log("Selected attributes:", selected);
      onClose();
    };
  
    const allAttributes =
      data?.pages.flatMap((page) => page.items as IAttribute[]) || [];
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
        <DialogTitle>Thêm thuộc tính vào danh mục</DialogTitle>
        <DialogContent
          id="scrollable-attribute-list"
          sx={{
            maxHeight: "20vh",
            overflowY: "auto",
            paddingRight: "12px",
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <InfiniteScroll
              dataLength={allAttributes.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<CircularProgress size={20} />}
              scrollableTarget="scrollable-attribute-list"
            >
              <Grid container spacing={2}>
                {allAttributes.map((attr) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={attr.attributeId}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selected.includes(attr.attributeId)}
                          onChange={() => handleToggle(attr.attributeId)}
                        />
                      }
                      label={attr.name}
                    />
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button
            onClick={handleSubmit}
            disabled={selected.length === 0}
            variant="contained"
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default AddAttributeToCategory;
  
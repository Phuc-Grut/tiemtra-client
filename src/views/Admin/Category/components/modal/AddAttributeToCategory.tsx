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
import {
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { IAttribute } from "src/Interfaces/IAttribute";
import attributeApi from "src/services/api/Attributes";
import categoryApi from "src/services/api/Category";
import useToast from "src/components/Toast";

interface Props {
  categoryId: number;
  open: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}

const AddAttributeToCategory = ({ categoryId, open, onClose, onUpdated }: Props) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [initialSelected, setInitialSelected] = useState<number[]>([]);
  const [touched, setTouched] = useState<Set<number>>(new Set());
  const pageSize = 20;
  const { showSuccess, showError } = useToast();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["attributes"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await attributeApi.getPagingApi({
        pageNumber: pageParam,
        pageSize,
      });
      return {
        items: res.data.items ?? [],
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

  const { data: selectedAttributesRes, } = useQuery({
    queryKey: ["selectedAttributesRes", categoryId],
    queryFn: () => categoryApi.getAttributeById(categoryId),
    enabled: open,
  });

  useEffect(() => {
    if (open && selectedAttributesRes?.data) {
      setInitialSelected(selectedAttributesRes?.data);
      setSelected(selectedAttributesRes?.data);
      setTouched(new Set());
    }
    if (!open) {
      setInitialSelected([]);
      setSelected([]);
      setTouched(new Set());
    }
  }, [open, selectedAttributesRes]);

  const handleToggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    setTouched((prev) => new Set(prev).add(id));
  };

  const handleSubmit = async () => {
    const added: number[] = [];
    const removed: number[] = [];

    touched.forEach((id) => {
      const wasSelectedInitially = initialSelected.includes(id);
      const isSelectedNow = selected.includes(id);

      if (wasSelectedInitially && !isSelectedNow) {
        removed.push(id);
      }

      if (!wasSelectedInitially && isSelectedNow) {
        added.push(id);
      }
    });
    const finalList = [...added, ...removed];

    try {
      await categoryApi.setAttributesForCategory({
        categoryId,
        attributeIds: finalList,
      });
      onUpdated?.();
      showSuccess("Sửa thành công!");
      onClose();
    } catch (err) {
      showError("Sửa thất bại");
      console.error("Lỗi khi cập nhật thuộc tính:", err);
    }
  };

  const allAttributes =
    data?.pages.flatMap((page) => page.items as IAttribute[]) || [];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Thêm thuộc tính vào danh mục</DialogTitle>
      <DialogContent
        id="scrollable-attribute-list"
        sx={{
          maxHeight: "70vh",
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
        <Button onClick={handleSubmit} variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAttributeToCategory;

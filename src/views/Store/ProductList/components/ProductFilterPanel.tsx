import {
  Box,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ICategory } from "src/Interfaces/ICategory";

interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
  categoryId?: number;
  setCategoryId: (value: number | undefined) => void; 
  categories: ICategory[];
}

const ProductFilterPanel = ({
  keyword,
  setKeyword,
  categoryId,
  setCategoryId,
  categories,
}: Props) => {
  return (
    <Box>
      {/* Search Box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #4CAF50",
          borderRadius: "8px",
          px: 1.5,
          py: 0.5,
          mb: 0,
        }}
      >
        <SearchIcon sx={{ color: "#4CAF50", fontSize: "20px", mr: 1 }} />
        <InputBase
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          fullWidth
          sx={{
            fontSize: "14px",
            color: "#333",
          }}
        />
      </Box>

      {/* Section title */}
      <Typography
        fontWeight="bold"
        textTransform="uppercase"
        fontSize="14px"
        color="#333"
        mb={0.5}
      >
        Danh mục sản phẩm
      </Typography>

      {/* Green underline */}
      <Box
        sx={{
          height: "2px",
          backgroundColor: "#4CAF50",
          width: "100%",
          mb: 1.5,
        }}
      />

      {/* Category list */}
      <List disablePadding>
        {categories.map((cat) => (
          <ListItemButton
            key={cat.categoryId}
            selected={categoryId === cat.categoryId}
            onClick={() =>
              setCategoryId(
                categoryId === cat.categoryId ? undefined : cat.categoryId
              )
            }
            sx={{
              px: 1,
              py: 0.8,
              borderRadius: 1,
              "&.Mui-selected": {
                backgroundColor: "#f9f9f9",
              },
            }}
          >
            <ListItemText
              primary={
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: "14px" }}
                  >
                    {cat.categoryName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "12px",
                      color: "rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    ({0})
                  </Typography>
                </Box>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default ProductFilterPanel;

import { Box, TextField, Button, Typography } from "@mui/material";

const CategoryForm = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
      <Typography variant="h6">Thêm Danh Mục</Typography>
      <TextField label="Tên danh mục" variant="outlined" fullWidth />
      <Button variant="contained" color="primary">Lưu</Button>
    </Box>
  )
}

export default CategoryForm

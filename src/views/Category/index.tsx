import React from "react"
import { Box, Typography } from "@mui/material"
import CategoryTable from "./components/CategoryTable"
import Form from "./components/CategoryForm"

const Category: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Trang Danh Mục</Typography>
      {/* <Form /> */}
      <CategoryTable />
    </Box>
  )
}

export default Category

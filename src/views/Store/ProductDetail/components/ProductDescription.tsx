import { Box, Typography, Divider } from "@mui/material";

interface ProductDescriptionProps {
  description?: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description) return null;

  return (
    <Box
      mt={4}
      p={3}
      bgcolor="#fafafa"
      borderRadius={2}
      boxShadow={1}
      border="1px solid #4C7940"
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{
          textAlign: "left",
          color: "#4C7940",
        }}
      >
        Mô tả sản phẩm
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          whiteSpace: "pre-line",
          fontSize: 16,
          lineHeight: 1.8,
          color: "#414141",
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Box>
  );
};

export default ProductDescription;

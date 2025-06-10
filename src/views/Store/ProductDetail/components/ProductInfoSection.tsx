import {
  Box,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { IProduct, ProductVariation } from "src/Interfaces/IProduct";
import ProductRenderPrice from "src/components/ProductRenderPrice";

interface ProductInfoSectionProps {
  product: IProduct;
}

const ProductInfoSection = ({ product }: ProductInfoSectionProps) => {
  const [variant, setVariant] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = (
    event: React.MouseEvent<HTMLElement>,
    newVariant: string | null
  ) => {
    if (newVariant !== null) {
      setVariant(newVariant);
    }
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      product,
      quantity,
      variant,
    });
    // TODO: Thêm hàm addToCart() hoặc dispatch Redux
  };

  const handleBuyNow = () => {
    console.log("Buy now:", {
      product,
      quantity,
      variant,
    });
    // TODO: Thêm logic thanh toán
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        {product.productName}
      </Typography>

      {/* <Typography variant="body2" color="text.secondary" mb={2}>
        Home / Sản Phẩm / Trà Hoa
      </Typography> */}

      <Typography variant="h5" color="green" fontWeight="bold" mb={2}>
        <ProductRenderPrice product={product} selectedTypeName={variant} />
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography fontSize={12} fontWeight="bold">
          PHÂN LOẠI
        </Typography>

        <ToggleButtonGroup
          value={variant}
          exclusive
          onChange={handleVariantChange}
          aria-label="Loại sản phẩm"
          sx={{ gap: 1 }}
        >
          {product.productVariations?.map((variation: ProductVariation) => (
            <ToggleButton
              key={variation.productVariationId}
              value={variation.typeName}
              sx={{
                px: 2,
                py: 0.5,
                fontSize: 13,
                // minWidth: "unset",
                border: "1px solid #ccc !important",
              }}
            >
              {variation.typeName}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography fontSize={12} fontWeight="medium">
          SỐ LƯỢNG
        </Typography>
        <Stack
          direction="row"
          // spacing={1}
          alignItems="center"
          sx={{ border: "1px solid #ccc", borderRadius: 1 }}
        >
          <IconButton
            onClick={() => handleQuantityChange(-1)}
            size="small"
            sx={{ padding: 0.2 }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography minWidth={24} textAlign="center" sx={{ fontSize: 14 }}>
            {quantity}
          </Typography>
          <IconButton
            onClick={() => handleQuantityChange(1)}
            size="small"
            sx={{ padding: 0.2 }}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </Box>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success" onClick={handleAddToCart}>
          THÊM VÀO GIỎ HÀNG
        </Button>
        <Button variant="contained" color="success" onClick={handleBuyNow}>
          MUA NGAY
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductInfoSection;

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
import { AddProductToCart } from "src/Interfaces/ICart";
import cartApi from "src/services/api/Cart";
import useToast from "src/components/Toast";
import { useCurrentUser } from "src/hook/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";

interface ProductInfoSectionProps {
  product: IProduct;
}

const ProductInfoSection = ({ product }: ProductInfoSectionProps) => {
  const [variant, setVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();

  const { showSuccess, showError } = useToast();
  const user = useCurrentUser();

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

  const selectedVariationId =
    product.productVariations?.find((v) => v.typeName === variant)
      ?.productVariationId ?? null;

  const handleAddToCart = async (data: AddProductToCart) => {

    // check biến thể
    const hasVariations = data.product?.productVariations?.length;
    const selectedVariation = data.product?.productVariations?.find(
      (v) => v.productVariationId === data.productVariationId
    );

    if (hasVariations && !selectedVariation) {
      showError("Vui lòng chọn loại sản phẩm.");
      return;
    }

    // add local
    if (!user) {
      try {
        const raw = localStorage.getItem("cart");
        const cart = raw
          ? JSON.parse(raw)
          : { items: [], totalQuantity: 0, totalPrice: 0 };

        const existing = cart.items.find(
          (item: any) =>
            item.productId === data.productId &&
            item.productVariationId === data.productVariationId
        );

        if (existing) {
          existing.quantity += data.quantity;
        } else {
          cart.items.push({
            cartItemId: crypto.randomUUID?.() || Date.now().toString(),
            productId: data.productId,
            productVariationId: data.productVariationId,
            productCode: data.product?.productCode,
            productName: data.product?.productName || "",
            productVariationName: selectedVariation?.typeName || "",
            previewImage: data.product?.privewImageUrl || "",
            price: selectedVariation?.price || data.product?.price || 0,
            quantity: data.quantity,
          });
        }

        cart.totalQuantity = cart.items.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0
        );
        cart.totalPrice = cart.items.reduce(
          (sum: number, item: any) => sum + item.quantity * item.price,
          0
        );

        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("local-cart-updated"));
        showSuccess("Đã thêm vào giỏ hàng");
      } catch (err) {
        showError("Lỗi khi thêm vào giỏ hàng tạm");
      }

      return;
    }

    // add api
    try {
      const res = await cartApi.addProductToCart(data);

      showSuccess(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["cart-total-quantity"] });
    } catch (err: any) {
      showError(err.response?.data ?? "Thêm sản phẩm thất bại");
    }
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
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            handleAddToCart({
              productId: product.productId,
              productVariationId: selectedVariationId,
              quantity: quantity,
              product: product,
            })
          }
        >
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

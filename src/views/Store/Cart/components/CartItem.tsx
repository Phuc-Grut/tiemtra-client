import React from "react";
import {
  Grid,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { ICartItem } from "src/Interfaces/ICart";
import { useNavigate } from "react-router-dom";
import { slugify } from "src/utils/slugify";
import QuantityInput from "./QuantityInput";

type CartItemProps = {
  item: ICartItem;
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleGoToProduct = () => {
    navigate(`/san-pham/${item.productCode}/${slugify(item.productName)}`);
  };

  return isMobile ? (
    <Grid
      container
      spacing={2}
      alignItems="center"
      mb={1}
      py={1}
      borderBottom="1px solid #eee"
    >
      <Grid item xs={3} display="flex" alignItems="center">
        <IconButton
          size="small"
          onClick={() => onRemove(item.cartItemId)}
          sx={{ mr: 1 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <img
          src={item.previewImage}
          alt={item.productName}
          style={{ width: 60, height: "auto", borderRadius: 4 }}
          onClick={handleGoToProduct}
        />
      </Grid>

      <Grid item xs={6}>
        <Box pl={1} onClick={handleGoToProduct}>
          <Typography fontWeight="bold" fontSize={13} lineHeight={1.3}>
            {item.productName}
          </Typography>
          <Typography fontSize={12} color="text.secondary" gutterBottom>
            {item.productVariationName}
          </Typography>
          <Typography fontWeight="bold" color="green" fontSize={13}>
            {item.quantity} x {item.price.toLocaleString()}₫
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={3}>
        <Box
          display="flex"
          alignItems="center"
          border="1px solid #ccc"
          borderRadius={1}
          width="fit-content"
          mx="auto"
        >
          <IconButton
            size="small"
            onClick={() => onQuantityChange(item.cartItemId, -1)}
            disabled={item.quantity === 1}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <QuantityInput item={item} onQuantityChange={onQuantityChange} />
          <IconButton
            size="small"
            onClick={() => onQuantityChange(item.cartItemId, 1)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  ) : (
    <Grid container alignItems="center" spacing={2} mb={2}>
      <Grid item xs={6}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={() => onRemove(item.cartItemId)}>
            <CloseIcon />
          </IconButton>
          <img
            onClick={handleGoToProduct}
            src={item.previewImage}
            alt={item.productName}
            style={{ width: 80, height: "auto", borderRadius: 4 }}
          />
          <Box onClick={handleGoToProduct}>
            <Typography fontWeight="bold">{item.productName}</Typography>
            <Typography fontSize={14} color="text.secondary">
              {item.productVariationName}
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={2}>
        <Typography fontWeight="bold" color="green">
          {item.price.toLocaleString()}₫
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Box
          display="flex"
          alignItems="center"
          border="1px solid #ccc"
          borderRadius={1}
        >
          <IconButton
            size="small"
            onClick={() => onQuantityChange(item.cartItemId, -1)}
            disabled={item.quantity === 1}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <QuantityInput item={item} onQuantityChange={onQuantityChange} />
          <IconButton
            size="small"
            onClick={() => onQuantityChange(item.cartItemId, 1)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Grid>

      <Grid item xs={2}>
        <Typography fontWeight="bold" color="green">
          {(item.price * item.quantity).toLocaleString()}₫
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CartItem;

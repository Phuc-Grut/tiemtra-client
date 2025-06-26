import React from "react";
import { Grid, IconButton, Typography, Box, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { ICartItem } from "src/Interfaces/ICart";

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
  return (
    <Grid container alignItems="center" spacing={2} mb={2}>

      <Grid item xs={6}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={() => onRemove(item?.cartItemId)}>
            <CloseIcon />
          </IconButton>
          <img
            src={item.previewImage}
            alt={item.productName}
            style={{ width: 80, height: "auto", borderRadius: 4 }}
          />
          <Box>
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
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <TextField
            value={item.quantity}
            inputProps={{ style: { textAlign: "center", width: 40 } }}
            variant="standard"
            disabled
          />
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

import React from "react";
import { Grid, IconButton, Typography, Box, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

type CartItemType = {
  id: string;
  name: string;
  variation: string;
  price: number;
  quantity: number;
  image: string;
};

type CartItemProps = {
  item: CartItemType;
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
};

const CartItem = ({ item, onQuantityChange, onRemove }: CartItemProps) => {
  return (
    <Grid container alignItems="center" spacing={2} mb={2}>
      <Grid item xs={1}>
        <IconButton onClick={() => onRemove(item.id)}>
          <CloseIcon />
        </IconButton>
      </Grid>

      <Grid item xs={5}>
        <Box display="flex" alignItems="center" gap={2}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: 60, height: "auto", borderRadius: 4 }}
          />
          <Box>
            <Typography fontWeight="bold">{item.name}</Typography>
            <Typography fontSize={14} color="text.secondary">
              {item.variation}
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
            onClick={() => onQuantityChange(item.id, -1)}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <TextField
            value={item.quantity}
            inputProps={{ style: { textAlign: "center", width: 30 } }}
            variant="standard"
            disabled
          />
          <IconButton size="small" onClick={() => onQuantityChange(item.id, 1)}>
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

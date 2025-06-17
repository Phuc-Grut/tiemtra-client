import React from "react";
import {
  Grid,
  IconButton,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

// ✅ Định nghĩa thêm "variation"
type CartItemType = {
  id: string;
  name: string;
  variation: string; // Hộp 15 gói, Hộp 10 gói, v.v.
  price: number;
  quantity: number;
  image: string;
};

type CartItemProps = {
  item: CartItemType;
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <Grid container alignItems="center" spacing={2} mb={2}>
      <Grid item>
        <IconButton onClick={() => onRemove(item.id)}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: 80, height: "auto", borderRadius: 4 }}
        />
      </Grid>
      <Grid item xs>
        <Typography fontWeight="bold">{item.name}</Typography>
        <Typography fontSize={14} color="text.secondary">
          {item.variation}
        </Typography>
      </Grid>
      <Grid item>
        <Typography fontWeight="bold" color="green">
          {item.price.toLocaleString()}₫
        </Typography>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center" border="1px solid #ccc" borderRadius={1}>
          <IconButton size="small" onClick={() => onQuantityChange(item.id, -1)}>
            <RemoveIcon fontSize="small" />
          </IconButton>
          <TextField
            value={item.quantity}
            inputProps={{ style: { textAlign: "center", width: 40 } }}
            variant="standard"
            disabled
          />
          <IconButton size="small" onClick={() => onQuantityChange(item.id, 1)}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Grid>
      <Grid item>
        <Typography fontWeight="bold" color="green">
          {(item.price * item.quantity).toLocaleString()}₫
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CartItem;

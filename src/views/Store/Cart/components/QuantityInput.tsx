import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

type QuantityInputProps = {
  item: {
    cartItemId: string;
    quantity: number;
  };
  onQuantityChange: (id: string, newQuantity: number) => void;
};

const QuantityInput = ({ item, onQuantityChange }: QuantityInputProps) => {
  const [inputValue, setInputValue] = useState(item.quantity.toString());

  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleBlur = () => {
    const parsed = parseInt(inputValue);
    if (!isNaN(parsed) && parsed > 0 && parsed !== item.quantity) {
      onQuantityChange(item.cartItemId, parsed);
    } else {
      
      setInputValue(item.quantity.toString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <TextField
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      inputProps={{
        style: {
          textAlign: "center",
          width: 30,
          fontSize: 13,
        },
      }}
      variant="standard"
    />
  );
};

export default QuantityInput;

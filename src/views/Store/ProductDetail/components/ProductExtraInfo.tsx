import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { IProduct } from "src/Interfaces/IProduct";

interface ProductExtraInfoProps {
  product: IProduct; 
}

const ProductExtraInfo = ({ product }: ProductExtraInfoProps) => {
    
  const getAttributeValue = (name: string) => {
    return (
      product.productAttributes?.find(
        (attr) => attr?.attributeName?.toLowerCase() === name.toLowerCase()
      )?.value || ""
    );
  };

  const variations = product?.productVariations ?? [];

  const [showFull, setShowFull] = useState(false);

  const longText = getAttributeValue("Công dụng");
  const shortText =
    longText.slice(0,100) + (longText.length > 100 ? "..." : "");

  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Thông tin khác:
      </Typography>
      <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
        <li>
          <b>Tên sản phẩm:</b> {product.productName}
        </li>
        <li>
          <b>Mã sản phẩm:</b> {product.productCode}
        </li>

        {variations.length > 0 && (
          <li>
            <b>Phân loại:</b> {variations.map((v) => v.typeName).join(", ")}
          </li>
        )}

        <li>
          <b>Thương hiệu:</b> {product.brandName}
        </li>

        {/* lấy từ thuộc tính */}
        <li>
          <b>Thành phần:</b> {getAttributeValue("Thành Phần")}
        </li>
        <li>
          <b>Công dụng:</b>{" "}
          <Typography
            variant="body2"
            component="span"
            sx={{ whiteSpace: "pre-line" }}
          >
            {showFull ? longText : shortText}
          </Typography>
          {longText.length > 200 && (
            <Button size="small" onClick={() => setShowFull(!showFull)}>
              {showFull ? "Ẩn bớt" : "xem thêm"}
            </Button>
          )}
        </li>
      </ul>
    </Box>
  );
};

export default ProductExtraInfo;

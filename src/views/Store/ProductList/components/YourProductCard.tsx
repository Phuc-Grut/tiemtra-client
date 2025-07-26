import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { IProduct, ProductVariation } from "src/Interfaces/IProduct";
import { slugify } from "src/utils/slugify";

interface Props {
  products: IProduct[];
}

const YourProductCard = ({ products }: Props) => {
  const renderPrice = (p: IProduct): string => {
    if (p.price && p.price > 0) {
      return p.price.toLocaleString() + "đ";
    }

    const variations = Array.isArray(p.productVariations)
      ? p.productVariations
      : [];

    const prices = variations
      .map((v: ProductVariation) => v.price)
      .filter((price): price is number => typeof price === "number");

    if (prices.length === 0) return "0 đ";

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return min === max
      ? `${min.toLocaleString()}đ`
      : `${min.toLocaleString()}đ - ${max.toLocaleString()}đ`;
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        width: "100%",
        mx: "auto",
        mt: 4,
        textAlign: "center",
      }}
    >
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={6} md={4} mb={5} key={product.productCode}>
            <Link
              to={`/san-pham/${product.productCode}/${slugify(
                product.productName
              )}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  width: { xs: 160, sm: 200, md: 240 },
                  borderRadius: 3,
                  boxShadow: 2,
                  border: "2px solid #009900",
                  flexShrink: 0,
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    product.privewImageUrl || product.productImageUrls?.[0]
                  }
                  alt={product.privewImageUrl || product.productImageUrls?.[0]}
                  sx={{
                    height: { xs: 140, sm: 180, md: 210 },
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: "16px",
                      marginTop: -1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {product.productName}
                  </Typography>

                  <Typography variant="body2" color="green" fontWeight={700}>
                    {renderPrice(product)}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.productVariations?.length
                      ? product.productVariations
                          .map((v) => v.typeName)
                          .join(", ")
                      : "Sét 10 gói"}
                  </Typography>
                </CardContent>

                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "#009900",
                    fontSize: "11px",
                    textTransform: "none",
                    borderRadius: 20,
                    padding: "4px 18px",
                    mb: 1,
                    mx: "auto",
                    display: "block",
                    "&:hover": {
                      backgroundColor: "#007700",
                    },
                  }}
                >
                  Xem chi tiết
                </Button>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default YourProductCard;

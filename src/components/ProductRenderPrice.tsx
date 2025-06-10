import { IProduct, ProductVariation } from "src/Interfaces/IProduct";


interface Props {
  product: IProduct;
  selectedTypeName?: string; // optional
}

const ProductRenderPrice = ({ product, selectedTypeName }: Props) => {
  // Nếu đã chọn loại → hiển thị giá của loại đó
  if (selectedTypeName) {
    const variation = product.productVariations?.find(
      (v: ProductVariation) => v.typeName === selectedTypeName
    );

    if (variation?.price) {
      return <>{variation.price.toLocaleString()}₫</>;
    }
  }

  // Nếu chưa chọn loại → hiển thị min - max
  const variations = product.productVariations || [];
  const prices = variations
    .map((v: ProductVariation) => v.price)
    .filter((price: any): price is number => typeof price === "number");

  if (prices.length === 0) return <>—</>;

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return (
    <>
      {min === max
        ? `${min.toLocaleString()}₫`
        : `${min.toLocaleString()}₫ - ${max.toLocaleString()}₫`}
    </>
  );
};

export default ProductRenderPrice;

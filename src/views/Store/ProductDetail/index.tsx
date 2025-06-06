import { Box } from "@mui/material"
import { useParams } from "react-router-dom";

const ProductDetail = () => {
    console.log("✅ Đã vào ProductDetail");
    const { code, slug } = useParams();
    console.log("🚀 ~ ProductDetail ~ code:", code)
    console.log("🚀 ~ ProductDetail ~ slug:", slug)
    return (
        <Box>
            <h1>Đây là trang sản phẩm chi tiết</h1>
        </Box>
    )
}

export default ProductDetail
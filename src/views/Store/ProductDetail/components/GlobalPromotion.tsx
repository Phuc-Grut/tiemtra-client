import { Box, Typography } from "@mui/material";

const GlobalPromotion = () => {
  return (
    <Box mt={4} p={2} border="1px solid #4CAF50" borderRadius={2}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        🎁 Ưu đãi theo tháng:
      </Typography>
      <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
        <li><b>Với hoá đơn 300k</b> tặng kèm 01 gói gừng mật ong sấy dẻo + 01 Bình nước (không áp dụng Bột củ sen)</li>
        <li><b>Với hoá đơn 600k</b> tặng kèm 02 gói gừng mật ong sấy dẻo + 02 Bình nước + miễn phí ship (không áp dụng Bột củ sen)</li>
        <li><b>Với hoá đơn 1000k</b> tặng kèm 01 hộp trà 159k + 02 gói gừng mật ong sấy dẻo + 02 Bình nước + miễn phí ship (không áp dụng Bột củ sen)</li>
      </ul>
    </Box>
  );
};

export default GlobalPromotion;

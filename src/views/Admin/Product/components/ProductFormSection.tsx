import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import CKEditorDialog from "src/ckeditor/CKEditorDialog";
import useToast from "src/components/Toast";
import { Brand, CreateProductRequest } from "src/Interfaces/IProduct";
import productApi from "src/services/api/Products/indext";
import formatVietnamTime from "src/utils/formatVietnamTime";

interface ProductFormSectionProps {
  formData: CreateProductRequest;
  setFormData: React.Dispatch<React.SetStateAction<CreateProductRequest>>;
  brands?: Brand[] | undefined;
  mode?: string;
}

const productStatusOptions = [
  { label: "Nháp", value: 0 },
  { label: "Đang bán", value: 1 },
  { label: "Ngừng bán", value: 2 },
  { label: "Hết hàng", value: 3 },
];

const ProductFormSection = ({
  formData,
  setFormData,
  brands,
  mode,
}: ProductFormSectionProps) => {
  
  const isReadOnly = mode === "view";
  const MAX_FILE_SIZE = 500 * 1024;
  const { showSuccess, showError } = useToast();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name === "productStatus") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      showError(" Vui lòng chọn ảnh dưới 200 KB.");
      return;
    }

    setPreviewFile(file);

    const formDataToSend = new FormData();
    formDataToSend.append("file", file);

    try {
      const res = await productApi.uploadImage(file);
      const previewImageUrl = res.data.fileUrl;

      setFormData((prev) => ({
        ...prev,
        privewImageUrl: previewImageUrl,
      }));

      setPreviewFile(file);
      showSuccess("Upload ảnh thành công");
    } catch (err) {
      showError("Upload thất bại");
    }
  };

  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [openEditor, setOpenEditor] = useState(false);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, color: "#333" }}>
        Thông tin sản phẩm
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          width: "100%",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            order: { xs: 0, md: 1 },
            width: { xs: "100%", md: "35%" },
            marginLeft: { xs: 3 },
          }}
        >
          <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
            Ảnh xem trước
          </Typography>
          {!isReadOnly && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ width: "100%", padding: "8px 0" }}
            />
          )}
          {formData?.privewImageUrl && (
            <Box sx={{ mt: 1 }}>
              <img
                src={formData?.privewImageUrl}
                alt="Preview"
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                  marginBottom: "8px",
                }}
              />
              <Typography variant="body2" sx={{ color: "#508815" }}>
                Đã chọn: {previewFile?.name}
              </Typography>
            </Box>
          )}
        </Box>
        {/* Thông tin cơ bản */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Mã sản phẩm"
              name="productCode"
              value={formData.productCode ?? ""}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ bgcolor: "#fff" }}
              InputProps={{ readOnly: mode === "view" || mode === "edit" }}
            />
            <TextField
              label="Tên sản phẩm"
              name="productName"
              value={formData.productName ?? ""}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ bgcolor: "#fff" }}
              InputProps={{ readOnly: isReadOnly }}
            />
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Giá (VND)"
              name="price"
              type="number"
              value={formData.price ?? ""}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ bgcolor: "#fff" }}
              InputProps={{ readOnly: isReadOnly || formData.hasVariations===true }}
            />
            <TextField
              label="Số lượng tồn kho"
              name="stock"
              type="number"
              value={formData.stock ?? ""}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ bgcolor: "#fff" }}
              InputProps={{ readOnly: isReadOnly || formData.hasVariations===true }}
            />
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Đã bán"
              name="totalSold"
              type="number"
              value={formData?.totalSold ?? 0}
              variant="outlined"
              size="small"
              sx={{ bgcolor: "#f9f9f9" }}
              InputProps={{ readOnly: true && isReadOnly }}
            />

            <FormControl fullWidth size="small" sx={{ bgcolor: "#fff" }}>
              <InputLabel id="product-status-label">Trạng thái</InputLabel>

              <Select
                labelId="product-status-label"
                id="productStatus"
                name="productStatus"
                value={formData.productStatus?.toString() ?? ""}
                label="Trạng thái"
                onChange={handleSelectChange}
                disabled={isReadOnly}
              >
                {productStatusOptions.map((status) => (
                  <MenuItem key={status.value} value={status.value.toString()}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Xuất xứ"
              name="origin"
              value={formData.origin ?? ""}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ bgcolor: "#fff" }}
              InputProps={{ readOnly: isReadOnly }}
            />
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Thương hiệu</InputLabel>
              <Select
                label="Thương hiệu"
                name="brandId"
                value={(formData.brandId ?? "").toString()}
                onChange={handleSelectChange}
                sx={{ bgcolor: "#fff" }}
                disabled={isReadOnly}
              >
                <MenuItem value="">
                  <em>Chọn thương hiệu</em>
                </MenuItem>
                {brands?.map((brand: Brand) => (
                  <MenuItem key={brand.id} value={brand.id ?? ""}>
                    {brand.name ?? ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {isReadOnly && (
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextField
                label="Ngày cập nhật"
                name="updateAt"
                type="string"
                value={formatVietnamTime(
                  formData?.updatedAt ?? formData?.createdAt ?? ""
                )}
                variant="outlined"
                size="small"
                sx={{ bgcolor: "#fff" }}
                InputProps={{ readOnly: isReadOnly }}
              />

              <TextField
                label="Người cập nhật"
                name="updateBy"
                type="string"
                value={formData.updaterName ?? formData.creatorName ?? ""}
                variant="outlined"
                size="small"
                sx={{ bgcolor: "#fff" }}
                InputProps={{ readOnly: isReadOnly }}
              />
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Mô tả sản phẩm"
              name="description"
              value={formData.description ?? ""}
              onClick={() => setOpenEditor(true)}
              fullWidth
              multiline
              rows={5}
              variant="outlined"
              sx={{ bgcolor: "#fff", height: "100%", cursor: "pointer" }}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Ghi chú"
              name="note"
              value={formData.note}
              onChange={handleChange}
              fullWidth
              multiline
              rows={5}
              variant="outlined"
              sx={{ bgcolor: "#fff", height: "100%" }}
              InputProps={{ readOnly: isReadOnly }}
            />
          </Box>
          <CKEditorDialog
            open={openEditor}
            onClose={() => setOpenEditor(false)}
            initialData={formData.description ?? ""}
            onSave={(html) => {
              setFormData((prev) => ({ ...prev, description: html }));
              setOpenEditor(false);
            }}

            readOnly={mode === "view"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductFormSection;

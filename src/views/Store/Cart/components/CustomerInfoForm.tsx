import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Stack,
  Grid,
  InputLabel,
  FormControl,
  Select,
  CircularProgress,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { PaymentMethod } from "src/Interfaces/IOrder";
import {
  District,
  fetchDistricts,
  fetchProvinces,
  fetchWards,
  Province,
  Ward,
} from "src/services/api/ProvinceAPI";

interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  note: string;
}

type Props = {
  value: CustomerInfo;
  onChange: (value: Props["value"]) => void;
  paymentMethod: PaymentMethod;
  submitAttempted?: boolean;
  onAddressPartsChange?: (v: {
    province?: Province | null;
    district?: District | null;
    ward?: Ward | null;
  }) => void;
};

const CustomerInfoForm = ({
  value,
  onChange,
  submitAttempted,
  onAddressPartsChange,
}: Props) => {
  const handleChange =
    (field: keyof Props["value"]) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...value, [field]: e.target.value });
    };

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [province, setProvince] = useState<Province | null>(null);
  const [district, setDistrict] = useState<District | null>(null);
  const [ward, setWard] = useState<Ward | null>(null);

  const [loadingP, setLoadingP] = useState(false);
  const [loadingD, setLoadingD] = useState(false);
  const [loadingW, setLoadingW] = useState(false);

  const sortByVi = (
    a: { ProvinceName?: string; DistrictName?: string; WardName?: string },
    b: { ProvinceName?: string; DistrictName?: string; WardName?: string }
  ) =>
    (a.ProvinceName ?? a.DistrictName ?? a.WardName ?? "").localeCompare(
      b.ProvinceName ?? b.DistrictName ?? b.WardName ?? "",
      "vi",
      { sensitivity: "base" }
    );

  useEffect(() => {
    setLoadingP(true);
    fetchProvinces()
      .then((data) => setProvinces([...data].sort(sortByVi))) // <-- SORT HERE
      .finally(() => setLoadingP(false));
  }, []);

  // DISTRICTS when province changes
  useEffect(() => {
    if (!province) {
      setDistrict(null);
      setWard(null);
      setDistricts([]);
      setWards([]);
      return;
    }
    setLoadingD(true);
    fetchDistricts(province.ProvinceID)
      .then((ds) => {
        setDistricts([...(ds || [])].sort(sortByVi)); // <-- SORT HERE
        setDistrict(null);
        setWard(null);
        setWards([]);
      })
      .finally(() => setLoadingD(false));
  }, [province]);

  // WARDS when district changes
  useEffect(() => {
    if (!district) {
      setWard(null);
      setWards([]);
      return;
    }
    setLoadingW(true);
    fetchWards(district.DistrictID)
      .then((ws) => {
        setWards([...(ws || [])].sort(sortByVi)); // <-- SORT HERE
        setWard(null);
      })
      .finally(() => setLoadingW(false));
  }, [district]);

  // Build full address text
  useEffect(() => {
    const addr = [
      ward?.WardName?.trim(),
      district?.DistrictName?.trim(),
      province?.ProvinceName?.trim(),
    ]
      .filter(Boolean)
      .join(", ");

    onChange({ ...value, address: addr });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province, district, ward]);

  useEffect(() => {
    onAddressPartsChange?.({
      province,
      district,
      ward,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province, district, ward]);

  return (
    <Box mt={2} padding={1}>
      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        Địa chỉ nhận hàng
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Họ và tên"
          fullWidth
          required
          value={value.fullName}
          onChange={handleChange("fullName")}
        />
        <TextField
          label="Số điện thoại"
          fullWidth
          required
          type="tel"
          value={value.phone}
          onChange={handleChange("phone")}
        />

        <Grid container sx={{ gap: 1 }}>
          {/* Province */}
          <Grid item xs={10} md={3}>
            <FormControl
              fullWidth
              required
              error={Boolean(submitAttempted && !province)}
              // disabled={!province || loadingD}
            >
              <InputLabel>Tỉnh/Thành</InputLabel>
              <Select
                required
                label="Tỉnh/Thành"
                value={province?.ProvinceID ?? ""}
                onChange={(e) => {
                  const p = provinces.find(
                    (x) => x.ProvinceID === Number(e.target.value)
                  );
                  setProvince(p || null);
                }}
                endAdornment={loadingP ? <CircularProgress size={18} /> : null}
              >
                {provinces.map((p) => (
                  <MenuItem key={p.ProvinceID} value={p.ProvinceID}>
                    {p.ProvinceName}
                  </MenuItem>
                ))}
              </Select>
              {submitAttempted && !province && (
                <FormHelperText>Vui lòng chọn Tỉnh/Thành</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* District */}
          <Grid item xs={10} md={4}>
            <FormControl
              fullWidth
              required
              error={Boolean(submitAttempted && !district)}
              disabled={!province || loadingD}
            >
              <InputLabel>Quận/Huyện</InputLabel>
              <Select
                label="Quận/Huyện"
                value={district?.DistrictID ?? ""}
                onChange={(e) => {
                  const d = districts.find(
                    (x) => x.DistrictID === Number(e.target.value)
                  );
                  setDistrict(d || null);
                }}
                endAdornment={loadingD ? <CircularProgress size={18} /> : null}
              >
                {districts.map((d) => (
                  <MenuItem key={d.DistrictID} value={d.DistrictID}>
                    {d.DistrictName}
                  </MenuItem>
                ))}
              </Select>
              {submitAttempted && !district && (
                <FormHelperText>Vui lòng chọn Quận/Huyện</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Ward */}
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              required
              error={Boolean(submitAttempted && !ward)}
              disabled={!district || loadingW}
            >
              <InputLabel>Phường/Xã</InputLabel>
              <Select
                label="Phường/Xã"
                value={ward?.WardCode ?? ""}
                onChange={(e) => {
                  const w = wards.find((x) => x.WardCode === e.target.value);
                  setWard(w || null);
                }}
                endAdornment={loadingW ? <CircularProgress size={18} /> : null}
              >
                {wards.map((w) => (
                  <MenuItem key={w.WardCode} value={w.WardCode}>
                    {w.WardName}
                  </MenuItem>
                ))}
              </Select>
              {submitAttempted && !ward && (
                <FormHelperText>Vui lòng chọn Phường/Xã</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <TextField
          label="Địa chỉ chi tiết"
          fullWidth
          required
          multiline
          rows={1}
          value={value.address}
          onChange={handleChange("address")}
          placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
        />

        <TextField
          label="Ghi chú đơn hàng (tuỳ chọn)"
          fullWidth
          multiline
          rows={2}
          value={value.note}
          onChange={handleChange("note")}
        />
      </Stack>
    </Box>
  );
};

export default CustomerInfoForm;

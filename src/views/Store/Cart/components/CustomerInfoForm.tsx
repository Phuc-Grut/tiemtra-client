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

  const [province, setProvince] = useState<Province | undefined>(undefined);
  const [district, setDistrict] = useState<District | undefined>(undefined);
  const [ward, setWard] = useState<Ward | undefined>(undefined);

  const [loadingP, setLoadingP] = useState(false);
  const [loadingD, setLoadingD] = useState(false);
  const [loadingW, setLoadingW] = useState(false);

  useEffect(() => {
    setLoadingP(true);
    fetchProvinces()
      .then(setProvinces)
      .finally(() => setLoadingP(false));
  }, []);

  useEffect(() => {
    if (!province) {
      setDistrict(undefined);
      setWard(undefined);
      setDistricts([]);
      setWards([]);
      return;
    }
    setLoadingD(true);
    fetchDistricts(province.code)
      .then(setDistricts)
      .finally(() => setLoadingD(false));
  }, [province]);

  useEffect(() => {
    if (!district) {
      setWard(undefined);
      setWards([]);
      return;
    }
    setLoadingW(true);
    fetchWards(district.code)
      .then(setWards)
      .finally(() => setLoadingW(false));
  }, [district]);

  useEffect(() => {
    const addr = [
      ward?.name?.trim(),
      district?.name?.trim(),
      province?.name?.trim(),
    ]
      .filter(Boolean)
      .join(", ");

    onChange({ ...value, address: addr });
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
              disabled={!province || loadingD}
            >
              <InputLabel>Tỉnh/Thành</InputLabel>
              <Select
                required
                label="Tỉnh/Thành"
                value={province?.code ?? ""}
                onChange={(e) => {
                  const p = provinces.find(
                    (x) => x.code === Number(e.target.value)
                  );
                  setProvince(p);
                }}
                endAdornment={loadingP ? <CircularProgress size={18} /> : null}
              >
                {provinces.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
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
                value={district?.code ?? ""}
                onChange={(e) => {
                  const d = districts.find(
                    (x) => x.code === Number(e.target.value)
                  );
                  setDistrict(d);
                }}
                endAdornment={loadingD ? <CircularProgress size={18} /> : null}
              >
                {districts.map((d) => (
                  <MenuItem key={d.code} value={d.code}>
                    {d.name}
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
                value={ward?.code ?? ""}
                onChange={(e) => {
                  const w = wards.find(
                    (x) => x.code === Number(e.target.value)
                  );
                  setWard(w);
                }}
                endAdornment={loadingW ? <CircularProgress size={18} /> : null}
              >
                {wards.map((w) => (
                  <MenuItem key={w.code} value={w.code}>
                    {w.name}
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

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Avatar,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import profileApi, { ProfileDto } from "src/services/api/Profile";
import useToast from "src/components/Toast";

type ProfileForm = {
  fullName: string;
  phoneNumber?: string;
  email: string;
  address?: string;
  avatar?: string; // URL ảnh sau khi upload / hoặc nhập tay
};

const MAX_FILE_SIZE = 500 * 1024; // 500KB

const ProfileTab: React.FC = () => {
  const { showSuccess, showError } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProfileForm>({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      avatar: "",
    },
  });

  // Lấy profile hiện tại
  const {
    data: profile,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<ProfileDto>({
    queryKey: ["profile", "me"],
    queryFn: async () => {
      const res = await profileApi.getById();
      return res.data;
    },
  });

  // Đổ dữ liệu vào form khi có profile
  useEffect(() => {
    if (!profile) return;
    reset({
      fullName: profile.fullName ?? "",
      phoneNumber: profile.phoneNumber ?? "",
      email: profile.email ?? "",
      address: profile.address ?? "",
      // tên field avatar của API bạn có thể là avatar/urlAvatar — tuỳ backend:
      avatar: (profile as any).avatar ?? (profile as any).urlAvatar ?? "",
    });
  }, [profile, reset]);

  // Preview ưu tiên từ form.avatar
  const avatarUrl = watch("avatar");
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    setPreviewUrl(avatarUrl || undefined);
  }, [avatarUrl]);

  // Upload ảnh → nhận fileUrl → set vào form.avatar
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      showError("Vui lòng chọn ảnh dưới 500 KB.");
      return;
    }

    try {
      const res = await profileApi.uploadImage(file); // giả sử trả { fileUrl: string }
      const fileUrl = res.data.fileUrl;
      setValue("avatar", fileUrl, { shouldDirty: true });
      setPreviewUrl(fileUrl);
      showSuccess("Upload ảnh thành công");
    } catch {
      showError("Upload ảnh thất bại");
    }
  };

  const clearAvatar = () => {
    setValue("avatar", "", { shouldDirty: true });
    setPreviewUrl(undefined);
  };

  const onSubmit = async (data: ProfileForm) => {
    try {
      await profileApi.update({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        avatar: data.avatar || "",
      });
      showSuccess("Cập nhật thông tin thành công");
      refetch();
    } catch (err) {
      showError("Cập nhật thất bại");
    }
  };

  const disabled = isSubmitting || isLoading || isFetching;

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
        <PersonOutlineIcon color="action" />
        <Typography variant="subtitle1" fontWeight={700}>
          Chi tiết tài khoản
        </Typography>
      </Stack>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* AVATAR */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ mt: 1, mb: 2 }}
        >
          <Avatar
            src={previewUrl}
            alt={avatarUrl}
            sx={{ width: 80, height: 80 }}
          />
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" component="label" disabled={disabled}>
              Chọn ảnh
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            <Button
              variant="text"
              onClick={clearAvatar}
              disabled={disabled || !previewUrl}
            >
              Xoá
            </Button>
          </Stack>
        </Stack>

        <TextField
          label="Họ và tên"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register("fullName", { required: "Vui lòng nhập họ tên" })}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Số điện thoại"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register("phoneNumber", {
            pattern: {
              value: /^(0|\+84)\d{9,10}$/,
              message: "Số điện thoại không hợp lệ",
            },
          })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          disabled
          variant="outlined"
          {...register("email")}
          helperText="Email không thể thay đổi"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Địa chỉ"
          fullWidth
          margin="normal"
          multiline
          minRows={2}
          variant="outlined"
          {...register("address")}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
        />

        <Stack direction="row" gap={1} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" disabled={disabled}>
            {disabled ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => refetch()}
            disabled={disabled}
          >
            Tải lại
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProfileTab;

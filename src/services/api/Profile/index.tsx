import { AxiosResponse } from "axios";
import requester from "src/services/extended/axiosInstance";
import { PROFILE } from "src/domain/constants";

export type ProfileDto = {
  userId: string;
  userCode: string;
  email: string;
  fullName: string;
  phoneNumber?: string | null;
  age?: number | null;
  address?: string | null;
  avatar?: string | null;
};

export type UpdateProfileRequest = {
  fullName?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  avatar?: string | null;
};

// ===== API object =====
const profileApi = {
  getById: (): Promise<AxiosResponse<ProfileDto>> =>
    requester.get(PROFILE.URL_API.GET_BY_ID),

  update: (
    payload: UpdateProfileRequest
  ): Promise<AxiosResponse<{ success: boolean }>> =>
    requester.put(PROFILE.URL_API.EDIT_PROFILE, payload),

  uploadImage: (file: File): Promise<AxiosResponse<{ fileUrl: string }>> => {
    const formData = new FormData();
    formData.append("file", file);

    return requester.post(PROFILE.URL_API.ADD_AVATAR, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default profileApi;

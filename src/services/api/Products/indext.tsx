import { AxiosResponse } from "axios";
import { PRODUCT } from "src/domain/constants";
import { CreateProductRequest } from "src/Interfaces/IProduct";
import requester from "src/services/extended/axiosInstance";

const productApi = {
  generateProductCode: (): Promise<AxiosResponse<string>> =>
    requester.get(PRODUCT.URL_API.GENERATE_PRODUCT_CODE),

  uploadImage: (file: File): Promise<AxiosResponse<{ fileUrl: string }>> => {
    const formData = new FormData();
    formData.append("file", file);

    return requester.post(PRODUCT.URL_API.UP_PRODUCT_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  createProduct: (data: CreateProductRequest): Promise<AxiosResponse<any>> =>
    requester.post(PRODUCT.URL_API.CREATE_PRODUCT, data),
};

export default productApi;

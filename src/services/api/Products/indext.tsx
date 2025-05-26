import { AxiosResponse } from "axios";
import { PRODUCT } from "src/domain/constants";
import { CreateProductRequest, IProductFilter } from "src/Interfaces/IProduct";
import requester from "src/services/extended/axiosInstance";

interface ProductRequest {
  productId?: string
}

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

  getPagingProduct: (params : IProductFilter) => requester.get(PRODUCT.URL_API.GET_ALL_PRODUCT, {params} ),

  getByIdApi : (params : ProductRequest) => requester.get(PRODUCT.URL_API.GET_BY_ID, {params})
  
};

export default productApi;

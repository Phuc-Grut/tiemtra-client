import { AxiosResponse } from "axios";
import { ADMIN_PRODUCT, STORE_PPRODUCT } from "src/domain/constants";
import { CreateProductRequest, IProductFilter } from "src/Interfaces/IProduct";
import requester from "src/services/extended/axiosInstance";

interface ProductRequest {
  productId?: string
}

const productApi = {
  generateProductCode: (): Promise<AxiosResponse<string>> =>
    requester.get(ADMIN_PRODUCT.URL_API.GENERATE_PRODUCT_CODE),

  uploadImage: (file: File): Promise<AxiosResponse<{ fileUrl: string }>> => {
    const formData = new FormData();
    formData.append("file", file);

    return requester.post(ADMIN_PRODUCT.URL_API.UP_PRODUCT_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  createProduct: (data: CreateProductRequest): Promise<AxiosResponse<any>> =>
    requester.post(ADMIN_PRODUCT.URL_API.CREATE_PRODUCT, data),

  getPagingProduct: (params : IProductFilter) => requester.get(ADMIN_PRODUCT.URL_API.GET_ALL_PRODUCT, {params} ),

  getByIdApi : (params : ProductRequest) => requester.get(ADMIN_PRODUCT.URL_API.GET_BY_ID, {params}),

  updateProduct: (id: string, data: CreateProductRequest): Promise<AxiosResponse<any>> =>
    requester.put(ADMIN_PRODUCT.URL_API.UPDATE_PRODUCT(id), data),


  // Stroe 

  storeGetAllProduct: (params : IProductFilter) => requester.get(STORE_PPRODUCT.URL_API.GET_ALL_PRODUCT, {params}),

  storeGetProductByCode: (productCode: string) => requester.get(STORE_PPRODUCT.URL_API.GET_PRODUCT_BY_CODE(productCode))

};

export default productApi;

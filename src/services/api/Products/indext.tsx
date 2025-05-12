import { AxiosResponse } from "axios"
import { PRODUCT } from "src/domain/constants"
import requester from "src/services/extended/axiosInstance"

const productApi = {
    generateProductCode: (): Promise<AxiosResponse<string>> => requester.get(PRODUCT.URL_API.GENERATE_PRODUCT_CODE)  
}

export default productApi
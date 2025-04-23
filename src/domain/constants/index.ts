// // export const BASE_URL = "https://localhost:7021/api"
// export const BASE_URL = "http://localhost:5001";
// // export const BASE_URL = "https://tiemtraapi-eggechbzfqaqc3cf.southeastasia-01.azurewebsites.net/api"
export const BASE_URL = "https://localhost:7021/api"

const URL_ADMIN = `${BASE_URL}/admin`

export const AUTHENTICATION = {
    ACTION_TYPES: {
        LOGIN: 'AUTHENTICATION/LOGIN',
        REGISTER: 'AUTHENTICATION/REGISTER',
        VERIFY_OTP: 'AUTHENTICATION/VERIFY_OTP',
        RESEND_OTP: 'AUTHENTICATION/RESEND_OTP',
        REFRESH_TOKEN: 'AUTHENTICATION/REFRESH_TOKEN',
    },
    URL_API: {
        LOGIN_API:  `${BASE_URL}/auth/login`,
        REGISTER_API:  `${BASE_URL}/auth/register`,
        VERIFY_OTP:  `${BASE_URL}/auth/verify-otp`,
        RESEND_OTP:  `${BASE_URL}/auth/resend-otp`,
        REFRESH_TOKEN_API:  `${BASE_URL}/auth/refresh-token`,
    }
}

export const CATEGORY = {
    ACTION_TYPES: {
        GET_ALL: 'CATEGORY/GET_ALL',
        GET_BY_ID: 'CATEGORY/GET_BY_ID_API',
        CREATE: 'CATEGORY/CREATE',
        UPDATE: 'CATEGORY/UPDATE',
        CHECK_DELETE_BY_IDS: 'CATEGORY/CHECK_DELETE_MANY',
        DELETE_API_BY_IDS: 'CATEGORY/DELETE_API_BY_IDS',
        ATTRIBUTE_BY_ID: 'CATEGORY/ATTRIBUTE_BY_ID',
        SET_ATTRIBUTES_API: 'CATEGORY/SET_ATTRIBUTES_API'
    },
    URL_API: {
        GET_ALL_API:  `${URL_ADMIN}/category/get-paging-categories`,
        GET_BY_ID_API:  `${URL_ADMIN}/category/get-by-id`,
        CREATE_API:  `${URL_ADMIN}/category/add-category`,
        UPDATE_API: (id: number) => `${URL_ADMIN}/category/update-category/${id}`,
        CHECK_DELETE_BY_IDS: `${URL_ADMIN}/category/check-delete-by-ids`,
        DELETE_API_BY_IDS: `${URL_ADMIN}/category/delete-category-by-ids`,
        ATTRIBUTE_BY_ID: (id: number) => `${URL_ADMIN}/category/${id}/select-attributes`,
        SET_ATTRIBUTES_API: `${URL_ADMIN}/category/set-attributes`
    }
}

export const ATTRIBUTE = {
    ACTION_TYPES: {
        GET_ALL: 'ATTRIBUTE/GET_ALL_API',
        CREATE: 'ATTRIBUTE/CREATE_API',
        UPDATE: 'ATTRIBUTE/UPDATE_API',
        DELETE: 'ATTRIBUTE/DELETE_API'
    },
    URL_API: {
        GET_ALL_API: `${URL_ADMIN}/attributes/get-paging-attributes`,
        CREATE_API: `${URL_ADMIN}/attributes/add-attributes`,
        UPDATE_API: (id: number) => `${URL_ADMIN}/attributes/update-attributes/${id}`,
        DELETE_API: `${URL_ADMIN}/attribute/delete-attributes`,
    }
}
export const BASE_URL = "https://localhost:7021/api"


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
        DELETE_API_BY_IDS: 'CATEGORY/DELETE_API_BY_IDS'
    },
    URL_API: {
        GET_ALL_API:  `${BASE_URL}/category/get-paging-category`,
        GET_BY_ID_API:  `${BASE_URL}/category/get-by-id`,
        CREATE_API:  `${BASE_URL}/category/add-category`,
        UPDATE_API: (id: number) => `${BASE_URL}/category/update-category/${id}`,
        CHECK_DELETE_BY_IDS: `${BASE_URL}/category/check-delete-by-ids`,
        DELETE_API_BY_IDS: `${BASE_URL}/category/delete-category-by-ids`
    }
}
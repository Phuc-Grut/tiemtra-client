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
        CREATE: 'CATEGORY/CREATE',
        UPDATE: 'CATEGORY/UPDATE',
        DELETE: 'CATEGORY/DELETE',
    },
    URL_API: {
        GET_ALL_API:  `${BASE_URL}/category/get-paging-category`,
        CREATE_API:  `${BASE_URL}/category`,
        UPDATE_API:  `${BASE_URL}/category`,
        DELETE_API:  `${BASE_URL}/category`,
    }
}
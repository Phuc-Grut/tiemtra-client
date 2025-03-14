export const BASE_URL = "https://localhost:7021/api"


export const AUTHENTICATION = {
    ACTION_TYPES: {
        LOGIN: 'AUTHENTICATION/LOGIN',
        REGISTER: 'AUTHENTICATION/REGISTER',
        VERIFY_OTP: 'AUTHENTICATION/VERIFY_OTP',
        RESEND_OTP: 'AUTHENTICATION/RESEND_OTP',
    },
    URL_API: {
        LOGIN_API:  `${BASE_URL}/auth/login`,
        REGISTER_API:  `${BASE_URL}/auth/register`,
        VERIFY_OTP:  `${BASE_URL}/auth/verify-otp`,
        RESEND_OTP:  `${BASE_URL}/auth/resend-otp`,
    }
}
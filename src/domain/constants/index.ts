export const BASE_URL = process.env.REACT_APP_API_URL;

const URL_ADMIN = `${BASE_URL}/api/admin`
const URL_AUTH = `${BASE_URL}/api`
const URL_STORE = `${BASE_URL}/api/store`

export const AUTHENTICATION = {
    ACTION_TYPES: {
        LOGIN: 'AUTHENTICATION/LOGIN',
        REGISTER: 'AUTHENTICATION/REGISTER',
        VERIFY_OTP: 'AUTHENTICATION/VERIFY_OTP',
        RESEND_OTP: 'AUTHENTICATION/RESEND_OTP',
        REFRESH_TOKEN: 'AUTHENTICATION/REFRESH_TOKEN',
    },
    URL_API: {
        LOGIN_API:  `${URL_AUTH}/auth/login`,
        REGISTER_API:  `${URL_AUTH}/auth/register`,
        VERIFY_OTP:  `${URL_AUTH}/auth/verify-otp`,
        RESEND_OTP:  `${URL_AUTH}/auth/resend-otp`,
        REFRESH_TOKEN_API:  `${URL_AUTH}/auth/refresh-token`,

        FORGOT_PASSWORD_API: `${URL_AUTH}/auth/forgot-password`,
        RESET_PASSWORD_API: `${URL_AUTH}/auth/reset-password`,
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
        SET_ATTRIBUTES_API: `${URL_ADMIN}/category/set-attributes`,
        GET_LEAF_CATEGORY : `${URL_ADMIN}/category/get-leaf-categories`
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
        DELETE_API: `${URL_ADMIN}/attributes/delete-by-ids`,
    }
}

export const ADMIN_PRODUCT = {
    URL_API: {
        GENERATE_PRODUCT_CODE: `${URL_ADMIN}/product/generate-product-code`,
        CREATE_PRODUCT: `${URL_ADMIN}/product/create-product`,
        UPDATE_PRODUCT: (id: string) => `${URL_ADMIN}/product/update-product/${id}`,
        UP_PRODUCT_IMAGE: `${URL_ADMIN}/product/add-product-image`,
        GET_ALL_PRODUCT: `${URL_ADMIN}/product/get-paging-products`,
        GET_BY_ID: `${URL_ADMIN}/product/get-by-id`
    }
}

export const STORE_PPRODUCT = {
    URL_API: {
        GET_ALL_PRODUCT: `${URL_STORE}/product/get-paging-products`,
        GET_PRODUCT_BY_CODE: (productCode: string) => `${URL_STORE}/product/get-product-by-code/${productCode}`
    }
}

export const STORE_CART = {
    URL_API: {
        VIEW_CART: `${URL_STORE}/cart/view-cart`,
        ADD_PRODUCT_TO_CART: `${URL_STORE}/cart/add-product-to-cart`,
        UPDATE_QUANTITY: `${URL_STORE}/cart/update-cart-item-quantity`,
        REMOVE_CART_ITEM: `${URL_STORE}/cart/remove-cart-item`,

        GET_TOTAL_QUANTITY: `${URL_STORE}/cart/get-total-quantity`,
    }
}

export const ADMIN_ORDER = {
    URL_API: {
        GET_PAGING: `${URL_ADMIN}/order/get-paging-orders`,
        COMFIRM_ORDER: (orderId: string) => `${URL_ADMIN}/order/confirm-order/${orderId}`,

        CHANGE_ORDER_STATUS: (orderId: string) => `${URL_ADMIN}/order/change-order-status/${orderId}`,
        GET_BY_ID: (orderId: string) => `${URL_ADMIN}/order/get-by-id/${orderId}`,
    }
}

export const ADMIN_CUSTOMER = {
    URL_API: {
        GET_PAGING: `${URL_ADMIN}/customer/get-paging-customer`,
        
    }
}

export const STORE_ORDER = {
    URL_API: {
        CREATE_ORDER: `${URL_STORE}/order/create-order`,
        GENERATE_ORDER_CODE: `${URL_STORE}/order/generate-order-code`,
    }
}

export const STORE_CATEGORY = {
    URL_API: {
        GET_ALL: `${URL_STORE}/category/tree`
    }
}
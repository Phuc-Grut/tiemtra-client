import***REMOVED***axios***REMOVED***from***REMOVED***"axios"
import***REMOVED***authApi***REMOVED***from***REMOVED***"src/services/api/Authentication"
const***REMOVED***API_URL***REMOVED***=***REMOVED***"https://localhost:7021/api"

export***REMOVED***const***REMOVED***getToken***REMOVED***=***REMOVED***():***REMOVED***string***REMOVED***|***REMOVED***null***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***let***REMOVED***accessToken***REMOVED***=***REMOVED***localStorage.getItem("access_token");
***REMOVED******REMOVED***
***REMOVED******REMOVED***if***REMOVED***(!accessToken)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***userData***REMOVED***=***REMOVED***localStorage.getItem("userData");
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***accessToken***REMOVED***=***REMOVED***userData***REMOVED***?***REMOVED***JSON.parse(userData)?.id_token***REMOVED***:***REMOVED***null;
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error("Lỗi***REMOVED***khi***REMOVED***parse***REMOVED***userData:",***REMOVED***error);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***accessToken***REMOVED***=***REMOVED***null;
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***}

***REMOVED******REMOVED***return***REMOVED***accessToken;
};

//***REMOVED***✅***REMOVED***Hàm***REMOVED***lấy***REMOVED***Refresh***REMOVED***Token
export***REMOVED***const***REMOVED***getRefreshToken***REMOVED***=***REMOVED***():***REMOVED***string***REMOVED***|***REMOVED***null***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***localStorage.getItem("refresh_token");
}

//***REMOVED***✅***REMOVED***Hàm***REMOVED***lưu***REMOVED***token***REMOVED***mới
export***REMOVED***const***REMOVED***setTokens***REMOVED***=***REMOVED***(accessToken:***REMOVED***string,***REMOVED***refreshToken:***REMOVED***string)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***localStorage.setItem("access_token",***REMOVED***accessToken);
***REMOVED******REMOVED***localStorage.setItem("refresh_token",***REMOVED***refreshToken);
};

//***REMOVED***✅***REMOVED***Tạo***REMOVED***Axios***REMOVED***instance
const***REMOVED***requester***REMOVED***=***REMOVED***axios.create({
***REMOVED******REMOVED***baseURL:***REMOVED***API_URL,
***REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***"Content-Type":***REMOVED***"application/json"***REMOVED***}
});

//***REMOVED***✅***REMOVED***Interceptor***REMOVED***để***REMOVED***tự***REMOVED***động***REMOVED***gửi***REMOVED***Access***REMOVED***Token***REMOVED***với***REMOVED***mọi***REMOVED***request
requester.interceptors.request.use(
***REMOVED******REMOVED***(config)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***token***REMOVED***=***REMOVED***getToken();
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(token)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***config.headers.Authorization***REMOVED***=***REMOVED***`Bearer***REMOVED***${token}`;
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***config;
***REMOVED******REMOVED***},
***REMOVED******REMOVED***(error)***REMOVED***=>***REMOVED***Promise.reject(error)
)

//***REMOVED******REMOVED***Interceptor***REMOVED***để***REMOVED***tự***REMOVED***động***REMOVED***Refresh***REMOVED***Token***REMOVED***nếu***REMOVED***Access***REMOVED***Token***REMOVED***hết***REMOVED***hạn
requester.interceptors.response.use(
***REMOVED******REMOVED***(response)***REMOVED***=>***REMOVED***response,***REMOVED***//***REMOVED***✅***REMOVED***Nếu***REMOVED***response***REMOVED***thành***REMOVED***công,***REMOVED***trả***REMOVED***về***REMOVED***bình***REMOVED***thường
***REMOVED******REMOVED***async***REMOVED***(error)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***originalRequest***REMOVED***=***REMOVED***error.config;

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Nếu***REMOVED***lỗi***REMOVED***401***REMOVED***(Unauthorized)***REMOVED***và***REMOVED***chưa***REMOVED***thử***REMOVED***refresh***REMOVED***token,***REMOVED***thì***REMOVED***thử***REMOVED***làm***REMOVED***mới***REMOVED***token
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error.response.status***REMOVED***===***REMOVED***401***REMOVED***&&***REMOVED***!originalRequest._retry)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***originalRequest._retry***REMOVED***=***REMOVED***true;

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***refreshToken***REMOVED***=***REMOVED***getRefreshToken();
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!refreshToken)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error("Không***REMOVED***tìm***REMOVED***thấy***REMOVED***Refresh***REMOVED***Token");
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED******REMOVED***Gọi***REMOVED***API***REMOVED***refresh***REMOVED***token
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***response***REMOVED***=***REMOVED***await***REMOVED***authApi.refreshToken({***REMOVED***refreshToken***REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED******REMOVED***Lưu***REMOVED***token***REMOVED***mới***REMOVED***vào***REMOVED***localStorage
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setTokens(response.data.token,***REMOVED***response.data.refreshToken);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***✅Gán***REMOVED***token***REMOVED***mới***REMOVED***vào***REMOVED***headers***REMOVED***của***REMOVED***request***REMOVED***cũ***REMOVED***và***REMOVED***gửi***REMOVED***lại
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***originalRequest.headers.Authorization***REMOVED***=***REMOVED***`Bearer***REMOVED***${response.data.token}`;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***axios(originalRequest);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(refreshError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error("Refresh***REMOVED***token***REMOVED***thất***REMOVED***bại:",***REMOVED***refreshError);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***localStorage.removeItem("access_token");
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***localStorage.removeItem("refresh_token");
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***window.location.href***REMOVED***=***REMOVED***"/login";***REMOVED***//***REMOVED***Chuyển***REMOVED***hướng***REMOVED***đến***REMOVED***trang***REMOVED***đăng***REMOVED***nhập
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***Promise.reject(error);
***REMOVED******REMOVED***}
);

export***REMOVED***default***REMOVED***requester;

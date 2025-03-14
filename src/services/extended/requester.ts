import***REMOVED***axios,***REMOVED***{***REMOVED***AxiosInstance,***REMOVED***AxiosResponse***REMOVED***}***REMOVED***from***REMOVED***"axios"
import***REMOVED***qs***REMOVED***from***REMOVED***"qs"
import***REMOVED***{***REMOVED***getToken***REMOVED***}***REMOVED***from***REMOVED***"./axiosInstance"

const***REMOVED***responseBody***REMOVED***=***REMOVED***(response:***REMOVED***AxiosResponse)***REMOVED***=>***REMOVED***response.data;

const***REMOVED***axiosInstance:***REMOVED***AxiosInstance***REMOVED***=***REMOVED***axios.create({
***REMOVED******REMOVED***baseURL:***REMOVED***"https://localhost:7021/api",
***REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***"Content-Type":***REMOVED***"application/json"***REMOVED***},
***REMOVED******REMOVED***withCredentials:***REMOVED***true,
***REMOVED******REMOVED***paramsSerializer:***REMOVED***(params)***REMOVED***=>***REMOVED***qs.stringify(params,***REMOVED***{***REMOVED***indices:***REMOVED***false***REMOVED***})
})

axiosInstance.interceptors.request.use(
***REMOVED******REMOVED***(config)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***token***REMOVED***=***REMOVED***getToken()
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(token)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***config.headers.Authorization***REMOVED***=***REMOVED***`Bearer***REMOVED***${token}`
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***config;
***REMOVED******REMOVED***},
***REMOVED******REMOVED***(error)***REMOVED***=>***REMOVED***Promise.reject(error)
)

export***REMOVED***const***REMOVED***requester***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***get:***REMOVED***(url:***REMOVED***string,***REMOVED***params***REMOVED***=***REMOVED***{},***REMOVED***config***REMOVED***=***REMOVED***{})***REMOVED***=>***REMOVED***axiosInstance.get(url,***REMOVED***{***REMOVED***params,***REMOVED***...config***REMOVED***}).then(responseBody),

***REMOVED******REMOVED***post:***REMOVED***(url:***REMOVED***string,***REMOVED***data***REMOVED***=***REMOVED***{},***REMOVED***config***REMOVED***=***REMOVED***{})***REMOVED***=>***REMOVED***axiosInstance.post(url,***REMOVED***data,***REMOVED***config).then(responseBody),

***REMOVED******REMOVED***put:***REMOVED***(url:***REMOVED***string,***REMOVED***data***REMOVED***=***REMOVED***{},***REMOVED***config***REMOVED***=***REMOVED***{})***REMOVED***=>***REMOVED***axiosInstance.put(url,***REMOVED***data,***REMOVED***config).then(responseBody),

***REMOVED******REMOVED***delete:***REMOVED***(url:***REMOVED***string,***REMOVED***params***REMOVED***=***REMOVED***{},***REMOVED***config***REMOVED***=***REMOVED***{})***REMOVED***=>***REMOVED***axiosInstance.delete(url,***REMOVED***{***REMOVED***params,***REMOVED***...config***REMOVED***}).then(responseBody),

//***REMOVED******REMOVED******REMOVED***postForm:***REMOVED***(url:***REMOVED***string,***REMOVED***data***REMOVED***=***REMOVED***{},***REMOVED***config***REMOVED***=***REMOVED***{})***REMOVED***=>
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***axiosInstance.postForm(url,***REMOVED***data,***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***"Content-Type":***REMOVED***"multipart/form-data"***REMOVED***},
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...config
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}).then(responseBody)
}

export***REMOVED***default***REMOVED***requester

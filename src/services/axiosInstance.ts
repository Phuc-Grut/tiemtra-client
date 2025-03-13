import***REMOVED***axios***REMOVED***from***REMOVED***"axios"

const***REMOVED***API_URL***REMOVED***=***REMOVED***"https://localhost:7021/api"

const***REMOVED***api***REMOVED***=***REMOVED***axios.create({
***REMOVED******REMOVED***baseURL:***REMOVED***API_URL,
***REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***"Content-Type":***REMOVED***"application/json"***REMOVED***},
})

api.interceptors.request.use(
***REMOVED******REMOVED***(config)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***token***REMOVED***=***REMOVED***localStorage.getItem("jwtToken")
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(token)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***config.headers.Authorization***REMOVED***=***REMOVED***`Bearer***REMOVED***${token}`
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***config
***REMOVED******REMOVED***},
***REMOVED******REMOVED***(error)***REMOVED***=>***REMOVED***Promise.reject(error)
)

export***REMOVED***default***REMOVED***api

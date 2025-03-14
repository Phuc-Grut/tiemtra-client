import***REMOVED***axios***REMOVED***from***REMOVED***"axios"

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
}

const***REMOVED***requester***REMOVED***=***REMOVED***axios.create({
***REMOVED******REMOVED***baseURL:***REMOVED***API_URL,
***REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***"Content-Type":***REMOVED***"application/json"***REMOVED***}
});

requester.interceptors.request.use(
***REMOVED******REMOVED***(config)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***token***REMOVED***=***REMOVED***getToken()
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(token)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***config.headers.Authorization***REMOVED***=***REMOVED***`Bearer***REMOVED***${token}`
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***config;
***REMOVED******REMOVED***},
***REMOVED******REMOVED***(error)***REMOVED***=>***REMOVED***Promise.reject(error)
);

export***REMOVED***default***REMOVED***requester

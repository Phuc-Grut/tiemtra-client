import***REMOVED***{***REMOVED***Provider***REMOVED***}***REMOVED***from***REMOVED***"react-redux";
import***REMOVED***{***REMOVED***BrowserRouter***REMOVED***}***REMOVED***from***REMOVED***"react-router-dom";
import***REMOVED***AppRoutes***REMOVED***from***REMOVED***"./routes/AppRoutes";
import***REMOVED***{***REMOVED***store***REMOVED***}***REMOVED***from***REMOVED***"./views/Auth/store";
import***REMOVED***{***REMOVED***QueryClient,***REMOVED***QueryClientProvider***REMOVED***}***REMOVED***from***REMOVED***"@tanstack/react-query";
import***REMOVED***{***REMOVED***ThemeProvider***REMOVED***}***REMOVED***from***REMOVED***"@emotion/react";
import***REMOVED***theme***REMOVED***from***REMOVED***"./assets/styles/theme";
import***REMOVED***{***REMOVED***CssBaseline***REMOVED***}***REMOVED***from***REMOVED***"@mui/material";
import***REMOVED***{***REMOVED***SnackbarProvider***REMOVED***}***REMOVED***from***REMOVED***"notistack";
import***REMOVED***ToastPosition***REMOVED***from***REMOVED***"./components/ToastPosition";

const***REMOVED***App***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***queryClient***REMOVED***=***REMOVED***new***REMOVED***QueryClient();

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Provider***REMOVED***store={store}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<QueryClientProvider***REMOVED***client={queryClient}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<ThemeProvider***REMOVED***theme={theme}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CssBaseline***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<SnackbarProvider
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***maxSnack={3}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***autoHideDuration={3000}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***anchorOrigin={{***REMOVED***vertical:***REMOVED***"top"***REMOVED***,***REMOVED***horizontal:***REMOVED***"right"***REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<ToastPosition***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<BrowserRouter>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<AppRoutes***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</BrowserRouter>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</SnackbarProvider>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</ThemeProvider>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</QueryClientProvider>
***REMOVED******REMOVED******REMOVED******REMOVED***</Provider>
***REMOVED******REMOVED***);
};

export***REMOVED***default***REMOVED***App;

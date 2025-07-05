import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { store } from "./views/Auth/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import theme from "./assets/styles/theme";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import ToastPosition from "./components/ToastPosition";
import { useCartLocalInit } from "./hook/useCartLocalInit";

const App = () => {
  const queryClient = new QueryClient();
  useCartLocalInit();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <ToastPosition />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

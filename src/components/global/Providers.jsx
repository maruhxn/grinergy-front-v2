import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import LanguageContext from "../../context/language";
import theme from "../../styles/theme";

export default function Providers({ children }) {
  const [isENG, setIsENG] = useState(true);
  const [cookies] = useCookies(["KOR"]);
  const queryClient = new QueryClient();

  useEffect(() => {
    cookies["KOR"] ? setIsENG(false) : setIsENG(true);
  }, [cookies]);

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <CookiesProvider>
          <QueryClientProvider client={queryClient}>
            <LanguageContext.Provider value={{ isENG, setIsENG }}>
              {children}
            </LanguageContext.Provider>
          </QueryClientProvider>
        </CookiesProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}

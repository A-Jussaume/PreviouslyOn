import "../styles/globals.css";
import "../styles/app.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import Router from "next/router";
import { useCookies } from "react-cookie";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { CookiesProvider } from "react-cookie";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname == "/") {
      Router.push("/home");
    }
  }, [pageProps]);

  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "token",
    "idSerie",
  ]);
  const [token, setToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [idSerie, setIdSerie] = useState(null);
  const options = {
    timeout: 2500,
    position: positions.MIDDLE,
  };

  useEffect(() => {
    if (cookies.user && cookies.user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
      setUser(null);
    }
  }, [cookies]);

  return (
    <div>
      <CookiesProvider>
        <Provider template={AlertTemplate} {...options}>
          <Navbar
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            removeCookie={removeCookie}
          />{" "}
          <Component
            {...pageProps}
            cookies={cookies}
            setCookie={setCookie}
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            user={user}
            setUser={setUser}
            idSerie={idSerie}
            setIdSerie={setIdSerie}
          />
        </Provider>
      </CookiesProvider>
    </div>
  );
}

export default MyApp;

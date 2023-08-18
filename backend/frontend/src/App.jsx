// Import react
import { Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useCookies } from "react-cookie";
// Import redux
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./toolkit/user/actions";

// Import routes
import Router from "./routes/routes";

// Import components
import { Header, Footer, ScrollToTop, CookieConsent } from "./components";
import MessengerCustomerChat from "react-messenger-customer-chat";

// Import Global styles
import GlobalStyle from "./styles/GlobalStyles";

function App() {
  // Redux store
  const dispatch = useDispatch();
  const userSlice = useSelector((state) => state.user);
  const { user, isLoading } = userSlice;

  // Getting User profile
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Cookie consent
  const [cookies] = useCookies(["cookieConsent"]);
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        {/* Web pages */}
        <ScrollToTop>
          <GlobalStyle />
          <Header user={user} />
          <Router user={user} loading={isLoading} />
          <Footer />
        </ScrollToTop>

        {/* Cookie popup */}
        {!cookies.cookieConsent && <CookieConsent />}

        {/* Messenger */}
        <MessengerCustomerChat
          pageId="101479372628795"
          appId="1202628510495152"
        />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

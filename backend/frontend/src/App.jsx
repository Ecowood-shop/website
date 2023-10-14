// Import react
import { Suspense, useEffect, useState } from "react";
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

  // Additional hook for hiding messenger-customer-chat when:
  // 1. calculator is shown on product page
  // 2. menu is opened in mobile mode
  const [IsMessengerShown, setIsMessengerShown] = useState(true);

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
        <ScrollToTop visible={cookies.cookieConsent}>
          <GlobalStyle />
          <Header user={user} setIsMessengerShown={setIsMessengerShown} />
          <Router
            user={user}
            loading={isLoading}
            setIsMessengerShown={setIsMessengerShown}
          />
          <Footer />
        </ScrollToTop>
        {/* Cookie popup */}
        {!cookies.cookieConsent && <CookieConsent />}

        {/* Messenger */}
        {cookies.cookieConsent && IsMessengerShown && (
          <MessengerCustomerChat
            pageId="101479372628795"
            appId="1202628510495152"
          />
        )}
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

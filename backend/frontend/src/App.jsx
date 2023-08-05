// Import react
import { Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

// Import redux
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./toolkit/user/actions";

// Import routes
import Router from "./routes/routes";

// Import components
import { Header, Footer, ScrollToTop } from "./components";
// import MessengerCustomerChat from "react-messenger-customer-chat";

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

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <ScrollToTop>
          <GlobalStyle />
          <Header user={user} />
          <Router user={user} loading={isLoading} />
          <Footer />
        </ScrollToTop>

        {/*  <MessengerCustomerChat
    pageId="<PAGE_ID>"
    appId="<APP_ID>"
  />, */}
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

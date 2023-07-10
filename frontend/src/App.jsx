// Import react
import { Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

// Import redux
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./store/actions/userActions";

// Import routes
import Router from "./routes/routes";

// Import components
import components from "./components";
// import MessengerCustomerChat from "react-messenger-customer-chat";

function App() {
  // Redux store
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User);
  const { user, loadingUser } = User;

  // Components
  const { Header, Footer, Translate, ScrollToTop } = components;

  // Getting User data
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <ScrollToTop>
          <Header user={user} />
          <Translate />
          <Router user={user} loading={loadingUser} />
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

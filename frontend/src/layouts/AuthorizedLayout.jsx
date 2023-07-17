// Import outlet
import { Outlet } from "react-router-dom";

// Import components
import components from "../components";

// Import error page
import Error from "../pages/app/error/Error";

// Export Authorized layout
function AuthorizedLayout({ user, loading }) {
  const { Loader } = components;

  return (
    <>
      {loading ? (
        <Loader color={"darkmagenta"} />
      ) : user ? (
        <>
          <Outlet />
        </>
      ) : (
        <Error />
      )}
    </>
  );
}

export default AuthorizedLayout;

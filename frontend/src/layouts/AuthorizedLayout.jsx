//  REACT
import { Outlet } from "react-router-dom";

// COMPONENTS
import Error from "../screens/app/error/Error";
import Loader from "../components/loader/Loader";

function AuthorizedLayout({ user, loading }) {

  return (
    <>
      {loading ? (
        <Loader />
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

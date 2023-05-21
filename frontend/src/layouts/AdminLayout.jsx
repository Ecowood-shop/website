import { Outlet } from "react-router-dom";

// COMPONENTS
import Error from "../screens/app/error/Error";
import Loader from "../components/loader/Loader";
function AdminLayout({ user, loading }) {
  return (
    <>
      {loading ? (
        <Loader />
      ) : user?.is_staff ? (
        <>
          <Outlet />
        </>
      ) : (
        <Error />
      )}
    </>
  );
}

export default AdminLayout;

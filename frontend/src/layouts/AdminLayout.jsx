// Import outlet
import { Outlet } from "react-router-dom";

// Import components
import components from "../components";

// Import error page
import Error from "../pages/app/error/Error";

// Export Admin layout
function AdminLayout({ user, loading }) {
  const { Loader } = components;

  return (
    <>
      {loading ? (
        <Loader color={"darkmagenta"} />
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

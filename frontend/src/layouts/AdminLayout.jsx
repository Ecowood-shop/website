//  REACT
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../store/actions/userActions";

// COMPONENTS
import Error from "../screens/app/error/Error";
import Loader from "../components/loader/Loader";

function AdminLayout() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User);
  const { user, loadingUser: loading } = User;

  useEffect(() => {
    if( !loading) dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      {loading != false && document.cookie.indexOf("altax") !== -1 ? (
        <Loader color="blueviolet" />
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

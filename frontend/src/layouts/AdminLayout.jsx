//  REACT
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../store/actions/userActions";

// COMPONENTS
import Error from "../screens/app/error/Error";

function AdminLayout() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User);
  const { user } = User;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      {user?.is_staff ? (
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

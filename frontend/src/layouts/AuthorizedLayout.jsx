//  REACT
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../store/actions/userActions";

// COMPONENTS
import Error from "../screens/app/error/Error";
import Loader from "../components/loader/Loader";

function AuthorizedLayout() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User);
  const { user, loadingUser:loading,success } = User;


  useEffect(() => {
    if(success!=false && !loading ) {
      console.log("auth run")
      dispatch(getUser());}
  }, [dispatch,success]);
  console.log(user);


  return (
    <>
      {loading != false && document.cookie.indexOf("altax") !== -1 ? (
        <Loader color="blueviolet" />
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

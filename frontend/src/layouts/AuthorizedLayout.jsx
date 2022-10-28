//  REACT
import React, { useEffect } from "react";
import {Outlet } from "react-router-dom";

// REDUX
import { useSelector,useDispatch } from "react-redux";
import { getUser } from "../store/actions/userActions";

// COMPONENTS
import Error from "../screens/app/error/Error";

function AuthorizedLayout() {
  const dispatch=useDispatch()
  const User = useSelector((state) => state.User);
  const { user } = User;

  useEffect(() => {
      dispatch(getUser())
  }, [dispatch]);
console.log(user)

  return (
     <>
      {user ? (
        <>
          <Outlet />
        </>
       ):<Error/>}
     </>
  );
}

export default AuthorizedLayout;

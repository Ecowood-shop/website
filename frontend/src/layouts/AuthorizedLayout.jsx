//  REACT
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";


function AuthorizedLayout() {
  const navigate = useNavigate();
  const systemUser = useSelector((state) => state.systemUser);
  const { user} =systemUser 

    useEffect(() => {
      if (!user) {
        navigate("/authorization  ");
      }
    }, []);


  return (
     <>
      {user && (
        <>
          <Outlet />
        </>
       )}
     </>
  );
}

export default AuthorizedLayout;

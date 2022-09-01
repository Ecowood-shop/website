//  REACT
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";

// import Header from "../components/Header";
// import Back from "../components/Back";

function AuthorizedLayout() {
  const navigate = useNavigate();
  const systemUser = useSelector((state) => state.systemUser);
  const { user} =systemUser 

    useEffect(() => {
      if (!user) {
        navigate("/");
      }
    }, []);


  return (
     <>
      {user && (
        <>
          {/* <Header /> */}
          <Outlet />
        </>
       )}
     </>
  );
}

export default AuthorizedLayout;

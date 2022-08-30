// REACT
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";

function HomeLayout() {
  const navigate = useNavigate();
  const systemUser = useSelector((state) => state.systemUser);
  const { user} =systemUser 

    useEffect(() => {
      if (user) {
        navigate(-1, { replace: true });
      }
    }, []);

  return <Outlet />;
}

export default HomeLayout;

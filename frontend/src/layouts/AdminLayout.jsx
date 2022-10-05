//  REACT
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";

function AdminLayout() {
  const navigate = useNavigate();
  const systemUser = useSelector((state) => state.systemUser);
  const { user } = systemUser;

  useEffect(() => {
    if (!user?.isAdmin || !user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {user?.isAdmin && (
        <>
          <Outlet />
        </>
      )}
    </>
  );
}

export default AdminLayout;

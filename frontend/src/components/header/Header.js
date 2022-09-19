// REACT
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/systemActions";

// COMPONENTS
import Search from "./search/Search";
import AdminPanel from "./AdminPanel";

// OTHERS
import { Opener } from "../../functions/Animation";
import "./header.scss";
import logo from "../../static/images/altax.png";

function Header() {
  // VARIABLES
  const [isOpen, setIsOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const systemUser = useSelector((state) => state.systemUser);
  const { user } = systemUser;

  // FUNCTIONS

  const AdminProductsNavigator = () => {
    navigate("/admin/products");
  };

  const AdminUsersNavigator = () => {
    navigate("/admin/users");
  };
  const ClosePanel = () => {
    Opener(["profile-link", "logOut-link", "admin-panel"], isOpen, setIsOpen);
    Opener(
      ["admin-back", "admin-users", "admin-products"],
      isPanelOpen,
      setIsPanelOpen
    );
  };
  const CloseDropdown = () => {
    user?.isAdmin
      ? isPanelOpen
        ? Opener(
            ["admin-back", "admin-users", "admin-products"],
            isPanelOpen,
            setIsPanelOpen
          )
        : Opener(
            ["profile-link", "logOut-link", "admin-panel"],
            isOpen,
            setIsOpen
          )
      : Opener(["profile-link", "logOut-link"], isOpen, setIsOpen);
  };
  const toggle = () => {
    let toggleElement = document.getElementById("header-container");
    toggleElement.className === "header-container w3-animate-top"
      ? (toggleElement.className += " header-responsive")
      : (toggleElement.className = "header-container w3-animate-top");
    let logo = document.getElementById("altax-logo");
    logo.className === "header-logo"
      ? (logo.className += " header-logo-responsive")
      : (logo.className = "header-logo");
  };

  return (
    <div className="header-block">
      <header className="header-container w3-animate-top" id="header-container">
        <img
          src={logo}
          alt="altax logo"
          className="header-logo"
          id="altax-logo"
          onClick={() => navigate("/")}
        />
        <button className="header-toggle" onClick={() => toggle()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="toggle-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
        <Search navigate={navigate}/>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="header-cart-icon"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>

        {user ? (
          <h2 className="header-user" onClick={() => CloseDropdown()}>
            <p>
              {" "}
              <span> {user.first_name + " " + user.last_name} </span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="header-user-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </p>

            {isOpen && (
              <div className="header-dropdown">
                {user.isAdmin && (
                  <button
                    id="admin-panel"
                    className="header-dropdown-element w3-animate-right animate__animated"
                    onClick={() => {
                      Opener(
                        ["profile-link", "logOut-link", "admin-panel"],
                        isOpen,
                        setIsOpen
                      );
                      setIsPanelOpen(!isPanelOpen);
                    }}
                  >
                    ადმინ პანელი
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="custom-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </button>
                )}
                <button
                  id="profile-link"
                  className="header-dropdown-element w3-animate-right animate__animated"
                  onClick={() => navigate("/profile")}
                >
                  პროფილი
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="custom-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>

                <button
                  id="logOut-link"
                  className="header-dropdown-element w3-animate-right animate__animated"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  გამოსვლა{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="custom-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            )}
            {isPanelOpen && (
              <AdminPanel
                Close={() => ClosePanel()}
                ProductsNavigator={() => AdminProductsNavigator()}
                UsersNavigator={() => AdminUsersNavigator()}
              />
            )}
          </h2>
        ) : (
          <button
            className="header-logIn"
            onClick={() => navigate("/authorization")}
          >
            ავტორიზაცია
          </button>
        )}
      </header>
    </div>
  );
}

export default Header;

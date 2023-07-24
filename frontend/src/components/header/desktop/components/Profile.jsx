// Import useState
import { useState, useEffect, useRef } from "react";
// Import styled components
import { styled } from "styled-components";
import { UserText } from "./style";

// Import navigate
import { useNavigate } from "react-router-dom";

// Import svgs
import { headerIcons } from "../../../../static/icons";

// Import components
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";

/*  Style  */
// Container
const Container = styled.div`
  margin-left: auto;
`;

// Panel Container
const PanelContainer = styled.div`
  position: relative;
`;

// Log in text
const LoginText = styled.h2`
  cursor: pointer;
  color: var(--white);
  font-size: var(--small-l);
  transition: color 0.1s ease-in-out;

  &:hover {
    color: var(--whiteWithOpacity);
  }
`;

// Export Profile component
function Profile({ user, t }) {
  // Destructure icons
  const { PanelSVG } = headerIcons;

  // Hooks
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdmin, setIsOpenAdmin] = useState(false);
  const containerRef = useRef(null);

  // Functions
  const panelChanger = (event) => {
    event.stopPropagation();
    setIsOpenAdmin(!isOpenAdmin);
  };

  // Navigator for links which closes panel on click
  const navigator = (url) => {
    navigate(url);
    setIsOpen(false);
    setIsOpenAdmin(false);
  };

  // Close the panel when clicked outside of it
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
      setIsOpenAdmin(false);
    }
  };

  // Add listener to run handleClickOutside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      {/* Show user if authorized else show log in link */}
      {user ? (
        <PanelContainer>
          {/* User */}
          <UserText onClick={() => setIsOpen(!isOpen)}>
            {user.first_name + " " + user.last_name} <PanelSVG />
          </UserText>

          {/* Show  panel if isOpen is true */}
          {isOpen && (
            <>
              {/* Show admin panel if isOpenAdmin is true */}
              {isOpenAdmin ? (
                <AdminPanel
                  t={t}
                  navigate={navigator}
                  panelChanger={panelChanger}
                />
              ) : (
                // Show user panel if isOpenAdmin is false
                <UserPanel
                  user={user}
                  t={t}
                  navigate={navigator}
                  panelChanger={panelChanger}
                />
              )}
            </>
          )}
        </PanelContainer>
      ) : (
        // Log in link
        <LoginText onClick={() => navigate("/authorization")}>
          {t("header.log in")}
        </LoginText>
      )}
    </Container>
  );
}

export default Profile;

import "./css/Header.css";
import { Link, useLocation } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightIcon from "@mui/icons-material/Light";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.clear();
  };

  const onSpotlight = pathname === "/spotlight";
  const onProfile = pathname === "/industryPartner";

  const loggedIn = onSpotlight || onProfile;

  return (
    <header className="Header">
      <nav className="navbar container">
        <div className="logo">
          <a
            style={{ textDecoration: "none" }}
            data-testid="df-link"
            href="https://digitalfutures.com/"
            target="_blank norefferer"
            className="logo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              aria-hidden="true"
              fill="currentColor"
              className="logoSVG"
            >
              <path d="M16.09 4H3v4.4h13.09c1.737 0 3.402.695 4.63 1.933A6.628 6.628 0 0122.635 15c0 1.75-.69 3.43-1.917 4.667a6.518 6.518 0 01-4.628 1.933H7.364V26h8.727c2.893 0 5.668-1.159 7.714-3.222A11.046 11.046 0 0027 15c0-2.917-1.15-5.715-3.195-7.778A10.863 10.863 0 0016.09 4zm2.183 11c0-.584-.23-1.143-.64-1.556a2.173 2.173 0 00-1.542-.644H5.18v4.4h10.91c.579 0 1.133-.232 1.543-.644.409-.413.639-.973.639-1.556z"></path>
            </svg>
            DFX
          </a>
        </div>
        <div className="navbar-nav ml-auto header-buttons">
          {onSpotlight && (
            <Link
              to="/industryPartner"
              data-testid="profile-link"
              className="navlinkgen"
            >
              <AccountCircleIcon htmlColor={"#f4f2ee"} fontSize={"large"} />
            </Link>
          )}
          {onProfile && (
            <Link
              to="/spotlight"
              data-testid="spotlight-link"
              className="navlinkgen"
            >
              <LightIcon htmlColor={"#f4f2ee"} fontSize={"large"} />
            </Link>
          )}
          {loggedIn && (
            <Link
              to="/login"
              data-testid="logout-link"
              className="navlinkgen"
              onClick={handleLogout}
            >
              <LogoutIcon htmlColor={"#f4f2ee"} fontSize={"large"} />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
function Header() {
  let navigate = useNavigate();

  let token = sessionStorage.getItem("token");
  let logOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <Navbar expand="lg" variant="light" className="bg-light">
        <Navbar.Brand href="/">
          <h4 className="text-primary ">
            <AccountBalanceWalletIcon style={{ fontSize: "35px" }} /> Desi Hisab
          </h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Item>
            <Nav.Link
              onClick={() => navigate("/activity")}
              className="shadow-none"
            >
              Activity
            </Nav.Link>
          </Nav.Item>
          <Nav className="ml-auto">
            <Nav.Item>
              {token ? (
                <>
                  <Nav.Link
                    className="mr-2 mt-2 shadow-none"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Logout&nbsp;
                    <LogoutIcon />
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    onClick={() => navigate("/login")}
                    className="mr-2 mt-2 shadow-none"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => navigate("/signup")}
                    className="mr-4 mt-2 shadow-none"
                  >
                    SignUp
                  </Nav.Link>
                </>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;

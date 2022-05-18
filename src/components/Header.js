import React from "react";
import { Navbar, Nav,Link } from "react-bootstrap";
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
            <Link to="/activity" className="shadow-none">
              Activity
            </Link>
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
                  <Nav.Link href="/login" className="mr-2 mt-2 shadow-none">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/signup" className="mr-4 mt-2 shadow-none">
                SignUp
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;

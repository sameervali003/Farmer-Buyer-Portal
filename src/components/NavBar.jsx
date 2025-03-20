import React, { useState, useContext } from "react";
import DropdownButton from "./DropdownButton";
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router';
import { LoginContext } from "../contexts/LoginContext";
import Button from "./Button";

const NavBar = () => {
  const { loginStatus } = useContext(LoginContext);

  const [open, setOpen] = useState(false); // For navbar toggle in mobile view
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false); // For showing the registration modal
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // For showing the login modal

  const navigate = useNavigate();

  function openLoginModal() {
    setLoginModalOpen(true);
  }

  function closeLoginModal() {
    setLoginModalOpen(false);
  }

  function loginAsFarmer() {
    closeLoginModal();
    navigate("/login");
  }

  function loginAsBuyer() {
    closeLoginModal();
    navigate("/login");
  }

  function openRegisterModal() {
    setRegisterModalOpen(true);
  }

  function closeRegisterModal() {
    setRegisterModalOpen(false);
  }

  function registerAsFarmer() {
    closeRegisterModal();
    navigate("/registerfarm");
  }

  function registerAsBuyer() {
    closeRegisterModal();
    navigate("/registerbuyer");
  }

  let Links = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "#about" },
    { name: "DISEASE DETECTION", link: "/detect" },
  ];

  return (
    <>
      <div className="shadow-md w-full top-0 sticky bg-gradient-to-l from-teal-100 via-violet-100 to-lime-200 ">
        <div className="md:flex items-center justify-between bg-opacity-75 py-4 md:px-10 px-7 select-none">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
            <span className="text-3xl text-green-800 mr-1 pt-2">
              <ion-icon name="leaf-sharp"></ion-icon>
            </span>
            FarmEasy
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 bg-white" : "top-[-490px]"
            } overflow-y-auto`}
          >
            {Links.map((link) => (
              <li
                key={link.name}
                className="block py-2 pl-3 pr-4 text-gray-700 rounded border-0 hover:text-green-400 md:p-0 md:mx-2 font-bold"
              >
                <a
                  href={link.link}
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded border-0 hover:text-cyan-400 md:p-0 md:mx-2 font-sans"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="md:ml-8 text-xl md:my-0 my-7 flex space-x-4">
              {!loginStatus ? (
                <>
                  <Button func={openLoginModal}>Login</Button>
                  <Button func={openRegisterModal}>Register</Button>
                </>
              ) : (
                <DropdownButton />
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Modal for selecting farmer or buyer registration */}
      {isRegisterModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 className="text-2xl font-bold mb-4">Register As</h2>
            <div className="flex justify-around space-x-4">
              <button
                style={buttonStyleGreen}
                onClick={registerAsFarmer}
              >
                Farmer
              </button>
              <button
                style={buttonStyleBlue}
                onClick={registerAsBuyer}
              >
                Buyer
              </button>
            </div>
            <button
              style={buttonStyleGray}
              onClick={closeRegisterModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for selecting farmer or buyer login */}
      {isLoginModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 className="text-2xl font-bold mb-4">Login As</h2>
            <div className="flex justify-around space-x-4">
              <button
                style={buttonStyleGreen}
                onClick={loginAsFarmer}
              >
                Farmer
              </button>
              <button
                style={buttonStyleBlue}
                onClick={loginAsBuyer}
              >
                Buyer
              </button>
            </div>
            <button
              style={buttonStyleGray}
              onClick={closeLoginModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};

// Inline CSS Styles
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center"
};

const buttonStyleGreen = {
  backgroundColor: "green",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px"
};

const buttonStyleBlue = {
  backgroundColor: "blue",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  marginLeft: "10px"
};

const buttonStyleGray = {
  backgroundColor: "gray",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "15px"
};

export default NavBar;

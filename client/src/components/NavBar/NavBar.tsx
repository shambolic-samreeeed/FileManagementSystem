import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import Cookies from "js-cookie";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const nav = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const [toggleLoginPopup, setToggleLoginPopup] = useState(false);

  const handlePopup = () => {
    setToggleLoginPopup(!toggleLoginPopup);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    setLoggedIn(false);
    setEmail("");
    nav("/login");
  };

  const fetchEmailFromCookies = () => {
    const storedEmail = Cookies.get("email");
    if (storedEmail) {
      setEmail(storedEmail);
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    fetchEmailFromCookies();
  }, []);

  return (
    <nav className="bg-white drop-shadow-md relative px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <p
          className="text-xl font-bold cursor-pointer"
          onClick={() => nav("/home")}
        >
          File Manager
        </p>

        {/* Navigation links (hidden on mobile) */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link
            to="/home"
            className={`px-3 py-1 rounded-md transition ${
              location.pathname === "/home"
                ? "bg-blue-100 text-blue-800 font-semibold"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Home
          </Link>
          <Link
            to="/files"
            className={`px-3 py-1 rounded-md transition ${
              location.pathname === "/files"
                ? "bg-blue-100 text-blue-800 font-semibold"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Files
          </Link>
          <Link
            to="/folders"
            className={`px-3 py-1 rounded-md transition ${
              location.pathname === "/folders"
                ? "bg-blue-100 text-blue-800 font-semibold"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Folders
          </Link>
        </div>

        {/* Right side: profile (desktop) & hamburger (mobile) */}
        <div className="flex items-center gap-4">
          {/* Profile icon for desktop */}
          <div className="hidden md:flex items-center">
            {loggedIn ? (
              <img
                src="/boy.png"
                alt="profile"
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 object-cover rounded-full cursor-pointer"
              />
            ) : (
              <CgProfile
                className="text-2xl hover:bg-gray-200 p-1 rounded-full cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            )}
          </div>

          {/* Hamburger icon for mobile */}
          <div className="md:hidden">
            {menuOpen ? (
              <HiX
                className="text-2xl cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            ) : (
              <HiOutlineMenuAlt3
                className="text-2xl cursor-pointer"
                onClick={() => setMenuOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown*/}
      {menuOpen && (
        <div className="flex flex-col gap-3 mt-3 px-3 pb-4 md:hidden border-t border-gray-200">
          <Link
            to="/home"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === "/home"
                ? "bg-blue-100 text-blue-800 font-semibold"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/files"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === "/files"
                ? "bg-blue-100 text-blue-800 font-semibold"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Files
          </Link>
          <Link
            to="/folders"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === "/folders"
                ? "bg-blue-100 text-blue-800 font-semibold"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Folders
          </Link>

          {/* Profile link (no profile picture) */}
          <button
            className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-left w-full font-medium"
            onClick={() => {
              nav("/profile");
              setMenuOpen(false);
            }}
          >
            Profile
          </button>

          {/* Logout/Login button */}
          {loggedIn ? (
            <button
              className="text-red-600 hover:bg-red-100 px-3 py-2 rounded-md text-left w-full font-semibold"
              onClick={() => {
                setToggleLoginPopup(true);
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="text-green-600 hover:bg-green-100 px-3 py-2 rounded-md text-left w-full font-semibold"
              onClick={() => {
                nav("/login");
                setMenuOpen(false);
              }}
            >
              Login
            </button>
          )}
        </div>
      )}

      {/* Profile dropdown menu */}
      {isOpen && (
        <div className="absolute right-6 top-[60px] bg-gray-100 mt-2 rounded shadow-lg z-10 min-w-[150px]">
          <ul className="bg-gray-100">
            <li className="pl-2 pr-20 py-2 cursor-default select-none text-gray-700">
              {email || "No email"}
            </li>

            <li
              className="flex items-center pl-2 pr-20 py-2 hover:bg-gray-300 cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                nav("/profile");
              }}
            >
              <CgProfile className="text-[30px] p-1 rounded-full mr-2" />
              Profile
            </li>

            {loggedIn ? (
              <li
                className="flex items-center gap-2 pl-2 py-2 text-red-600 hover:bg-gray-300 cursor-pointer"
                // onClick={handleLogout}
                onClick={() => handlePopup()}
              >
                <CiLogout className="text-[27px]" />
                Logout
              </li>
            ) : (
              <li
                className="flex items-center gap-2 pl-2 py-2 text-green-600 hover:bg-gray-300 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  nav("/login");
                }}
              >
                <CiLogout className="text-lg" />
                Login
              </li>
            )}
          </ul>
        </div>
      )}

      {toggleLoginPopup && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            zIndex: 1000,
            width: "90%",
            maxWidth: "300px",
          }}
        >
          <p className="mb-4 text-center">Are you sure you want to logout?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setToggleLoginPopup(false)}
              className="px-3 py-1 rounded border border-gray-400 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

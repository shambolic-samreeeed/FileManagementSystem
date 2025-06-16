import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import Cookies from "js-cookie";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile nav
  const nav = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const location = useLocation();

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
    <div className="bg-white drop-shadow-md relative">
      {/* Topbar */}
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <p className="text-xl font-bold cursor-pointer" onClick={() => nav("/home")}>
          File Manager
        </p>

        {/* Hamburger icon for small screens */}
        <div className="md:hidden">
          {menuOpen ? (
            <HiX className="text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
          ) : (
            <HiOutlineMenuAlt3 className="text-2xl cursor-pointer" onClick={() => setMenuOpen(true)} />
          )}
        </div>

        {/* Right - Profile */}
        <div className="hidden md:flex gap-5 items-center">
          {loggedIn ? (
            <img
              src="/boy.png"
              alt="profile"
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 object-cover rounded-full cursor-pointer"
            />
          ) : (
            <CgProfile
              className="size-10 hover:bg-gray-200 p-1 rounded-full cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>
      </div>

      {/* Navigation links */}
      <div className={`flex-col md:flex md:flex-row md:items-center md:justify-start md:px-10 gap-4 transition-all duration-200 ease-in-out ${menuOpen ? "flex px-6 pb-4" : "hidden md:flex"}`}>
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

        {/* Mobile profile icon */}
        <div className="flex md:hidden mt-2">
          {loggedIn ? (
            <img
              src="/boy.png"
              alt="profile"
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 object-cover rounded-full cursor-pointer"
            />
          ) : (
            <CgProfile
              className="size-10 hover:bg-gray-200 p-1 rounded-full cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>
      </div>

      {/* dropdown menu */}
      {isOpen && (
        <div className="absolute right-6 top-[60px] bg-gray-100 mt-2 rounded shadow-lg z-10">
          <ul className="bg-gray-100 min-w-[150px]">
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
              <CgProfile className="size-8 p-1 rounded-full mr-2" />
              Profile
            </li>

            {loggedIn ? (
              <li
                className="flex items-center gap-2 pl-2 py-2 text-red-600 hover:bg-gray-300 cursor-pointer"
                onClick={handleLogout}
              >
                <CiLogout className="size-6" />
                Logout
              </li>
            ) : (
              <li
                className="flex items-center gap-2 pl-2 py-2 text-green-600 hover:bg-gray-300 cursor-pointer"
                onClick={handleLogout}
              >
                <CiLogout className="size-6" />
                Login
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;

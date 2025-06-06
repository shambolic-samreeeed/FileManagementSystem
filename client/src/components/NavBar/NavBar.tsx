import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import Cookies from "js-cookie";
import DriveSyncSettings from "../Drive/DriveSyncSettings";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <div>
      <div className="bg-white h-15 flex justify-between items-center px-10 drop-shadow-md">
        {/* logo container */}
        <div className="flex justify-center ">
          <div>
            <p
              className="text-2xl font-bold cursor-pointer"
              onClick={() => nav("/home")}
            >
              File Manager
            </p>
          </div>
          <div className="flex gap-4 justify-center items-center ml-20">
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
        </div>

        {/* right side */}
        <div className="flex gap-5 items-center">
          {loggedIn ? (
            <div className="w-10 h-10 cursor-pointer">
              {/* Use /boy.png if in public folder */}
              <img
                src="/boy.png"
                alt="profile"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ) : (
            <CgProfile
              className="size-10 hover:bg-gray-200 p-1 rounded-full cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>

        {/* dropdown menu */}
        {isOpen && (
          <div className="absolute right-10 top-12 bg-gray-100 mt-2 rounded shadow-lg z-10">
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

              <li
                className="flex items-center gap-2 pl-2 py-2 text-red-600 hover:bg-gray-300 cursor-pointer"
                onClick={handleLogout}
              >
                <CiLogout className="size-6" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

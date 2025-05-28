import { IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  const isLoggedIn = () => {
    const loggedIn = localStorage.getItem("token");
    if (loggedIn) {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  return (
    <div>
      <div className="bg-white h-15 flex justify-between items-center px-10 drop-shadow-md">
        {/* logo container */}
        <div className="">
          <p className="text-2xl font-bold">File Manager</p>
        </div>

        {/* logo-right container */}
        <div className="flex gap-5 items-center">
          <IoIosSettings className="size-10 hover:bg-gray-200 rounded-[50%]" />
          {loggedIn ? (
            <div className="w-10 h-10 cursor-pointer">
              <img
                src="./public/boy.png"
                onClick={() => setIsOpen(!isOpen)}
              ></img>
            </div>
          ) : (
            <CgProfile
              className="size-10 hover:bg-gray-200 p-1 rounded-[50%]"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>

        {/* dropdown menu */}

        {isOpen && (
          <div className="absolute right-10 top-12 bg-gray-100 mt-2 ">
            <ul className="bg-gray-100">
              <div className="flex items-center hover:bg-gray-300 cursor-pointer" onClick={()=>nav('/profile')}>
                <div>
                  <CgProfile className="size-8 p-1 rounded-[50%]" />
                </div>
                <div>
                  <li className=" pl-2 pr-20 py-2">Profile</li>
                </div>
              </div>
              <div className="flex hover:bg-gray-300 items-center gap-2 cursor-pointer" onClick={handleLogout}>
                <CiLogout className="size-6" />
                <li
                  className="hover:bg-gray-300 pl-2 py-2 text-red-600"
                  
                >
                  Logout
                </li>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

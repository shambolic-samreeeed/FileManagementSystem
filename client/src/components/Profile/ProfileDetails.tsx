import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import DriveSyncSettings from "../Drive/DriveSyncSettings";

const ProfileDetails = () => {
  const [email, setEmail] = useState("");

  const fetchEmailFromCookies = () => {
    const storedEmail = Cookies.get("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  };

  useEffect(() => {
    fetchEmailFromCookies();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className=" w-full p-8 rounded shadow text-center">
        <div className="mb-4">
          <img
            src="/boy.png"
            alt="profile"
            className="w-40 h-40 object-cover rounded-full mx-auto"
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold">{email}</h1>
        </div>
        <div className="flex justify-center p-3">
            <DriveSyncSettings/>
        </div>

      </div>
    </div>
  );
};

export default ProfileDetails;

import { useLocation } from "react-router-dom";
import { createLogApi } from "../modules/Logs/api";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const Navbar = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    setLoading(true);
    createLogApi({
      user_name: JSON.parse(localStorage.getItem("user")).username,
      activity: "Logged out",
    })
      .then((response) => {
        console.log(response);
        localStorage.clear();
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/login";
      });
  };
  return (
    <nav className="w-full bg-white shadow-custom  h-[80px]">
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-5">
          <h1 className="text-[#263238] text-2xl">
            {" "}
            {location.pathname.includes("activity")
              ? "Activity Logs"
              : "Employees"}
          </h1>
        </div>

        <button
          onClick={() => handleLogout()}
          className="relative flex h-[55px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-6 py-2   md:flex-grow-0 md:gap-1 xl:gap-2 shadow-xl text-blue-700 font-medium  "
        >
          {loading ? <CircularProgress size={"25px"}  style={{color:'#2f50ff'}} /> : "logout"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

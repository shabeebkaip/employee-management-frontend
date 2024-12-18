import { Routes, Route } from "react-router-dom";
import { Employees } from "./modules/Employees/containers";
import { Logs } from "./modules/Logs/containers";
import Users from "./modules/users/containers/Users";

const AppRoutes = () => {
  return (
    <div className="p-5">
      <Routes>
        <Route path="/" exact element={<Employees />} />
        <Route path="/employees" exact element={<Employees />} />
        <Route path="/activity-logs" exact element={<Logs />} />
        <Route path={"/users"} element={<Users />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default AppRoutes;

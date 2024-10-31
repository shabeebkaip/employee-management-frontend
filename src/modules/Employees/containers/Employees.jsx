import { useEffect, useState } from "react";
import PaginationContainer from "../../../shared/PaginationContainer";
import Title from "../../../shared/Title";
import { Actions, EmployeesList, SearchBar } from "../components";
import { exportApi, getEmployeesApi, importApi } from "../api";
import Loader from "../../../shared/Loader";
import AddEditEmployee from "../components/AddEditEmployee";
import { createLogApi } from "../../Logs/api";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchEmployees();
  }, []);

  const fetchEmployees = (query) => {
    setLoading(true);
    getEmployeesApi(query).then((response) => {
      setLoading(false);
      if (response.success) {
        setEmployees(response.data);
        setPagination(response.pagination);
      } else {
        console.log("Error while fetching employees");
      }
    });
  };

  const handleExport = () => {
    setLoading(true);
    exportApi();
    createLogApi({
      user_name: JSON.parse(localStorage.getItem("user")).username,
      activity: "Exported employees",
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleImport = (e) => {
    console.log(e.target.files[0]);
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    setLoading(true);
    importApi(formData).then((response) => {
      setLoading(false);
      if (response.success) {
        fetchEmployees();
        createLogApi({
          user_name: JSON.parse(localStorage.getItem("user")).username,
          activity: "Imported employees",
        });
      }
    });
  };
  return (
    <div>
      <Title
        title="Employees"
        description="Displaying all employees currently assigned to the BTC department, including their Employee ID, Name, and Email for quick reference."
      />
      <div className="flex items-center justify-between p-1 mt-4 bg-white rounded-full shadow ">
        <SearchBar
          fetchEmployees={(search) => fetchEmployees({ search: search })}
        />
        <Actions
          handleAddEmployee={() => setOpen(true)}
          handleExport={handleExport}
          handleImport={handleImport}
        />
      </div>

      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {" "}
          :
          <EmployeesList
            employees={employees}
            getResponseBack={() => fetchEmployees()}
          />
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchEmployees({ page })}
          />
          <AddEditEmployee
            open={open}
            closeModal={() => setOpen(false)}
            mode="add"
            getResponseBack={() => fetchEmployees()}
          />
        </>
      )}
    </div>
  );
};

export default Employees;

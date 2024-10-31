import editIcon from "../../../assets/actions/edit.svg";
import deleteIcon from "../../../assets/actions/delete.svg";
import moment from "moment";
import PropTypes from "prop-types";
import DeleteModal from "../../../shared/DeleteModal";
import { useState } from "react";
import { deleteEmployeeApi } from "../api";
import AddEditEmployee from "./AddEditEmployee";

const EmployeesList = ({ employees, getResponseBack }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState({});
  const handleDelete = (id) => {
    deleteEmployeeApi(id).then((response) => {
      if (response.success) {
        setDeleteModal(false);
        getResponseBack();
      }
    });
  };

  const tableHeader = [
    "Employee ID",
    "Name",
    "Email",
    "Phone",
    "Role",
    "Nationality",
    "DOB",
    "Gender",
    "Actions",
  ];
  return (
    <div className="mt-4">
      <table className="w-full border-collapse">
        <thead>
          <tr
            className="bg-white "
            style={{
              position: "sticky",
              top: "0",
              zIndex: 2,
            }}
          >
            {tableHeader?.map((head, index) => (
              <th
                key={index}
                className={`p-4 text-left border-b h-[20px] font-semibold w-fit `}
                style={{
                  color: "#263238",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        {employees.length > 0 ? (
          <tbody>
            {employees.map((row, index) => {
              const isLastRow = index === employees?.length - 1;
              //   const isSelected = selectedRows.includes(row.id);

              return (
                <tr
                  key={index}
                  className={` ${
                    index % 2 === 1 ? "glass-card" : "dark-glass"
                  } ${isLastRow ? "border-b-[3px]" : ""}`}
                >
                  <td className="p-4 border-b">{row.employee_id}</td>
                  <td className="p-4 border-b">{row.name}</td>
                  <td className="p-4 border-b">{row.email}</td>
                  <td className="p-4 border-b">{row.phone}</td>
                  <td className="p-4 border-b">{row.position}</td>
                  <td className="p-4 border-b">{row.nationality}</td>
                  <td className="p-4 border-b">
                    {moment(row.dob).format("MMM DD YYYY")}
                  </td>
                  <td className="p-4 border-b">{row.gender}</td>
                  <td className="p-4 border-b ">
                    <div className="flex items-center gap-4 ">
                      <button
                        className="btn"
                        onClick={() => {
                          setEditData(row);
                          setEditModal(true);
                        }}
                      >
                        <img src={editIcon} alt="Edit" />
                      </button>
                      <button
                        className="btn"
                        onClick={() => {
                          setDeleteModal(true);
                          setDeleteId(row._id);
                        }}
                      >
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tfoot>
            <tr>
              <td colSpan={employees?.length || 1}>
                <div className="flex justify-center w-full p-4 text-center text-gray-500">
                  No data available
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      <DeleteModal
        open={deleteModal}
        closeModal={() => {
          setDeleteId(null);
          setDeleteModal(false);
        }}
        handleDelete={() => handleDelete(deleteId)}
      />
      <AddEditEmployee
        open={editModal}
        closeModal={() => setEditModal(false)}
        item={editData}
        mode="edit"
      />
    </div>
  );
};

EmployeesList.propTypes = {
  employees: PropTypes.array,
  getResponseBack: PropTypes.func,
};

export default EmployeesList;

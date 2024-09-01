import AdminSideBar from "./AdminSidebar";
import "./admin-table.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMakeCompanies,
  deleteMakeCompany,
} from "../../redux/apiCalls/makeCompaniesApiCall";
import swal from "sweetalert";

const CarsMakeCompaniesTable = () => {
  const dispatch = useDispatch();
  const { makeCompanies } = useSelector((state) => state.makeCompany);
  useEffect(() => {
    dispatch(fetchMakeCompanies());
  }, []);
  //Delete Categorie Handler
  const deleteMakeCompanyHandler = (makeCompanyId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this make company!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteMakeCompany(makeCompanyId));
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSideBar />
      <div className="table-wrapper">
        <h1 className="table-title">Cars Making Companies </h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>

              <th> Making Company Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {makeCompanies.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>
                  <b>{item?.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteMakeCompanyHandler(item._id)}>
                      Delete Making Company
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CarsMakeCompaniesTable;

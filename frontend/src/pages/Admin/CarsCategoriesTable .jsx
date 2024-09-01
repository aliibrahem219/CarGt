import AdminSideBar from "./AdminSidebar";
import "./admin-table.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCarsCategories,
  deleteCarCategory,
} from "../../redux/apiCalls/carsCategoriesApiCalls";
import swal from "sweetalert";

const CarsCategoriesTable = () => {
  const dispatch = useDispatch();
  const { carsCategories } = useSelector((state) => state.carsCategory);
  useEffect(() => {
    dispatch(fetchCarsCategories());
  }, []);
  //Delete Categorie Handler
  const deleteCarCategoryHandler = (carsCategoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Car Category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCarCategory(carsCategoryId));
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSideBar />
      <div className="table-wrapper">
        <h1 className="table-title">Cars Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>

              <th> Cars Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {carsCategories.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <b>{item?.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCarCategoryHandler(item?._id)}>
                      Delete Category
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

export default CarsCategoriesTable;

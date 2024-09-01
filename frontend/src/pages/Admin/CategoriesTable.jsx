import AdminSideBar from "./AdminSidebar";
import "./admin-table.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
} from "../../redux/apiCalls/categoryApiCall";
import swal from "sweetalert";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  //Delete Categorie Handler
  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCategory(categoryId));
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSideBar />
      <div className="table-wrapper">
        <h1 className="table-title">Posts Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>

              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>
                  <b>{item?.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCategoryHandler(item?._id)}>
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

export default CategoriesTable;

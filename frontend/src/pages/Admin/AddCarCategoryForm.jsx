import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCarCategory } from "../../redux/apiCalls/carsCategoriesApiCalls";
import "./admin.css";
const AddCarCategoryForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Category title is required");
    dispatch(createCarCategory({ title }));
    setTitle("");
  };
  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Car Category</h6>
      <form onSubmit={formSubmitHandler}>
        <div className="add-category-form-group">
          <label htmlFor="title">Car Category Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter New Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <button className="add-category-btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCarCategoryForm;

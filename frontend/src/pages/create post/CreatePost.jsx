import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postsApiCalls";
import "./create-post.css";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { RotatingLines } from "react-loader-spinner";
const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const { categories } = useSelector((state) => state.category);
  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post title is required");
    if (category.trim() === "") return toast.error("Post category is required");
    if (description.trim() === "")
      return toast.error("Post description is required");
    if (!file) return toast.error("Post file is required");
    //we need to send this form to sever as a form data because we have an image so it isn't a normal form
    const formData = new FormData();
    //image is the name of the file on the server
    //append add data to formdata as key=>value
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    // send form data to server
    dispatch(createPost(formData));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <input
          type="text"
          placeholder="Post title"
          className="create-post-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="create-post-input"
        >
          <option disabled value="">
            Select Post Category
          </option>
          {categories?.map((category) => (
            <option key={category?._id} value={category?.title}>
              {category?.title}
            </option>
          ))}
        </select>
        <textarea
          className="create-post-textarea"
          rows="5"
          placeholder="Post description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <label htmlFor="file" className="create-post-label">
          <i className="bi bi-image-fill"></i>
          Please Select image
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          name="file"
          id="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            //setFile(e.target.files[0]);
          }}
          accept="image/*"
        />
        <button type="submit" className="create-post-btn">
          {loading ? (
            <RotatingLines
              visible={true}
              height="40"
              width="40"
              color="white"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;

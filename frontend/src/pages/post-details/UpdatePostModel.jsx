import { useState, useEffect } from "react";
import "./update-post.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postsApiCalls";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
const UpdatePostModel = ({ setUpdatePost, post }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [title, setTitle] = useState(post?.title);
  const [description, setDescription] = useState(post?.description);
  const [category, setCategory] = useState(post?.category);
  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("Post title is required");
    if (category.trim() === "") return toast.error("Post category is required");
    if (description.trim() === "")
      return toast.error("Post description is required");

    dispatch(updatePost({ title, category, description }, post?._id));
    setUpdatePost(false);
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="update-post">
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={() => {
              setUpdatePost(false);
            }}
            className="bi bi-x-circle-fill update-post-form-close"
          ></i>
        </abbr>
        <h1 className="update-post-title">Update Post</h1>
        <input
          type="text"
          className="update-post-input"
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
          className="update-post-input"
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
          className="update-post-textarea"
          rows="5"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <button type="submit" className="update-post-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModel;

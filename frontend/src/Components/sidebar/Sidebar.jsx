import { Link } from "react-router-dom";
import "./sidebar.css";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CreateAndWating from "../createandwating/CreateAndWating";
const Sidebar = ({ link }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="sidebar">
      {user && <CreateAndWating link={link} />}
      <h5 className="sidebar-title">CATEGORIES</h5>
      <ul className="sidebar-links">
        {categories?.map((category) => (
          <Link
            className="sidebar-link"
            key={category?._id}
            to={`/posts/categories/${category?.title}`}
          >
            {category?.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

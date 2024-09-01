import { Link } from "react-router-dom";
import AddCategoryForm from "./AddCategoryForm";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { getUsersCount } from "../../redux/apiCalls/profileApiCall";
import { getPostsCount } from "../../redux/apiCalls/postsApiCalls";
import { fetchAllComments } from "../../redux/apiCalls/commentApiCalls";
import {
  getALLOffersAdmin,
  getOffersCount,
} from "../../redux/apiCalls/offerApiCalls";
import { getMakeCompaniesCount } from "../../redux/apiCalls/makeCompaniesApiCall";
import AddCarCategoryForm from "./AddCarCategoryForm";
import AddMakeCompany from "./AddMakeCompany";
import { getCarsCategoriesCount } from "../../redux/apiCalls/carsCategoriesApiCalls";

const AdminMain = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { usersCount } = useSelector((state) => state.profile);
  const { makeCompaniesCount } = useSelector((state) => state.makeCompany);
  const { carsCategoriesCount } = useSelector((state) => state.carsCategory);
  const { posts, postsCount } = useSelector((state) => state.post);
  const { offers, offersCount } = useSelector((state) => state.offer);
  const { comments } = useSelector((state) => state.comment);
  const [nav, setNav] = useState(1);
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getUsersCount());
    dispatch(getPostsCount());
    dispatch(fetchAllComments());
    dispatch(getOffersCount());
    dispatch(getALLOffersAdmin());
    dispatch(getMakeCompaniesCount());
    dispatch(getCarsCategoriesCount());
  }, []);
  return (
    <div className="admin-main">
      <div className="admin-main-header">
        <div className="admin-main-card">
          <h5 className="admin-card-title">Users</h5>
          <div className="admin-card-count">{usersCount}</div>
          <div className="admin-card-link-wrapper">
            <Link className="admin-card-link" to="/admin-dashboard/users-table">
              See All Users
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Posts</h5>
          <div className="admin-card-count">{postsCount}</div>
          <div className="admin-card-link-wrapper">
            <Link className="admin-card-link" to="/admin-dashboard/posts-table">
              See All Posts
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-file-post"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title"> Waiting Posts</h5>
          <div className="admin-card-count">{posts?.length}</div>
          <div className="admin-card-link-wrapper">
            <Link
              className="admin-card-link"
              to="/admin-dashboard/waiting-posts-table"
            >
              See All Wating Posts
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-file-post"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Posts Categories</h5>
          <div className="admin-card-count">{categories?.length}</div>
          <div className="admin-card-link-wrapper">
            <Link
              className="admin-card-link"
              to="/admin-dashboard/categories-table"
            >
              See All Categories
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-tag-fill"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Cars Categories</h5>
          <div className="admin-card-count">{carsCategoriesCount}</div>
          <div className="admin-card-link-wrapper">
            <Link
              className="admin-card-link"
              to="/admin-dashboard/cars-categories-table"
            >
              See All Categories
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-tag-fill"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Comments</h5>
          <div className="admin-card-count">{comments?.length}</div>
          <div className="admin-card-link-wrapper">
            <Link
              className="admin-card-link"
              to="/admin-dashboard/comments-table"
            >
              See All Comments
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-chat-left-text"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Offers</h5>
          <div className="admin-card-count">{offersCount}</div>
          <div className="admin-card-link-wrapper">
            <Link
              className="admin-card-link"
              to="/admin-dashboard/offers-table"
            >
              See All Offers
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-cart"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Waiting Offers</h5>
          <div className="admin-card-count">{offers?.length}</div>
          <div className="admin-card-link-wrapper">
            <Link
              className="admin-card-link"
              to="/admin-dashboard/waiting-offers-table"
            >
              See All Wating Offers
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-cart"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Making Companies</h5>
          <div className="admin-card-count">{makeCompaniesCount}</div>
          <div className="admin-card-link-wrapper">
            <Link
              className="admin-card-link"
              to="/admin-dashboard/make-companies-table"
            >
              See All Companies
            </Link>
            <div className="admin-card-icon">
              <i class="bi bi-car-front-fill"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-nav">
        <button className="admin-nav-button" onClick={() => setNav(1)}>
          Add Post Category
        </button>
        <button
          className="admin-nav-button"
          profile-nav-button
          onClick={() => setNav(2)}
        >
          Add Car Category
        </button>
        <button className="admin-nav-button" onClick={() => setNav(3)}>
          Add Car make Company
        </button>
      </div>
      {nav === 1 && <AddCategoryForm />}
      {nav === 2 && <AddCarCategoryForm />}
      {nav === 3 && <AddMakeCompany />}
    </div>
  );
};

export default AdminMain;

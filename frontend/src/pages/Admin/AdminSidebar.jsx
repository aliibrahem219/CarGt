import { Link } from "react-router-dom";
const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <Link to="/admin-dashboard" className="admin-sidebar-title">
        <i className="bi bi-columns"></i>
        DashBoard
      </Link>
      <ul className="admin-dashboard-list">
        <Link className="admin-sidebar-link" to="/admin-dashboard/users-table">
          <i className="bi bi-person"></i>
          Users
        </Link>
        <Link className="admin-sidebar-link" to="/admin-dashboard/posts-table">
          <i className="bi bi-file-post"></i>
          Posts
        </Link>
        <Link
          className="admin-sidebar-link"
          to="/admin-dashboard/waiting-posts-table"
        >
          <i className="bi bi-file-post"></i>
          Waiting Posts
        </Link>
        <Link
          className="admin-sidebar-link"
          to="/admin-dashboard/categories-table"
        >
          <i className="bi bi-tag-fill"></i>
          Posts Categories
        </Link>
        <Link
          className="admin-sidebar-link"
          to="/admin-dashboard/cars-categories-table"
        >
          <i className="bi bi-tag-fill"></i>
          Cars Categories
        </Link>
        <Link
          className="admin-sidebar-link"
          to="/admin-dashboard/comments-table"
        >
          <i className="bi bi-chat-left-text"></i>
          Comments
        </Link>
        <Link className="admin-sidebar-link" to="/admin-dashboard/offers-table">
          <i className="bi bi-cart"></i>
          Offers
        </Link>
        <Link
          className="admin-sidebar-link"
          to="/admin-dashboard/waiting-offers-table"
        >
          <i className="bi bi-cart"></i>
          Waiting Offers
        </Link>
        <Link
          className="admin-sidebar-link"
          to="/admin-dashboard/make-companies-table"
        >
          <i class="bi bi-car-front-fill"></i>
          Making Companies
        </Link>
      </ul>
    </div>
  );
};

export default AdminSidebar;

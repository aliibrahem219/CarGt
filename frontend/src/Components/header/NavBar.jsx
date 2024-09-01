import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = ({ toggle, setToggle }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav
      style={{
        clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
      className="navbar"
    >
      <ul className="nav-links">
        <Link
          to="/"
          onClick={() => {
            setToggle((prev) => !prev);
          }}
          className="nav-link"
        >
          <i className="bi bi-house"></i>Home
        </Link>
        <Link
          to="/posts"
          onClick={() => {
            setToggle((prev) => !prev);
          }}
          className="nav-link"
        >
          <i class="bi bi-postcard-heart-fill"></i>Posts
        </Link>
        <Link
          to="/offers"
          onClick={() => {
            setToggle((prev) => !prev);
          }}
          className="nav-link"
        >
          <i class="bi bi-cart"></i>Offers
        </Link>
        <Link
          to="/search"
          onClick={() => {
            setToggle((prev) => !prev);
          }}
          className="nav-link"
        >
          <i class="bi bi-search"></i>Search
        </Link>
        <Link
          to="/about-us"
          onClick={() => {
            setToggle((prev) => !prev);
          }}
          className="nav-link"
        >
          <i class="bi bi-info-circle"></i> About Us
        </Link>
        {user?.isAdmin && (
          <Link
            to="/admin-dashboard"
            onClick={() => {
              setToggle((prev) => !prev);
            }}
            className="nav-link"
          >
            <i className="bi bi-person-check"></i>Admin Dashboard
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

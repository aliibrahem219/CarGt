import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./createandwating.css";
const CreateAndWating = ({ link }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="create-link-container">
        {user && link === "post" && (
          <Link to={`/posts/create-${link}`} className="create-link">
            <i className="bi bi-journal-plus"></i>Create Post
          </Link>
        )}
        {user && link === "offer" && (
          <Link to={`/${link}s/create-${link}`} className="create-link">
            <i className="bi bi-journal-plus"></i>Create Offer
          </Link>
        )}
      </div>
      <div className="wating-link-container">
        {user && link === "post" && (
          <Link to={`/posts/accept-${link}s`} className="wating-link">
            <i className="bi bi-journal-plus"></i>Wating Posts
          </Link>
        )}
        {user && link === "offer" && (
          <Link to={`/${link}s/accept-${link}s`} className="wating-link">
            <i className="bi bi-cart"></i>Wating Offers
          </Link>
        )}
      </div>
    </>
  );
};

export default CreateAndWating;

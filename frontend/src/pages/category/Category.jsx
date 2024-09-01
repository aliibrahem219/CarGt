import { useParams, Link } from "react-router-dom";
import "./category.css";
import PostList from "../../Components/posts/Postlist";
import { useEffect } from "react";

import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postsApiCalls";
import { useSelector, useDispatch } from "react-redux";
const Category = () => {
  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);
  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="category">
      {postsCate.length === 0 ? (
        <>
          <h1 className="category-not-found">
            Posts with <span>{category}</span> category not found
          </h1>
          <Link className="category-not-found-link" to="/posts">
            Go to posts page
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          {<PostList posts={postsCate} />}
        </>
      )}
    </section>
  );
};

export default Category;

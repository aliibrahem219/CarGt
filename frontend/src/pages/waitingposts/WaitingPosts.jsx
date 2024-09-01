import PostList from "../../Components/posts/Postlist";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsByOwner,
  getALLPostsAdmin,
} from "../../redux/apiCalls/postsApiCalls";
import "./waitingposts.css";
const WaitingPosts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const userId = user?._id;

  useEffect(() => {
    dispatch(fetchPostsByOwner(userId));
    window.scrollTo(0, 0);
  }, [userId]);

  useEffect(() => {
    if (user?.isAdmin) {
      dispatch(getALLPostsAdmin());
      window.scrollTo(0, 0);
    }
  }, [user?.isAdmin]);

  return (
    <>
      {posts.length > 0 ? (
        <section className="wating-posts-page">
          <PostList posts={posts}></PostList>
        </section>
      ) : (
        <div className="wating-posts-notfound">
          <p>You don't have any wating posts</p>
        </div>
      )}
    </>
  );
};

export default WaitingPosts;

import "./postspage.css";
import PostList from "../../Components/posts/Postlist";
import Sidebar from "../../Components/sidebar/Sidebar";
import Pagination from "../../Components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postsApiCalls";
const POST_PER_PAGE = 3;
const PostsPage = () => {
  const dispatch = useDispatch();
  const { postsCount, posts } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount / POST_PER_PAGE);
  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage]);
  useEffect(() => {
    dispatch(getPostsCount());
  }, []);
  return (
    <>
      <section className="posts-page">
        <PostList posts={posts}></PostList>
        <Sidebar link="post"></Sidebar>
      </section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </>
  );
};

export default PostsPage;

import PostItem from "./PostItem";
import "./posts.css";
const Postlist = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((item) => (
        <PostItem post={item} key={item._id} />
      ))}
    </div>
  );
};

export default Postlist;

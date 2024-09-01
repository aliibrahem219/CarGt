import { useParams, Link, useNavigate } from "react-router-dom";
import "./post-details.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../Components/comments/AddComment.jsx";
import CommentList from "../../Components/comments/CommentList.jsx";
import swal from "sweetalert";
import UpdatePostModel from "./UpdatePostModel.jsx";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
  deletePost,
} from "../../redux/apiCalls/postsApiCalls";
const PostDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [id]);
  //Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      return toast.warning("there is no file");
    }
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };
  //Delete Post Handler
  const deletePostHandler = (e) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };
  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img
          //this condition on src allow us to see the photo in the page before we click upload
          //the native image will return when we reload the page
          src={file ? URL.createObjectURL(file) : post?.image?.url}
          alt=""
          className="post-details-image"
        />
        {post?.user?._id === user?._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            action=""
            className="update-post-image-form"
          >
            <label htmlFor="file" className="update-post-label">
              <i className="bi bi-image-fill"></i>
              Select new image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <button type="submit">upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.user?.profilePhoto?.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user?._id}`}>
              {post?.user?.username}
            </Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">{post?.description}L</p>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}
          <small>{post?.likes?.length} likes</small>
        </div>
        <div>
          {post?.user?._id === user?._id && (
            <i
              onClick={() => {
                setUpdatePost(true);
              }}
              className="bi bi-pencil-square"
            ></i>
          )}
          {(post?.user?._id === user?._id || user?.isAdmin) && (
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          )}
        </div>
      </div>

      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="post-details-info-write">
          To add comment you should login first
        </p>
      )}
      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModel post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};

export default PostDetails;

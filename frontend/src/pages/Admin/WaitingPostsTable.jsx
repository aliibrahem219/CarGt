import AdminSideBar from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import {
  acceptPost,
  getALLPostsAdmin,
} from "../../redux/apiCalls/postsApiCalls";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CreateNote from "./CreateNote";
const WaitingPostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [createnote, setCreatenote] = useState(false);
  const [owner, setOwner] = useState("");
  const [itemId, setItemid] = useState("");
  useEffect(() => {
    dispatch(getALLPostsAdmin());
  }, []);

  const AcceptPostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once Accepted, the post will view in the main page!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(acceptPost(postId));
        toast.success("The post accepted , it will be showen on the main page");
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSideBar />
      <div className="table-wrapper">
        <h1 className="table-title">Wating Posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item?.user?.porfilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">
                      {item?.user?.username}
                    </span>
                  </div>
                </td>
                <td>{item?.title}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/posts/details/${item?._id}`}>View Post</Link>
                    </button>
                    {!item?.isAccepted && (
                      <button onClick={() => AcceptPostHandler(item?._id)}>
                        Accept Post
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setCreatenote(true);
                        setOwner(item?.user?._id);
                        setItemid(item?._id);
                      }}
                    >
                      Reject Post
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {createnote && (
        <CreateNote
          setCreatenote={setCreatenote}
          ownerId={owner}
          itemId={itemId}
          itemType={"post"}
        />
      )}
    </section>
  );
};

export default WaitingPostsTable;

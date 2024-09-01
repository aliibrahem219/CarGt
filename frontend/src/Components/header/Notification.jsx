import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import { useState, useMemo, useEffect } from "react";
import { getUserProfile } from "../../redux/apiCalls/profileApiCall";
import { deleteNotification } from "../../redux/apiCalls/notificationApiCalls";
const Notification = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const [count, setCount] = useState(0);

  const [dropdown, setDropdown] = useState(false);
  const deleteNotificationHandler = (noteId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover Notification",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteNotification(noteId));
      }
    });
  };
  useMemo(() => {
    dispatch(getUserProfile(user._id));
    window.scrollTo(0, 0);
  }, [user._id]);
  useEffect(() => {
    if (count !== profile?.notifications?.length)
      setCount(profile?.notifications?.length);
  }, [profile?.notifications?.length]);
  return (
    <div className="notification">
      {user && (
        <>
          <div className="notification-info">
            <span
              onClick={() => {
                setDropdown((prev) => !prev);
              }}
              className="notification-icon"
            >
              <i class="bi bi-bell-fill"></i>
              {profile?.notifications?.length === 0 ? (
                ""
              ) : (
                <span className="count">{count}</span>
              )}
            </span>
            {dropdown && (
              <div className="notification-dropdown">
                {profile?.notifications?.length === 0 ? (
                  <div>You don't have notifications yet</div>
                ) : (
                  profile?.notifications?.map((item, index) => (
                    <div key={index} className="notification-item">
                      <Link
                        onClick={() => {
                          setDropdown(false);
                        }}
                        to={item?.link}
                      >
                        <div className="title">
                          <p>{item.title}</p>{" "}
                        </div>
                      </Link>
                      <div className="span-x">
                        <span>{new Date(item?.createdAt).toDateString()}</span>
                        <i
                          onClick={() => deleteNotificationHandler(item?._id)}
                          class="bi bi-x"
                        ></i>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;

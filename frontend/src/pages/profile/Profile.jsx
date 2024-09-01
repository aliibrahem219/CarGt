import "./profile.css";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";
import swal from "sweetalert";
import UpdateProfileModel from "./UpdateProfileModel";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";

import PostItem from "../../Components/posts/PostItem";
import OfferItem from "../../Components/offers/OfferItem";
import { Oval } from "react-loader-spinner";
import { logoutUser } from "../../redux/apiCalls/authApiCalls";
import AddEvaliation from "../../Components/evaliations/AddEvaliation";
import EvaliationList from "../../Components/evaliations/EvaliationList";
const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);

  const customer = profile?.customers?.find(
    (customer) => customer?.toString() === user?._id.toString()
  );
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    setRating(profile?.rating);
  }, [profile?.rating]);
  const navigate = useNavigate();
  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);
  const [file, setFile] = useState(null);
  const [nav, setNav] = useState(1);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [rating, setRating] = useState(0);

  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file");
    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadProfilePhoto(formData));
  };
  //Delete Account Handler
  const deleteAccountHandler = (e) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };
  if (loading) {
    <div className="profile-loader">
      <Oval
        visible={true}
        height="120"
        width="120"
        color="#000"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>;
  }
  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url}
            alt=""
            className="profile-image"
          />
          {user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <button className="upload-profile-photo-btn" type="submit">
                upload
              </button>
            </form>
          )}
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        {user?._id === profile?._id && (
          <p className="profile-bio">
            {profile?.balance} <FaCoins color={"#ffc107"} />
          </p>
        )}
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Date joined : </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        <div>
          {[1, 2, 3, 4, 5].map((star, index) => (
            <FaStar
              size={30}
              className="rating-evaliation-icon"
              color={index + 1 <= rating ? "#ffc107" : "#e4e5e9"}
            />
          ))}
        </div>
        <span className="profile-customers-num">
          {profile?.customers?.length}{" "}
          {profile?.customers?.length === 1 ? "customer" : "customers"}
        </span>
        {user?._id === profile?._id && (
          <button
            onClick={() => setUpdateProfile(true)}
            className="profile-update-btn"
          >
            <i className="bi bi-file-person-file"></i>
            Update Profile
          </button>
        )}
      </div>
      <div className="profile-nav">
        <button className="profile-nav-button" onClick={() => setNav(1)}>
          Posts
        </button>
        <button
          className="profile-nav-button"
          profile-nav-button
          onClick={() => setNav(2)}
        >
          Offers
        </button>
        <button className="profile-nav-button" onClick={() => setNav(3)}>
          Evaliation
        </button>
      </div>
      {nav === 1 && (
        <div className="profile-posts-list">
          <h2 className="profile-post-list-title">{profile?.username} Posts</h2>
          {profile?.posts?.map((post) => (
            <PostItem
              key={post?._id}
              post={post}
              username={profile?.username}
              userId={profile?._id}
            />
          ))}
        </div>
      )}
      {nav === 2 && (
        <div className="profile-posts-list">
          <h2 className="profile-post-list-title">
            {profile?.username} Offers
          </h2>
          {profile?.offers?.map((offer) => (
            <OfferItem
              key={offer?._id}
              offer={offer}
              username={profile?.username}
              userId={profile?._id}
            />
          ))}
        </div>
      )}
      {nav === 3 && (
        <div className="profile-posts-list">
          <h2 className="profile-post-list-title">
            {profile?.username} Evaliations
          </h2>
          {user ? (
            user?._id !== profile?._id ? (
              customer ? (
                <AddEvaliation profileId={profile?._id} />
              ) : (
                <p className="profile-evaliation-info-write">
                  You don't buy any offer from this saller yet
                </p>
              )
            ) : (
              <p className="profile-evaliation-info-write">
                You can't add evaliation on your account
              </p>
            )
          ) : (
            <p className="profile-evaliation-info-write">
              To add Add Evaliation you should login first
            </p>
          )}
          <EvaliationList evaliations={profile?.evaliations} />
        </div>
      )}
      {user?._id === profile?._id && (
        <button onClick={deleteAccountHandler} className="delete-profile-btn">
          Delete Your Account
        </button>
      )}
      {updateProfile && (
        <UpdateProfileModel
          profile={profile}
          setUpdateprofile={setUpdateProfile}
        />
      )}
    </section>
  );
};

export default Profile;

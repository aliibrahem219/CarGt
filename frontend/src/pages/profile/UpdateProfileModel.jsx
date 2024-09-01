import { useState } from "react";
import "./update-profile.css";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";
const UpdateProfileModel = ({ setUpdateprofile, profile }) => {
  const [username, setUsername] = useState(profile?.username);
  const [bio, setBio] = useState(profile?.bio);

  const [phoneNumber, setPhonenumber] = useState(profile?.phoneNumber);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  //const { profile } = useSelector((state) => state.profile);
  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = { username, bio, phoneNumber };
    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    dispatch(updateProfile(profile?._id, updatedUser));
    setUpdateprofile(false);
  };
  return (
    <div className="update-profile">
      <form onSubmit={formSubmitHandler} className="update-profile-form">
        <abbr title="close">
          <i
            onClick={() => {
              setUpdateprofile(false);
            }}
            className="bi bi-x-circle-fill update-profile-form-close"
          ></i>
        </abbr>
        <h1 className="update-profile-title">Update Your profile</h1>
        <input
          type="text"
          className="update-profile-input"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="User Name"
        />
        <input
          type="text"
          className="update-profile-input"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
          placeholder="Bio"
        />

        <input
          type="text"
          className="update-profile-input"
          value={phoneNumber}
          onChange={(e) => {
            setPhonenumber(e.target.value);
          }}
          placeholder="phoneNumber"
        />
        <input
          type="password"
          className="update-profile-input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <button type="submit" className="update-profile-btn">
          Update profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModel;

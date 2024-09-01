import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCalls";
import swal from "sweetalert";
const Register = () => {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState();
  const [password, setPassword] = useState("");
  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (phoneNumber.trim() === "")
      return toast.error("Phone Number is required");
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(registerUser({ username, phoneNumber, email, password }));
  };
  const navigate = useNavigate();
  if (registerMessage) {
    swal({
      title: registerMessage,
      icon: "success",
    }).then((isOk) => {
      if (isOk) {
        //go to login page
        navigate("/login");
      }
    });
  }
  return (
    <section className="form-container">
      <h1 className="form-title">Create New Account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-input"
            id="username"
            placeholder="Enter Your User Name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-input"
            id="phoneNumber"
            placeholder="Enter Your Phone Number"
            value={phoneNumber}
            onChange={(e) => {
              setphoneNumber(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="form-btn" type="submit">
          Register
        </button>
      </form>
      <div className="form-footer">
        Already have an account ? <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default Register;

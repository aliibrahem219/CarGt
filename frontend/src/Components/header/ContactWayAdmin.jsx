import { useState } from "react";
import { Link } from "react-router-dom";

import "./about-us.css";
const ContactWayAdmin = ({ setContact }) => {
  const [message, setMessage] = useState("");
  // const [amount, setAmount] = useState("");
  const onChangeFun = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div className="contact-way">
      <div className="contact-way-container">
        <abbr title="close">
          <i
            onClick={() => {
              setContact(false);
            }}
            className="bi bi-x-circle-fill contact-way-close"
          ></i>
        </abbr>
        <h1 className="contact-way-title">Choose a contact way</h1>
        <h3 className="way-title">Phone</h3>
        <div className="contact-way-phone">
          <i class="bi bi-telephone-fill"></i> 0997120744
        </div>

        <h3 className="way-title">Send Email</h3>
        <div>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChangeFun}
            placeholder="Enter Your Message "
            className="contact-way-input"
          />
          <Link
            to={`mailto:cargt503@gmail.com?subject=CarGt customer Message &body=${message}`}
            className="send-email-button"
          >
            Send Email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactWayAdmin;

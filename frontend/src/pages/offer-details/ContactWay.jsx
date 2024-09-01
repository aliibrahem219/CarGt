import { useState } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookingOffer } from "../../redux/apiCalls/offerApiCalls";
import "./contactway.css";
const ContactWay = ({ offerId, carName, email, phone, setContact }) => {
  const dispatch = useDispatch();
  const bookingOfferHandler = () => {
    swal({
      title: "Are you sure?",
      text: "you will book this offer, and you need the accept of owner",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(bookingOffer(offerId, 1));
        setContact(false);
      }
    });
  };
  const [message, setMessage] = useState("");
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
          <i class="bi bi-telephone-fill"></i> {phone}
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
            to={`mailto:${email}?subject=Buying ${carName}&body=${message}`}
            className="send-email-button"
          >
            Send Email
          </Link>
        </div>

        <button onClick={bookingOfferHandler} className="contact-way-btn">
          Book An Offer
        </button>
      </div>
    </div>
  );
};

export default ContactWay;

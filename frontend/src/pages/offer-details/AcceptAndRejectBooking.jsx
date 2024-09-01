import { useState } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookingOffer } from "../../redux/apiCalls/offerApiCalls";
import "./contactway.css";
const AcceptAndRejectBooking = ({ offer, setHaveBooking }) => {
  const dispatch = useDispatch();
  return (
    <div className="contact-way">
      <div className="contact-way-container">
        <abbr title="close">
          <i
            onClick={() => {
              setHaveBooking(false);
            }}
            className="bi bi-x-circle-fill contact-way-close"
          ></i>
        </abbr>
        <h1 className="contact-way-title">
          {`${offer?.booking?.username} want to book your offer`}
        </h1>
        <div class="accept-and-reject-btns">
          <button
            onClick={() => {
              dispatch(bookingOffer(offer?._id, 0));
              setHaveBooking(false);
            }}
            className="reject-btn"
          >
            Reject
          </button>
          <button
            onClick={() => {
              dispatch(bookingOffer(offer?._id, 2));
              setHaveBooking(false);
            }}
            className="accept-btn"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptAndRejectBooking;

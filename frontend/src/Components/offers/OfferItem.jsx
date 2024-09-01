import { Link } from "react-router-dom";
import "./offers.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toggleViewsOffer } from "../../redux/apiCalls/offerApiCalls";
const OfferItem = ({ offer, username, userId }) => {
  const dispatch = useDispatch();
  const profileLink = userId ? userId : offer?.user?._id;
  const profileUsername = username ? username : offer?.user?.username;
  const profileRating = offer?.user?.rating;
  const [photoNumber, setPhotoNumber] = useState(0);
  const photoNumberHandlerRight = () => {
    if (photoNumber === offer?.images?.length - 1) {
      setPhotoNumber(0);
    } else {
      setPhotoNumber((prev) => prev + 1);
    }
  };
  const photoNumberHandlerLeft = () => {
    if (photoNumber <= 0) {
      setPhotoNumber(offer?.images?.length);
    } else {
      setPhotoNumber((prev) => prev - 1);
    }
  };
  return (
    <div
      className={
        offer?.top === 2
          ? `offer-item top-color`
          : offer?.hightlighting === 2
          ? `offer-item highliting`
          : `offer-item`
      }
    >
      {offer?.top === 2 ? (
        <span className="top">
          <div className="top-title">TOP</div>
        </span>
      ) : (
        ""
      )}
      <div className="offer-item-image-wrapper">
        <i onClick={photoNumberHandlerLeft} class="bi bi-chevron-left"></i>
        <img
          src={offer?.images[photoNumber]?.url}
          alt=""
          className="offer-item-image"
        />
        <i onClick={photoNumberHandlerRight} class="bi bi-chevron-right"></i>
      </div>
      <div className="offer-item-info-wrapper">
        <div className="offer-item-info">
          <h2 className="offer-item-carName">{offer?.carName}</h2>
          {offer?.booking?.value === 2 && (
            <h5 className="booked-offer">
              <i class="bi bi-bookmark-check"></i> Booked offer
            </h5>
          )}
          <div className="offer-item-views">
            {offer?.views?.length}
            <i className="bi bi-eye icon"></i>
          </div>
        </div>
        <div className="offer-item-details">
          <div>
            <h4 className="offer-item-make">{offer?.make}</h4>
            <div className="offer-item-date">
              {new Date(offer.createdAt).toDateString()}
            </div>
          </div>
          <h4 className="offer-item-price">{offer?.price}</h4>
        </div>
        <p className="offer-item-description">{offer?.description}</p>
        <div className="offer-item-user-info">
          <img
            src={offer?.user?.profilePhoto?.url}
            alt=""
            className="offer-item-user-image"
          />
          <div className="offer-item-user">
            <strong className="offer-item-user-name">
              <Link to={`/profile/${profileLink}`}>{profileUsername}</Link>
            </strong>
            <div>
              {[1, 2, 3, 4, 5].map((star, index) => (
                <FaStar
                  size={15}
                  color={index + 1 <= profileRating ? "#ffc107" : "#e4e5e9"}
                />
              ))}
            </div>
          </div>
        </div>
        <Link
          onClick={() => {
            dispatch(toggleViewsOffer(offer?.id));
          }}
          className="offer-item-link"
          to={`/offers/details/${offer?._id}`}
        >
          Show More Details...
        </Link>
      </div>
    </div>
  );
};

export default OfferItem;

import { useParams, Link, useNavigate } from "react-router-dom";
import "./offer-details.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateOfferModel from "./UpdateOfferModel.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleOffer,
  updateOfferImage,
  deleteOffer,
  getOffersUserCount,
  isHighlited,
  isTop,
  bookingOffer,
} from "../../redux/apiCalls/offerApiCalls";
import ContactWay from "./ContactWay";
import AcceptAndRejectBooking from "./AcceptAndRejectBooking";
const OfferDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { offer, offersCount } = useSelector((state) => state.offer);
  const { user } = useSelector((state) => state.auth);
  const registerdUser = user ? user?._id : "";
  const { id } = useParams();
  const [files, setFiles] = useState(null);
  const [updateOffer, setUpdateOffer] = useState(false);
  const [top, setTop] = useState(offer?.top);
  const [hightlighting, setHightlighting] = useState(offer?.hightlighting);
  const [photoNumber, setPhotoNumber] = useState(0);
  const [contact, setContact] = useState(false);
  const [haveBooking, setHaveBooking] = useState(false);
  const photoNumberHandlerRight = () => {
    if (photoNumber === offer?.images.length - 1) {
      setPhotoNumber(0);
    } else {
      setPhotoNumber((prev) => prev + 1);
    }
  };
  const photoNumberHandlerLeft = () => {
    if (photoNumber <= 0) {
      setPhotoNumber(offer?.images.length);
    } else {
      setPhotoNumber((prev) => prev - 1);
    }
  };
  const userId = offer?.user?._id;
  const topAndHighlitedExp =
    (offersCount >= 3 || offer?.user?.isAdmin) &&
    userId === user?._id &&
    offer?.top === 0 &&
    offer?.hightlighting === 0;
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSingleOffer(id));
  }, [id]);

  useEffect(() => {
    if (userId === registerdUser) dispatch(getOffersUserCount(userId));
  }, [userId]);

  //Update Images Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!files) {
      return toast.warning("there is no files");
    }
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`images`, files[i]);
    }
    dispatch(updateOfferImage(formData, offer?._id));
  };
  //Delete offer Handler
  const deleteOfferHandler = (e) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover offer!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteOffer(offer?._id));
        navigate(`/profile/${registerdUser}`);
      }
    });
  };

  const handleTop = () => {
    swal({
      title: "Are you sure?",
      text: `This operation cost ${offer?.user?.isAdmin ? 0 : 100} coins!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        setTop(1);
        dispatch(isTop(offer?.id, 1));
      }
    });
  };
  const handleHightlighting = () => {
    swal({
      title: "Are you sure?",
      text: `This operation cost ${offer?.user?.isAdmin ? 0 : 100} coins!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        setHightlighting(1);
        dispatch(isHighlited(offer?.id, 1));
      }
    });
  };
  const cancelBookingHandler = () => {
    swal({
      title: "Are you sure?",
      text: `If you cancel this booking you will remove this person from your customers list`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(bookingOffer(offer?.id, 0));
      }
    });
  };
  return (
    <section className="offer-details">
      <div className="offer-details-image-wrapper">
        <div className="offer-details-image-wrapper-swapper">
          <i onClick={photoNumberHandlerLeft} class="bi bi-chevron-left"></i>
          <img
            //this condition on src allow us to see the photo in the page before we click upload
            //the native image will return when we reload the page
            src={
              files
                ? URL.createObjectURL(files[0])
                : offer?.images[photoNumber]?.url
            }
            alt=""
            className="offer-details-image"
          />
          <i onClick={photoNumberHandlerRight} class="bi bi-chevron-right"></i>
        </div>
        {userId === registerdUser && (
          <form
            onSubmit={updateImageSubmitHandler}
            action=""
            className="update-offer-image-form"
          >
            <label htmlFor="file" className="update-offer-label">
              <i className="bi bi-image-fill"></i>
              Select new images
            </label>
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setFiles(e.target.files);
                //setFile(e.target.files[0]);
              }}
              accept="image/*"
              multiple
            />
            <button type="submit">upload</button>
          </form>
        )}
      </div>
      <div className="offer-details-title">
        <h1 className="offer-details-carName">{offer?.carName}</h1>
        <h2 className="offer-details-make">{offer?.make}</h2>
      </div>
      <div className="offer-details-user-info">
        <img
          src={offer?.user?.profilePhoto?.url}
          alt=""
          className="offer-details-user-image"
        />
        <div className="offer-details-user">
          <strong>
            <Link to={`/profile/${offer?.user?._id}`}>
              {offer?.user?.username}
            </Link>
          </strong>
          <span>{new Date(offer?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="offer-details-description">{offer?.description}</p>
      <div className="offer-more-details">
        <ul className="ul-detalis-titles">
          <li>Category</li>
          <li>Color</li>
          <li>Year</li>
          <li>Distance</li>
          <li>Place City</li>
          <li>Fual Type</li>
          <li>Gear box</li>

          <li className="price-li">Price</li>
        </ul>
        <ul className="ul-detalis-info">
          <li>{offer?.category}</li>
          <li>{offer?.color}</li>
          <li>{offer?.year}</li>
          <li>{offer?.distance}</li>
          <li>{offer?.city}</li>
          <li>{offer?.fualType}</li>
          <li>{offer?.gearbox}</li>
          <li className="price-li">{offer?.price} S.P</li>
        </ul>
      </div>
      <div className="offer-more-detalils-container">
        <div className="offer-more-details">
          <ul className="ul-detalis-titles">
            <li>ABS</li>
            <li>cdPlayer</li>
            <li>electricWindows</li>
          </ul>
          <ul className="ul-detalis-info">
            <li>{offer?.ABS ? "yes" : "no"}</li>
            <li>{offer?.cdPlayer ? "yes" : "no"}</li>
            <li>{offer?.electricWindows ? "yes" : "no"}</li>
          </ul>
        </div>
        <div className="offer-more-details">
          <ul className="ul-detalis-titles">
            <li>fogLamp</li>
            <li>sunRoof</li>
            <li>centralLocking</li>
          </ul>
          <ul className="ul-detalis-info">
            <li>{offer?.fogLamp ? "yes" : "no"}</li>
            <li>{offer?.sunRoof ? "yes" : "no"}</li>
            <li>{offer?.centralLocking ? "yes" : "no"}</li>
          </ul>
        </div>
      </div>

      <div className="offer-details-buttons">
        <div className="offer-details-icon-wrapper">
          {userId === registerdUser && (
            <i
              onClick={() => {
                setUpdateOffer(true);
              }}
              className="bi bi-pencil-square"
            ></i>
          )}
          {(userId === registerdUser || user?.isAdmin) && (
            <i onClick={deleteOfferHandler} className="bi bi-trash-fill"></i>
          )}
        </div>
        {topAndHighlitedExp && (
          <div className="offer-detalils-btn-top-and-hightlighting">
            <button
              onClick={handleTop}
              type="submit"
              className="offer-detalils-btn-top"
            >
              Top
            </button>
            <button
              onClick={handleHightlighting}
              type="submit"
              className="offer-detalils-btn-hightlighting"
            >
              hightlighting
            </button>
          </div>
        )}
        {userId === registerdUser && offer?.booking?.value === 1 ? (
          <button
            className="offer-detalils-btn-contact"
            onClick={() => setHaveBooking(true)}
          >
            You have a booking
          </button>
        ) : registerdUser && userId !== registerdUser ? (
          <button
            className="offer-detalils-btn-contact"
            onClick={() => setContact(true)}
          >
            Contact
          </button>
        ) : registerdUser &&
          userId === registerdUser &&
          offer?.booking?.value === 2 ? (
          <button
            className="offer-detalils-btn-cancel-booking"
            onClick={cancelBookingHandler}
          >
            Cancel Bookig
          </button>
        ) : !registerdUser ? (
          <p className="offer-detalils-not-log-in">
            You Can Contact with the owner of this car when you logging out
          </p>
        ) : (
          ""
        )}
      </div>
      {updateOffer && (
        <UpdateOfferModel offer={offer} setUpdateOffer={setUpdateOffer} />
      )}
      {contact && (
        <ContactWay
          email={offer?.user?.email}
          carName={offer?.carName}
          phone={offer?.user?.phoneNumber}
          setContact={setContact}
          offerId={offer?._id}
        />
      )}
      {haveBooking && (
        <AcceptAndRejectBooking offer={offer} setHaveBooking={setHaveBooking} />
      )}
    </section>
  );
};

export default OfferDetails;

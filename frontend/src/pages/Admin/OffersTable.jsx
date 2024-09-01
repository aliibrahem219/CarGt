import AdminSideBar from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import {
  deleteOffer,
  acceptOffer,
  getALLOffers,
  isHighlited,
  isTop,
} from "../../redux/apiCalls/offerApiCalls";

import { useSelector, useDispatch } from "react-redux";

const OffersTable = () => {
  const dispatch = useDispatch();

  // const [highlited, setHighlited] = useState("Not Highlited");
  const { offers } = useSelector((state) => state.offer);
  useEffect(() => {
    dispatch(getALLOffers());
  }, []);
  //Delete Offer Handler
  const deleteOfferHandler = (offerId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Offer!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteOffer(offerId));
      }
    });
  };
  const AcceptOfferHandler = (offerId) => {
    swal({
      title: "Are you sure?",
      text: "Once Accepted, the offer will view in the main page!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(acceptOffer(offerId));
      }
    });
  };
  const isHighlitedHandler = (offerId, hightlighting) => {
    swal({
      title: "Are you sure?",
      text: "Once Accepted, the offer will highlited in the main page!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(isHighlited(offerId, hightlighting));
      }
    });
  };
  const isTopHandler = (offerId, top) => {
    swal({
      title: "Are you sure?",
      text: "Once Accepted, the offer will be top in the main page and once rejected the offer will be un top!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(isTop(offerId, top));
      } else {
        dispatch(isTop(offerId, 0));
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSideBar />
      <div className="table-wrapper">
        <h1 className="table-title">Offers</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Offer Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {offers?.map((item, index) => (
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
                <td>{item?.carName}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/offers/details/${item?._id}`}>
                        View Offer
                      </Link>
                    </button>
                    {!item?.isAccepted && (
                      <button onClick={() => AcceptOfferHandler(item?._id)}>
                        Accept Offer
                      </button>
                    )}
                    {item?.hightlighting === 1 || item?.hightlighting === 0 ? (
                      <button
                        className={
                          item?.hightlighting === 1 ? "wating-t-o-h" : ""
                        }
                        onClick={() => isHighlitedHandler(item?._id, 2)}
                      >
                        Highlighting
                      </button>
                    ) : (
                      <button onClick={() => isHighlitedHandler(item?._id, 0)}>
                        Un Highlighting
                      </button>
                    )}
                    {item?.top === 1 || item?.top === 0 ? (
                      <button
                        className={item?.top === 1 ? "wating-t-o-h" : ""}
                        onClick={() => isTopHandler(item?._id, 2)}
                      >
                        Top
                      </button>
                    ) : (
                      <button onClick={() => isTopHandler(item?._id, 0)}>
                        Un Top
                      </button>
                    )}
                    <button onClick={() => deleteOfferHandler(item?._id)}>
                      Delete Offer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OffersTable;

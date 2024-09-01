import AdminSideBar from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import {
  acceptOffer,
  getALLOffersAdmin,
} from "../../redux/apiCalls/offerApiCalls";
import { createNotification } from "../../redux/apiCalls/notificationApiCalls";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CreateNote from "./CreateNote";
const WaitingOffersTable = () => {
  const dispatch = useDispatch();
  const { offers } = useSelector((state) => state.offer);
  const [createnote, setCreatenote] = useState(false);
  const [owner, setOwner] = useState("");
  const [itemId, setItemid] = useState("");
  useEffect(() => {
    dispatch(getALLOffersAdmin());
  }, []);

  const AcceptOfferHandler = (offerId, ownerId) => {
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
  return (
    <section className="table-container">
      <AdminSideBar />
      <div className="table-wrapper">
        <h1 className="table-title">Wating Offers</h1>
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
                      <button
                        onClick={() =>
                          AcceptOfferHandler(item?._id, item?.user?._id)
                        }
                      >
                        Accept Offer
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setCreatenote(true);
                        setOwner(item?.user?._id);
                        setItemid(item?._id);
                      }}
                    >
                      Reject Offer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {createnote && (
        <CreateNote
          setCreatenote={setCreatenote}
          ownerId={owner}
          itemId={itemId}
          itemType={"offer"}
        />
      )}
    </section>
  );
};

export default WaitingOffersTable;

import OfferList from "../../Components/offers/OfferList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOffersByOwner,
  getALLOffersAdmin,
} from "../../redux/apiCalls/offerApiCalls";
import "./waitingoffers.css";
const WaitingOffers = () => {
  const dispatch = useDispatch();
  const { offers } = useSelector((state) => state.offer);
  const { user } = useSelector((state) => state.auth);

  const userId = user?._id;

  useEffect(() => {
    dispatch(fetchOffersByOwner(userId));
    window.scrollTo(0, 0);
  }, [userId]);

  useEffect(() => {
    if (user?.isAdmin) {
      dispatch(getALLOffersAdmin());
      window.scrollTo(0, 0);
    }
  }, [user?.isAdmin]);

  return (
    <>
      {offers.length > 0 ? (
        <section className="waiting-offers-page">
          <OfferList offers={offers}></OfferList>
        </section>
      ) : (
        <div className="waiting-offers-notfound">
          <p>You don't have any wating offers</p>
        </div>
      )}
    </>
  );
};

export default WaitingOffers;

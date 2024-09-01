import "./offerspage.css";
import OfferList from "../../Components/offers/OfferList";
import SidebarOffers from "../../Components/sidebar/SidebarOffers";
import Pagination from "../../Components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOffers,
  getOffersCount,
} from "../../redux/apiCalls/offerApiCalls";

const OFFER_PER_PAGE = 4;
const OffersPage = () => {
  const dispatch = useDispatch();
  const { offersCount, offers } = useSelector((state) => state.offer);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(offersCount / OFFER_PER_PAGE);
  useEffect(() => {
    dispatch(fetchOffers(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage]);
  useEffect(() => {
    dispatch(getOffersCount());
  }, []);
  return (
    <>
      <section className="offers-page">
        <OfferList offers={offers}></OfferList>
        <SidebarOffers link="offer"></SidebarOffers>
      </section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </>
  );
};

export default OffersPage;

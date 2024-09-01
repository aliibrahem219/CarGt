import { useParams, Link } from "react-router-dom";
import "./makingCompany.css";
import Offerlist from "../../Components/offers/OfferList";
import { useEffect } from "react";

import { fetchOffersBasedOnMakingCompany } from "../../redux/apiCalls/offerApiCalls";
import { useSelector, useDispatch } from "react-redux";
const MakingCompany = () => {
  const dispatch = useDispatch();
  const { offersMaking } = useSelector((state) => state.offer);
  const { makingCompany } = useParams();

  useEffect(() => {
    dispatch(fetchOffersBasedOnMakingCompany(makingCompany));
    window.scrollTo(0, 0);
  }, [makingCompany]);

  return (
    <section className="making-company">
      {offersMaking?.length === 0 ? (
        <>
          <h1 className="making-company-not-found">
            We don't have any cars that Making Company is{" "}
            <span>{offersMaking}</span>
            now
          </h1>
          <Link className="making-company-not-found-link" to="/offers">
            Go to offers page
          </Link>
        </>
      ) : (
        <>
          <h1 className="making-company-title">
            Offers based on {makingCompany}
          </h1>
          {<Offerlist offers={offersMaking} />}
        </>
      )}
    </section>
  );
};

export default MakingCompany;

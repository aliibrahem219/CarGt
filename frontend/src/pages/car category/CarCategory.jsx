import { useParams, Link } from "react-router-dom";
import "./category.css";
import Offerlist from "../../Components/offers/OfferList";
import { useMemo } from "react";

import { fetchOffersBasedOnCategory } from "../../redux/apiCalls/offerApiCalls";
import { useSelector, useDispatch } from "react-redux";
const CarCategory = () => {
  const dispatch = useDispatch();
  const { offersCate } = useSelector((state) => state.offer);
  const { category } = useParams();
  useMemo(() => {
    dispatch(fetchOffersBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="category">
      {offersCate.length === 0 ? (
        <>
          <h1 className="category-not-found">
            We don't have any cars that category is <span>{category}</span> now
          </h1>
          <Link className="category-not-found-link" to="/offers">
            Go to offers page
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-title">Offers based on {category}</h1>
          {<Offerlist offers={offersCate} />}
        </>
      )}
    </section>
  );
};

export default CarCategory;

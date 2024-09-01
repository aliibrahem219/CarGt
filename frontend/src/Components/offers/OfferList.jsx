import OfferItem from "./OfferItem";
import "./offers.css";
const Offerlist = ({ offers }) => {
  return (
    <div className="offer-list">
      {offers.map((item, index) => (
        <OfferItem offer={item} key={index} />
      ))}
    </div>
  );
};

export default Offerlist;

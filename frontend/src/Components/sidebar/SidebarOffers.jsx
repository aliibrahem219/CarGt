import { Link } from "react-router-dom";
import "./sidebar.css";
import { fetchCarsCategories } from "../../redux/apiCalls/carsCategoriesApiCalls";
import { fetchMakeCompanies } from "../../redux/apiCalls/makeCompaniesApiCall";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CreateAndWating from "../createandwating/CreateAndWating";
const SidebarOffers = ({ link }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { carsCategories } = useSelector((state) => state.carsCategory);
  const { makeCompanies } = useSelector((state) => state.makeCompany);
  useEffect(() => {
    dispatch(fetchCarsCategories());
  }, []);
  useEffect(() => {
    dispatch(fetchMakeCompanies());
  }, []);
  return (
    <div className="sidebar">
      {user && <CreateAndWating link={link} />}
      <h5 className="sidebar-title">CATEGORIES</h5>
      <ul className="sidebar-links">
        {carsCategories?.map((category) => (
          <Link
            className="sidebar-link"
            key={category?._id}
            to={`/offers/categories/${category?.title}`}
          >
            {category?.title}
          </Link>
        ))}
      </ul>
      <h5 className="sidebar-title">COMPANIES</h5>
      <ul className="sidebar-links">
        {makeCompanies?.map((company) => (
          <Link
            className="sidebar-link"
            key={company._id}
            to={`/offers/companies/${company?.title}`}
          >
            {company?.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SidebarOffers;

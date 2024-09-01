import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OfferList from "../../Components/offers/OfferList";
import {
  fetchOffersSearch,
  fetchOffers,
} from "../../redux/apiCalls/offerApiCalls";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import Pagination from "../../Components/pagination/Pagination";
import { fetchCarsCategories } from "../../redux/apiCalls/carsCategoriesApiCalls";
import { fetchMakeCompanies } from "../../redux/apiCalls/makeCompaniesApiCall";
import "./search.css";
export default function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { offers, loading } = useSelector((state) => state.offer);

  const { carsCategories } = useSelector((state) => state.carsCategory);
  const { makeCompanies } = useSelector((state) => state.makeCompany);
  const [sidebardata, setSidebardata] = useState({
    carName: "",
    category: "",
    gearbox: "all-gear",
    fualType: "all-fual",
    make: "",
    year: "",
    color: "",
    city: "",
    distance: 0,
    price_from: "",
    price_to: "",
    ABS: false,
    cdPlayer: false,
    electricWindows: false,
    fogLamp: false,
    sunRoof: false,
    centralLocking: false,
  });
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  useEffect(() => {
    dispatch(fetchCarsCategories());
  }, []);
  useEffect(() => {
    dispatch(fetchMakeCompanies());
  }, []);
  const handleChange = (e) => {
    if (
      e.target.id === "gear" ||
      e.target.id === "automatic" ||
      e.target.id === "all-gear"
    ) {
      setSidebardata({ ...sidebardata, gearbox: e.target.id });
    }
    if (
      e.target.id === "gasoline" ||
      e.target.id === "diesel" ||
      e.target.id === "all-fual"
    ) {
      setSidebardata({ ...sidebardata, fualType: e.target.id });
    }
    if (e.target.id === "carName") {
      setSidebardata({ ...sidebardata, carName: e.target.value });
    }
    if (e.target.id === "category") {
      setSidebardata({ ...sidebardata, category: e.target.value });
    }
    if (e.target.id === "make") {
      const make = e.target.value;
      setSidebardata({
        ...sidebardata,
        make,
      });
    }
    if (e.target.id === "year") {
      const year = e.target.value;

      setSidebardata({
        ...sidebardata,
        year,
      });
    }
    if (e.target.id === "distance") {
      const distance = e.target.value;

      setSidebardata({
        ...sidebardata,
        distance,
      });
    }
    if (e.target.id === "color") {
      const color = e.target.value;
      setSidebardata({
        ...sidebardata,
        color,
      });
    }
    if (e.target.id === "city") {
      const city = e.target.value;
      setSidebardata({
        ...sidebardata,
        city,
      });
    }
    if (e.target.id === "ABS") {
      const ABS = e.target.value;
      setSidebardata({
        ...sidebardata,
        ABS,
      });
    }
    if (e.target.id === "cdPlayer") {
      const cdPlayer = e.target.value;
      setSidebardata({
        ...sidebardata,
        cdPlayer,
      });
    }
    if (e.target.id === "electricWindows") {
      const electricWindows = e.target.value;
      setSidebardata({
        ...sidebardata,
        electricWindows,
      });
    }

    if (e.target.id === "fogLamp") {
      const fogLamp = e.target.value;
      setSidebardata({
        ...sidebardata,
        fogLamp,
      });
    }
    if (e.target.id === "sunRoof") {
      const sunRoof = e.target.value;
      setSidebardata({
        ...sidebardata,
        sunRoof,
      });
    }
    if (e.target.id === "centralLocking") {
      const centralLocking = e.target.value;
      setSidebardata({
        ...sidebardata,
        centralLocking,
      });
    }
    if (e.target.id === "price_from") {
      const price_from = e.target.value;
      setSidebardata({
        ...sidebardata,
        price_from,
      });
    }
    if (e.target.id === "price_to") {
      const price_to = e.target.value;
      setSidebardata({
        ...sidebardata,
        price_to,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("carName", sidebardata.carName);
    urlParams.set("category", sidebardata.category);
    urlParams.set("gearbox", sidebardata.gearbox);
    urlParams.set("fualType", sidebardata.fualType);
    urlParams.set("make", sidebardata.make);
    urlParams.set("year", sidebardata.year);
    urlParams.set("color", sidebardata.color);
    urlParams.set("city", sidebardata.city);
    urlParams.set("distance", sidebardata.distance);
    urlParams.set("ABS", sidebardata.ABS);
    urlParams.set("cdPlayer", sidebardata.cdPlayer);
    urlParams.set("electricWindows", sidebardata.electricWindows);
    urlParams.set("fogLamp", sidebardata.fogLamp);
    urlParams.set("sunRoof", sidebardata.sunRoof);
    urlParams.set("centralLocking", sidebardata.centralLocking);
    urlParams.set("price_from", sidebardata.price_from);
    urlParams.set("price_to", sidebardata.price_to);

    const searchQuery = urlParams.toString();

    dispatch(fetchOffersSearch(searchQuery));
    navigate(`/search?${searchQuery}`);
  };
  const OFFER_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(offers?.length / OFFER_PER_PAGE);
  useEffect(() => {
    dispatch(fetchOffers(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="search-container">
      <div className="search-part">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="searchTerm-div">
            <label className="search-label">Search by carName : </label>
            <input
              type="text"
              id="carName"
              placeholder="Car Name ..."
              className="searchTerm-input"
              onChange={handleChange}
            ></input>
          </div>

          <div className="searchTerm-div">
            <label className="search-label">Category :</label>
            <select
              onChange={handleChange}
              id="category"
              className="select-search"
              defaultValue={""}
              value={sidebardata.category}
            >
              <option value="">All</option>
              {carsCategories?.map((category) => (
                <option key={category?._id} value={category?.title}>
                  {category?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="searchTerm-div">
            <label className="search-label">Gearbox :</label>
            <div className="checkbok-div">
              <input
                type="checkbox"
                id="all-gear"
                className="checkbox-element"
                onChange={handleChange}
                checked={sidebardata.gearbox === "all-gear"}
              />
              <span>Gear & Automaic</span>
            </div>
            <div className="checkbok-div">
              <input
                type="checkbox"
                id="automatic"
                className="checkbox-element"
                onChange={handleChange}
                checked={sidebardata.gearbox === "automatic"}
              />
              <span>Automaic</span>
            </div>
            <div className="checkbok-div">
              <input
                type="checkbox"
                id="gear"
                className="checkbox-element"
                onChange={handleChange}
                checked={sidebardata.gearbox === "gear"}
              />
              <span>Gear</span>
            </div>
          </div>
          <div className="searchTerm-div">
            <label className="search-label">Fuel type :</label>
            <div className="checkbok-div">
              <input
                type="checkbox"
                id="all-fual"
                className="checkbox-element"
                onChange={handleChange}
                checked={sidebardata.fualType === "all-fual"}
              />
              <span>Gasoline & Diesel</span>
            </div>
            <div className="checkbok-div">
              <input
                type="checkbox"
                id="gasoline"
                className="checkbox-element"
                onChange={handleChange}
                checked={sidebardata.fualType === "gasoline"}
              />
              <span>Gasoline</span>
            </div>
            <div className="checkbok-div">
              <input
                type="checkbox"
                id="diesel"
                className="checkbox-element"
                onChange={handleChange}
                checked={sidebardata.fualType === "diesel"}
              />
              <span>Diesel</span>
            </div>
          </div>
          <div className="searchTerm-div">
            <label className="search-label">Make :</label>
            <select
              onChange={handleChange}
              id="make"
              className="select-search"
              defaultValue={""}
              value={sidebardata.make}
            >
              <option value="">All</option>
              {makeCompanies?.map((company) => (
                <option key={company?._id} value={company?.title}>
                  {company?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="searchTerm-div">
            <label className="search-label">Year :</label>
            <select
              onChange={handleChange}
              id="year"
              className="select-search"
              defaultValue={""}
              value={sidebardata.year}
            >
              <option value="">All</option>
              {Array.from(
                { length: 2024 - 1990 + 1 },
                (_, index) => 1990 + index
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="searchTerm-div">
            <label className="search-label">Color :</label>
            <input
              type="text"
              id="color"
              placeholder="color ..."
              className="searchTerm-input"
              onChange={handleChange}
            ></input>
          </div>
          {/*    <div className="searchTerm-div">
            <label className="search-label">Mileage up to :</label>
            <input
              type="Number"
              id="distance"
              placeholder="Max distance is ..."
              className="searchTerm-input"
              onChange={handleChange}
            ></input>
          </div>*/}
          <div className="searchTerm-div">
            <label className="search-label">Price From :</label>
            <input
              type="Number"
              min={20000000}
              id="price_from"
              placeholder="Price from ..."
              className="searchTerm-input"
              onChange={handleChange}
            ></input>
            {/* <label className="search-label">To:</label>
            <input
              type="Number"
              min={20000000}
              id="price_to"
              placeholder="Price to ..."
              className="searchTerm-input"
              onChange={handleChange}
            ></input>*/}
          </div>
          <div className="searchTerm-div">
            <label className="search-label">Place City :</label>
            <select
              onChange={handleChange}
              id="city"
              className="select-search"
              defaultValue={""}
              value={sidebardata.city}
            >
              <option value={""}>All</option>
              <option value={"Lattakia"}>Lattakia</option>
              <option value={"Damascus"}>Damascus</option>
              <option value={"Homs"}>Homs</option>
              <option value={"Aleppo"}>Aleppo</option>
              <option value={"Hama"}>Hama</option>
              <option value={"Turtos"}>Turtos</option>
              <option value={"Idlib"}>Idlib</option>
              <option value={"Darra"}>Darra</option>
              <option value={"Alsweidaa"}>Alsweidaa</option>
              <option value={"Alqenitra"}>Alqenitra</option>
              <option value={"Rif-Dimashq"}>Rif-Dimashq</option>
              <option value={"Deer-Alzour"}>Deer-Alzour</option>
              <option value={"Alraqa"}>Alraqa</option>
              <option value={"Al-Hasakah"}>Al-Hasakah</option>
            </select>
          </div>
          {/*</div> <div className="more-details-div">
            <label className="more-details-label">More Features:</label>
            <div className="checkbok-div">
              <input
                type="checkbox"
                id="ABS"
                className="checkbox-element"
                onChange={handleChange}
                value={sidebardata.ABS}
              />
              <span>ABS</span>
            </div>
            <div className="checkbok-div">
              <input
                type="checkbox"
                id="cdPlayer"
                className="checkbox-element"
                onChange={handleChange}
                value={sidebardata.cdPlayer}
              />
              <span>Cd Player</span>
            </div>
            <div className="checkbok-div">
              <input
                type="checkbox"
                id="electricWindows"
                className="checkbox-element"
                onChange={handleChange}
                value={sidebardata.electricWindows}
              />
              <span>Electric Windows</span>
            </div>
            <div className="checkbok-div">
              <input
                type="checkbox"
                id="fogLamp"
                className="checkbox-element"
                onChange={handleChange}
                value={sidebardata.fogLamp}
              />
              <span>Fog Lamp</span>
            </div>
            <div className="checkbok-div">
              <input
                type="checkbox"
                id="sunRoof"
                className="checkbox-element"
                onChange={handleChange}
                value={sidebardata.sunRoof}
              />
              <span>Sun Roof</span>
            </div>
            <div className="checkbok-div">
              <input
                type="checkbox"
                id="centralLocking"
                className="checkbox-element"
                onChange={handleChange}
                value={sidebardata.centralLocking}
              />
              <span>Central Locking</span>
            </div>
          </div>*/}

          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>
      <div className="offers-results-continer">
        <h1 className="offers-result-title">Offers results</h1>
        <div className="offers-results">
          {loading && <p className="loading-offers">Loading ...</p>}
          {!loading && offers && <OfferList offers={offers}></OfferList>}
        </div>
        {offers?.length === 0 && (
          <p className="not-found-offers"> No offer Found</p>
        )}
        {offers?.length > 0 && (
          <Pagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></Pagination>
        )}
      </div>
    </div>
  );
}

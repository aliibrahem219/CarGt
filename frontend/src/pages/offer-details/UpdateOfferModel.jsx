import { useState, useEffect } from "react";
import "./update-offer.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateOffer } from "../../redux/apiCalls/offerApiCalls";
import { fetchCarsCategories } from "../../redux/apiCalls/carsCategoriesApiCalls";
import { fetchMakeCompanies } from "../../redux/apiCalls/makeCompaniesApiCall";

import { RotatingLines } from "react-loader-spinner";

const UpdateOfferModel = ({ offer, setUpdateOffer }) => {
  const dispatch = useDispatch();

  const { carsCategories } = useSelector((state) => state.carsCategory);
  const { makeCompanies } = useSelector((state) => state.makeCompany);
  const { loading } = useSelector((state) => state.offer);
  const [description, setDescription] = useState(offer?.description);
  const [category, setCategory] = useState(offer?.category);
  const [carName, setcarName] = useState(offer?.carName);
  const [make, setMake] = useState(offer?.make);
  const [color, setColor] = useState(offer?.color);
  const [distance, setDistance] = useState(offer?.distance);
  const [year, setYear] = useState(offer?.year);
  const [city, setCity] = useState(offer?.city);
  const [fualType, setFualType] = useState(offer?.fualType);
  const [gearbox, setGearbox] = useState(offer?.gearbox);
  const [ABS, setABS] = useState(offer?.ABS);
  const [cdPlayer, setcdPlayer] = useState(offer?.cdPlayer);
  const [electricWindows, setElectricWindows] = useState(
    offer?.electricWindows
  );
  const [fogLamp, setFogLamp] = useState(offer?.fogLamp);
  const [sunRoof, setSunRoof] = useState(offer?.sunRoof);
  const [centralLocking, setCentralLocking] = useState(offer?.centralLocking);
  const [price, setPrice] = useState(offer?.price);

  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (carName.trim() === "") return toast.error("Car Name is required");
    if (make.trim() === "")
      return toast.error("Offer company make is required");
    if (category.trim() === "")
      return toast.error("Offer category is required");
    if (description.trim() === "")
      return toast.error("Offer description is required");
    if (color.trim() === "") return toast.error("Offer color is required");
    if (distance === "") return toast.error("Offer distance is required");
    if (year === "") return toast.error("Offer year is required");
    if (fualType.trim() === "") return toast.error("Car fual type is required");
    if (gearbox.trim() === "") return toast.error("Gearbox car is required");
    if (price === "") return toast.error("Car price is required");
    if (city.trim() === "") return toast.error("Offer City is required");

    dispatch(
      updateOffer(
        {
          carName,
          make,
          category,
          description,
          color,
          distance,
          year,
          fualType,
          gearbox,
          price,
          city,
          ABS,
          electricWindows,
          fogLamp,
          cdPlayer,
          sunRoof,
          centralLocking,
        },
        offer?._id
      )
    );
    setUpdateOffer(false);
  };

  useEffect(() => {
    dispatch(fetchCarsCategories());
  }, []);
  useEffect(() => {
    dispatch(fetchMakeCompanies());
  }, []);
  return (
    <div className="update-offer">
      <form onSubmit={formSubmitHandler} className="update-offer-form">
        <abbr title="close">
          <i
            onClick={() => {
              setUpdateOffer(false);
            }}
            className="bi bi-x-circle-fill update-offer-form-close"
          ></i>
        </abbr>
        <h1 className="update-offer-title">Update Offer</h1>
        <div className="update-offer-container">
          <div>
            <input
              type="text"
              placeholder="Car Name"
              className="update-offer-input"
              value={carName}
              onChange={(e) => {
                setcarName(e.target.value);
              }}
            />
            <select
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
              }}
              className="update-offer-input"
            >
              <option disabled value="">
                Select Offer Make Company
              </option>

              {makeCompanies?.map((company) => (
                <option key={company?._id} value={company?.title}>
                  {company?.title}
                </option>
              ))}
            </select>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="update-offer-input"
            >
              <option disabled value="">
                Select Offer Category
              </option>
              {carsCategories?.map((category) => (
                <option key={category?._id} value={category?.title}>
                  {category?.title}
                </option>
              ))}
            </select>
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              className="update-offer-input"
            >
              <option disabled value="">
                Select Offer Place City
              </option>
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
            <select
              value={fualType}
              onChange={(e) => {
                setFualType(e.target.value);
              }}
              className="update-offer-input"
            >
              <option disabled value="">
                Select Car Fual Type
              </option>
              <option value={"gasoline"}>Gasoline</option>
              <option value={"diesel"}>Diesel</option>
            </select>
            <select
              value={gearbox}
              onChange={(e) => {
                setGearbox(e.target.value);
              }}
              className="update-offer-input"
            >
              <option disabled value="">
                Select Car Gearbox
              </option>
              <option value={"gear"}>Gear</option>
              <option value={"automatic"}>Automatic</option>
            </select>
            <textarea
              className="update-offer-textarea"
              rows="5"
              placeholder="offer description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div>
            <input
              type="text"
              placeholder="Offer color"
              className="update-offer-input"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="Car year make"
              className="update-offer-input"
              value={year}
              min={1990}
              max={2024}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="Car maoving distance"
              className="update-offer-input"
              value={distance}
              onChange={(e) => {
                setDistance(e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="Car price by syrian bound"
              className="update-offer-input"
              value={price}
              min={20000000}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <label className="more-details-label">More Features:</label>
            <div className="more-details-div">
              <div className="checkbok-div">
                <input
                  type="checkbox"
                  id="ABS"
                  className="checkbox-element"
                  onChange={(e) => {
                    setABS(!ABS);
                  }}
                  value={ABS}
                  checked={ABS === true}
                />
                <span>ABS</span>
              </div>
              <div className="checkbok-div">
                <input
                  type="checkbox"
                  id="cdPlayer"
                  className="checkbox-element"
                  onChange={(e) => {
                    setcdPlayer(!cdPlayer);
                  }}
                  value={cdPlayer}
                  checked={cdPlayer === true}
                />
                <span>Cd Player</span>
              </div>
              <div className="checkbok-div">
                <input
                  type="checkbox"
                  id="electricWindows"
                  className="checkbox-element"
                  onChange={(e) => {
                    setElectricWindows(!electricWindows);
                  }}
                  value={electricWindows}
                  checked={electricWindows === true}
                />
                <span>Electric Windows</span>
              </div>
              <div className="checkbok-div">
                <input
                  type="checkbox"
                  id="fogLamp"
                  className="checkbox-element"
                  onChange={(e) => {
                    setFogLamp(!fogLamp);
                  }}
                  checked={fogLamp === true}
                  value={fogLamp}
                />
                <span>Fog Lamp</span>
              </div>
              <div className="checkbok-div">
                <input
                  type="checkbox"
                  id="sunRoof"
                  className="checkbox-element"
                  onChange={(e) => {
                    setSunRoof(!sunRoof);
                  }}
                  value={sunRoof}
                  checked={sunRoof === true}
                />
                <span>Sun Roof</span>
              </div>
              <div className="checkbok-div">
                <input
                  type="checkbox"
                  id="centralLocking"
                  className="checkbox-element"
                  onChange={(e) => {
                    setCentralLocking(!centralLocking);
                  }}
                  value={centralLocking}
                  checked={centralLocking === true}
                />
                <span>Central Locking</span>
              </div>
            </div>
            <button type="submit" className="update-offer-btn">
              {loading ? (
                <RotatingLines
                  visible={true}
                  height="40"
                  width="40"
                  color="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateOfferModel;

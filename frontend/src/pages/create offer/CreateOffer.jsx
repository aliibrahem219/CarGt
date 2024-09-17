import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOffer } from "../../redux/apiCalls/offerApiCalls";
import swal from "sweetalert";
import "./create-offer.css";
import { fetchCarsCategories } from "../../redux/apiCalls/carsCategoriesApiCalls";
import { fetchMakeCompanies } from "../../redux/apiCalls/makeCompaniesApiCall";
import { RotatingLines } from "react-loader-spinner";
const CreateOffer = () => {
  const dispatch = useDispatch();
  const { loading, isOfferCreated } = useSelector((state) => state.offer);
  const { user } = useSelector((state) => state.auth);
  const { carsCategories } = useSelector((state) => state.carsCategory);
  const { makeCompanies } = useSelector((state) => state.makeCompany);
  const [carName, setcarName] = useState("");
  const [make, setMake] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [distance, setDistance] = useState("");
  const [year, setYear] = useState("");
  const [city, setCity] = useState("");
  const [fualType, setFualType] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [ABS, setABS] = useState(false);
  const [cdPlayer, setcdPlayer] = useState(false);
  const [electricWindows, setElectricWindows] = useState(false);
  const [fogLamp, setFogLamp] = useState(false);
  const [sunRoof, setSunRoof] = useState(false);
  const [centralLocking, setCentralLocking] = useState(false);
  const [price, setPrice] = useState("");

  const [files, setFiles] = useState([]);

  //Form Submit Handler
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
    if (distance.trim() === "")
      return toast.error("Offer distance is required");
    if (year.trim() === "") return toast.error("Offer year is required");
    if (fualType.trim() === "") return toast.error("Car fual type is required");
    if (gearbox.trim() === "") return toast.error("Gearbox car is required");
    if (price.trim() === "") return toast.error("Car price is required");
    if (city.trim() === "") return toast.error("Offer City is required");
    if (!files) return toast.error("Offer file is required");

    //we need to send this form to sever as a form data because we have an image so it isn't a normal form
    const formData = new FormData();
    //image is the name of the file on the server
    //append add data to formdata as key=>value
    for (let i = 0; i < files.length; i++) {
      formData.append(`images`, files[i]);
    }
    //formData.append(`image`, file);
    formData.append("carName", carName);
    formData.append("make", make);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("distance", distance);
    formData.append("color", color);
    formData.append("year", year);
    formData.append("city", city);
    formData.append("fualType", fualType);
    formData.append("ABS", ABS);
    formData.append("cdPlayer", cdPlayer);
    formData.append("electricWindows", electricWindows);
    formData.append("fogLamp", fogLamp);
    formData.append("sunRoof", sunRoof);
    formData.append("centralLocking", centralLocking);
    formData.append("gearbox", gearbox);
    formData.append("price", price);

    // send form data to server
    swal({
      title: "Are you sure?",
      text: `This operation cost ${user?.isAdmin ? 0 : 200} coins!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(createOffer(formData));
      }
    });
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isOfferCreated) {
      navigate("/");
    }
  }, [isOfferCreated, navigate]);
  useEffect(() => {
    dispatch(fetchCarsCategories());
  }, []);
  useEffect(() => {
    dispatch(fetchMakeCompanies());
  }, []);
  return (
    <section className="create-offer">
      <h1 className="create-offer-title">Create New offer</h1>
      <form onSubmit={formSubmitHandler} className="create-offer-form">
        <input
          type="text"
          placeholder="Car Name"
          className="create-offer-input"
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
          className="create-offer-input"
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
          className="create-offer-input"
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
          className="create-offer-input"
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
          className="create-offer-input"
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
          className="create-offer-input"
        >
          <option disabled value="">
            Select Car Gearbox
          </option>
          <option value={"gear"}>Gear</option>
          <option value={"automatic"}>Automatic</option>
        </select>
        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
          className="create-offer-input"
        >
          <option disabled value="">
            Select Car Year Make
          </option>
          {Array.from(
            { length: 2024 - 1990 + 1 },
            (_, index) => 1990 + index
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <textarea
          className="create-offer-textarea"
          rows="5"
          placeholder="offer description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <input
          type="text"
          placeholder="Offer color"
          className="create-offer-input"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />

        <input
          type="number"
          placeholder="Car maoving distance"
          className="create-offer-input"
          value={distance}
          onChange={(e) => {
            setDistance(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Car price by syrian bound"
          className="create-offer-input"
          value={price}
          min={20000000}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <div className="more-details-div">
          <label className="more-details-label">More Features:</label>
          <div className="checkbok-div">
            <input
              type="checkbox"
              id="ABS"
              className="checkbox-element"
              onChange={(e) => {
                setABS(!ABS);
              }}
              value={ABS}
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
            />
            <span>Central Locking</span>
          </div>
        </div>
        <label htmlFor="file" className="create-offer-label">
          <i className="bi bi-image-fill"></i>
          Please Select images
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          name="file"
          id="file"
          className="create-offer-upload"
          onChange={(e) => {
            setFiles(e.target.files);
          }}
          accept="image/*"
          multiple
        />
        <button type="submit" className="create-offer-btn">
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
            "Create"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreateOffer;

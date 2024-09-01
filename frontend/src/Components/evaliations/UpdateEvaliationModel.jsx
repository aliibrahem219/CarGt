import { useState } from "react";
import "./update-evaliation.css";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateEvaliation } from "../../redux/apiCalls/evaliationApiCalls";
const UpdateEvaliationModel = ({
  setUpdateEvaliation,
  evaliationForUpdate,
}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(evaliationForUpdate?.text);
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(null);
  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (text.trim() === "") return toast.error("Please write something");

    dispatch(updateEvaliation(evaliationForUpdate?._id, { text, rating }));
    setUpdateEvaliation(false);
  };
  return (
    <div className="update-evaliation">
      <form onSubmit={formSubmitHandler} className="update-evaliation-form">
        <abbr title="close">
          <i
            onClick={() => {
              setUpdateEvaliation(false);
            }}
            className="bi bi-x-circle-fill update-evaliation-form-close"
          ></i>
        </abbr>
        <h1 className="update-evaliation-title">Edit Evaliation</h1>
        <div>
          {[1, 2, 3, 4, 5].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input
                  key={index}
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                  style={{ display: "none" }}
                />
                <FaStar
                  size={30}
                  className="rating-evaliation-icon"
                  color={
                    currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        <input
          type="text"
          className="update-evaliation-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <button type="submit" className="update-evaliation-btn">
          Edit Evaliation
        </button>
      </form>
    </div>
  );
};

export default UpdateEvaliationModel;

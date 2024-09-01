import "./add-evaliation.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { createEvaliation } from "../../redux/apiCalls/evaliationApiCalls";
const AddEvaliation = ({ profileId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(null);
  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      return toast.error("Please write something");
    }
    if (rating > 1 && text.trim() === "")
      return toast.error("Please write your opinion");
    dispatch(createEvaliation({ text, rating, profileId }));
    setText("");
    setHover(null);
    setRating(1);
  };
  return (
    <form onSubmit={formSubmitHandler} className="add-evaliation">
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
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <input
        type="text"
        placeholder="Please write your opinion ..."
        className="add-evaliation-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button type="submit" className="add-evaliation-btn">
        evaliation
      </button>
    </form>
  );
};

export default AddEvaliation;

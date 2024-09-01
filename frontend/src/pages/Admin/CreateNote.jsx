import { toast } from "react-toastify";
import { useState } from "react";
import { createNotification } from "../../redux/apiCalls/notificationApiCalls";
import { useDispatch } from "react-redux";
import "./createnote.css";
const CreateNote = ({ setCreatenote, itemId, ownerId, itemType }) => {
  const dispatch = useDispatch();
  const [resion, setResion] = useState("");
  //Form Submit Handler
  const formSubmitHandler = (e) => {
    if (resion.trim() === "") return toast.error("resion is required");
    dispatch(
      createNotification({
        title: resion + " , please update it",
        link: `/${itemType}s/details/${itemId}`,
        userId: ownerId,
      })
    );
    setCreatenote(false);
  };
  return (
    <div className="create-note">
      <form onSubmit={formSubmitHandler} className="create-note-form-group">
        <abbr title="close">
          <i
            onClick={() => {
              setCreatenote(false);
            }}
            className="bi bi-x-circle-fill create-note-form-close"
          ></i>
        </abbr>
        <h6 className="create-note-title">Create Notification</h6>

        <input
          type="text"
          id="title"
          placeholder="Enter the resion "
          value={resion}
          onChange={(e) => {
            setResion(e.target.value);
          }}
        />

        <button className="create-note-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNote;

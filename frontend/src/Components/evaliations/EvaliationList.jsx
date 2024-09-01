import { useState } from "react";
import "./evaliation-list.css";
import swal from "sweetalert";

import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { deleteEvaliation } from "../../redux/apiCalls/evaliationApiCalls";
import { FaStar } from "react-icons/fa";
import UpdateEvaliationModel from "./UpdateEvaliationModel";
const EvaliationList = ({ evaliations }) => {
  const dispatch = useDispatch();
  const [updateEvaliation, setUpdateEvaliation] = useState(false);
  const [evaliationForUpdate, setEvalationForUpdate] = useState(null);
  const { user } = useSelector((state) => state.auth);
  //Update Evaliation Handler
  const updateEvaliationHandler = (evaliation) => {
    setEvalationForUpdate(evaliation);
    setUpdateEvaliation(true);
  };
  //Delete Evaliation Handler
  const deleteEvaliationHandler = (evaliationId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover Evalution",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteEvaliation(evaliationId));
      }
    });
  };
  return (
    <div className="evaliation-list">
      <h4 className="evaliation-list-count">
        {evaliations?.length} evaliations
      </h4>
      {evaliations?.map((evaliation) => (
        <div key={evaliation?._id} className="evaliation-item">
          <div className="evaliation-item-info">
            <div className="evaliation-item-username">
              {evaliation?.username}
            </div>
            <div className="evaliation-item-time">
              <Moment fromNow ago>
                {evaliation?.createdAt}
              </Moment>{" "}
              ago
            </div>
          </div>
          <p className="evaliation-item-text">{evaliation?.text}</p>
          <div className="evaliation-rating">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <FaStar
                key={index}
                size={30}
                className="rating-evaliation-icon"
                color={evaliation?.rating >= index + 1 ? "#ffc107" : "#e4e5e9"}
              />
            ))}
          </div>
          {user?._id === evaliation?.user && (
            <div className="evaliation-item-icon-wrapper">
              <i
                onClick={() => {
                  updateEvaliationHandler(evaliation);
                }}
                className="bi bi-pencil-square"
              ></i>
              <i
                onClick={() => {
                  deleteEvaliationHandler(evaliation?._id);
                }}
                className="bi bi-trash-fill"
              ></i>
            </div>
          )}
        </div>
      ))}
      {updateEvaliation && (
        <UpdateEvaliationModel
          evaliationForUpdate={evaliationForUpdate}
          setUpdateEvaliation={setUpdateEvaliation}
        />
      )}
    </div>
  );
};

export default EvaliationList;

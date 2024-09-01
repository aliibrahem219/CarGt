import AdminSideBar from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import {
  getAllUsersProfile,
  deleteProfile,
} from "../../redux/apiCalls/profileApiCall";
import ChargeBalance from "./ChargeBalance";
import { useSelector, useDispatch } from "react-redux";
const UsersTable = () => {
  const dispatch = useDispatch();
  const [chargeBalance, setChargeBalance] = useState(false);
  const [userId, setUserId] = useState(null);

  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, [isProfileDeleted]);
  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, [chargeBalance]);
  //Delete User Handler
  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(userId));
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSideBar />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item?.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item?.username}</span>
                  </div>
                </td>
                <td>{item?.email}</td>
                <td>{item?.balance}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${item?._id}`}>View Profile</Link>
                    </button>
                    <button
                      onClick={() => {
                        setChargeBalance(true);
                        setUserId(item?._id);
                      }}
                    >
                      Charge balance
                    </button>

                    <button onClick={() => deleteUserHandler(item?._id)}>
                      Delete User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {chargeBalance && (
          <ChargeBalance userId={userId} setChargeBalance={setChargeBalance} />
        )}
      </div>
    </section>
  );
};

export default UsersTable;

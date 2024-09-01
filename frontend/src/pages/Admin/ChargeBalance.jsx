import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { chargeProfileBalance } from "../../redux/apiCalls/profileApiCall";
import "./chargebalance.css";
const ChargeBalance = ({ setChargeBalance, userId }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  //Form Submit Handler
  console.log(userId);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (amount < 0) return toast.error("Amount should be positive number");
    dispatch(chargeProfileBalance(userId, { amount }));
    setChargeBalance(false);
    setAmount(0);
  };
  return (
    <div className="charge-balance">
      <form className="charge-balance-form" onSubmit={formSubmitHandler}>
        <abbr title="close">
          <i
            onClick={() => {
              setChargeBalance(false);
            }}
            className="bi bi-x-circle-fill charge-balance-form-close"
          ></i>
        </abbr>

        <h1 className="charge-balance-title">Charge Balance</h1>
        <input
          className="charge-balance-input"
          type="Number"
          id="amount"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button type="submit" className="charge-balance-btn">
          Charge
        </button>
      </form>
    </div>
  );
};

export default ChargeBalance;

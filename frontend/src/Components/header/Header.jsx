import { useState } from "react";
import "./header.css";
import HeaderLeft from "./HeaderLeft";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import HeaderRight from "./HaiderRight";
import Notification from "./Notification";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);
  const [ntoggle, setNtoggle] = useState(false);
  return (
    <header className="header">
      <HeaderLeft toggle={toggle} setToggle={setToggle}></HeaderLeft>
      <NavBar toggle={toggle} setToggle={setToggle}></NavBar>
      <div className="header-notAndRight">
        {user && <Notification ntoggle={ntoggle} setNtoggle={setNtoggle} />}
        <HeaderRight></HeaderRight>
      </div>
    </header>
  );
};
export default Header;

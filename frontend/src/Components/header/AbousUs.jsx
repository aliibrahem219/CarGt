import React, { useState } from "react";
import "./about-us.css";
import ContactWayAdmin from "./ContactWayAdmin";
const AbousUs = () => {
  const [contact, setContact] = useState(false);
  return (
    <div>
      <ul className="about-us-ul">
        <li className="about-us-li">
          CarGt is a website that help you to buy and sell cars in easy way .
        </li>
        <li className="about-us-li">
          You can create an account and you should verify it by your email .
        </li>
        <li className="about-us-li">
          After you log in you be able to create posts and offers and you should
          wating the admin accept it .
        </li>
        <li className="about-us-li">
          if your offer or post has rejected we will tell you the reasion using
          notification and you can recreate it .
        </li>
        <li className="about-us-li">
          Create offer will cost you 200 coins and you can charge coins by
          contacting with admin .
        </li>
        <li className="about-us-li">
          You can create a comment on the post and you can like it .
        </li>
        <li className="about-us-li">
          After you create 3 offers you can make your offer top offer or
          highliting offer .
        </li>
        <li className="about-us-li">
          Top and highliting will cost 100 coins and you can use one of them on
          single offer .
        </li>
        <li className="about-us-li">
          You can contant with offer owner by click contact button and choose
          one of conatct ways .
        </li>
        <li className="about-us-li">
          If you want to buy the offer you can click booking button and wating
          the accepting of the owner .
        </li>
        <li className="about-us-li">
          After you booking one offer you become one of the owner customers and
          you can add evaliation on his profile .
        </li>
        <li className="about-us-li">
          If you have any problem or you want to charge balance you can contact
          with carGt admin from here{"  "}
          <span onClick={() => setContact(true)}>Contact</span>
        </li>
      </ul>
      {contact && <ContactWayAdmin setContact={setContact} />}
    </div>
  );
};

export default AbousUs;

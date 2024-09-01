import "./home.css";

import { Link } from "react-router-dom";
import Card from "../../Components/card/Card";
const Home = () => {
  return (
    <section className="home">
      <div className="home-container">
        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcome To CarGt</h1>
        </div>
        <div className="home-cards">
          <Link to={`/posts`}>
            <Card title="Posts" />
          </Link>
          <Link to={`/offers`}>
            <Card title="Offers" />
          </Link>
          <Link to={`/search`}>
            <Card title="Search" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;

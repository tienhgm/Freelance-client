import "./index.scss";
import { Card } from "antd";
import { url } from "inspector";
import { Link } from "react-router-dom";

const { Meta } = Card;
export default function FeatureCity() {
  return (
    <div className="city">
      <div className="title">Featured Cities</div>
      <div className="grid h-auto grid-cols-4 gap-4 mt-12 px-36">
        <Link
          to="/"
          className="city__box"
          style={{
            backgroundImage: `url("https://www.vasterad.com/themes/hireo/images/featured-city-04.jpg")`,
          }}
        >
          <div className="total">
            <div className="total__location">Can Tho</div>
            <div className="total__job">456 jobs</div>
          </div>
        </Link>
        <Link
          to="/"
          className="city__box"
          style={{
            backgroundImage: `url("https://www.vasterad.com/themes/hireo/images/featured-city-03.jpg")`,
          }}
        >
          <div className="total">
            <div className="total__location">TP Ho Chi Minh</div>
            <div className="total__job">689 jobs</div>
          </div>
        </Link>
        <Link
          to="/"
          className="city__box"
          style={{
            backgroundImage: `url("https://www.vasterad.com/themes/hireo/images/featured-city-01.jpg")`,
          }}
        >
          <div className="total">
            <div className="total__location">Ha Noi</div>
            <div className="total__job">852 jobs</div>
          </div>
        </Link>
        <Link
          to="/"
          className="city__box"
          style={{
            backgroundImage: `url("https://www.vasterad.com/themes/hireo/images/featured-city-02.jpg")`,
          }}
        >
          <div className="total">
            <div className="total__location">Da Nang</div>
            <div className="total__job">123 jobs</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
// https://www.vasterad.com/themes/hireo/images/featured-city-04.jpg
import "./widget.scss";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { request } from "../../axios_Helper.js";
import { useSpring, animated } from "react-spring";

const Widget = ({ type }) => {
  const [data, setData] = useState({ title: "", link: "", url: "", count: 0 });

  const getCount = async (collectionName) => {
    request("GET", `http://localhost:8090/api/v1/${collectionName}/count`, {})
      .then((response) => {
        setData((prevData) => ({
          ...prevData,
          count: response.data,
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      let result = { title: "UNKNOWN", link: "", url: "", count: 0 };

      switch (type) {
        case "driver":
          result = {
            title: "DRIVERS",
            link: "See all drivers",
            url: "http://localhost:3001/drivers",
          };
          result.count = await getCount("drivers");
          break;
        case "student":
          result = {
            title: "STUDENTS",
            link: "View all students",
            url: "http://localhost:3001/students",
          };
          result.count = await getCount("students");
          break;
        case "bus":
          result = {
            title: "BUSES",
            link: "View all buses",
            url: "http://localhost:3001/buses",
          };
          result.count = await getCount("buses");
          break;
        case "announcement":
          result = {
            title: "ANNOUNCEMENTS",
            link: "View all announcements",
            url: "http://localhost:3001/announcements",
          };
          result.count = await getCount("announcements");
          break;
        default:
          break;
      }

      setData(result);
    };

    fetchData();
  }, [type]);

  const counterAnimation = useSpring({
    from: { number: 0 },
    to: { number: data.count },
    config: { duration: 1000 },
  });

  return (
    <div className="widget">
      <div className="card">
        <span className="title">{data.title}</span>
        <animated.span className="counter">
          {counterAnimation.number.to((n) => Math.floor(n))}
        </animated.span>
        <Link to={data.url} className="link">
          {data.link}
        </Link>
      </div>
    </div>
  );
};

export default Widget;

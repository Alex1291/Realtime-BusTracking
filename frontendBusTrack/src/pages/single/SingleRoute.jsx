import { useState, useEffect } from "react";
import "./singleRoute.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { formFields } from "../../data";
import { useParams } from "react-router-dom";
import { request } from "../../axios_Helper.js";

const SingleRoute = (props) => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    request("GET", `http://localhost:8090/api/v1/${props.slug}/${id}`, {})
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, props.slug]);

  let title = "Route #" + id,
    fields = formFields.find((item) => item.slug === "routes").listItems;

  return (
    <div className="singleRoute">
      <Sidebar />
      <div className="singleRouteContainer">
        <Navbar />
        <div className="singleRouteContent">
          <div className="top">
            <h2>{title}</h2>
            <div className="link">
              <Link to={"/" + props.slug} className="backLink">
                Back
              </Link>

              <Link
                to={"/" + props.slug + "/" + id + "/edit"}
                className="editLink"
              >
                Edit
              </Link>
            </div>
          </div>
          <form className="user-form">
            <div className="form-middle">
              {fields.map((field) => (
                <div
                  className={`form-group ${field.className || ""}`}
                  key={field.name}
                >
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={data?.[field.name] || ""}
                    readOnly
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleRoute;

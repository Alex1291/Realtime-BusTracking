import { useState, useEffect } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { formFields } from "../../data";
import { useParams } from "react-router-dom";
import { request } from "../../axios_Helper.js";

const Single = (props) => {
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

  let title, fields;

  switch (props.slug) {
    case "students":
      title = "Student #" + id;
      fields = formFields.find((item) => item.slug === "students").listItems;
      break;
    case "staffs":
      title = "Staff #" + id;
      fields = formFields.find((item) => item.slug === "staffs").listItems;
      break;
    case "drivers":
      title = "Driver #" + id;
      fields = formFields.find((item) => item.slug === "drivers").listItems;
      break;
    case "buses":
      title = "Bus #" + id;
      fields = formFields.find((item) => item.slug === "buses").listItems;
      break;
    case "announcements":
      title = "Announcement #" + id;
      fields = formFields.find(
        (item) => item.slug === "announcements"
      ).listItems;
      break;
    case "schedules":
      title = "Schedule #" + id;
      fields = formFields.find((item) => item.slug === "schedules").listItems;
      break;
    default:
  }
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="singleContent">
          <div className="top">
            <h2>{title}</h2>
            <div className="link">
              <Link to={"/" + props.slug} className="backLink">
                Back
              </Link>

              {props.slug !== "announcements" && (
                <Link
                  to={"/" + props.slug + "/" + id + "/edit"}
                  className="editLink"
                >
                  Edit
                </Link>
              )}
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
                    value={
                      field.type === "date"
                        ? data?.[field.name]?.split("/").reverse().join("-") ||
                          ""
                        : data?.[field.name] || ""
                    }
                    readOnly
                  />
                </div>
              ))}

              {data?.scheduleRepeat === "Yes" && (
                <>
                  <div className="form-group">
                    <label>Schedule Running Start Date</label>
                    <input
                      type="date"
                      name="scheduleDurationStart"
                      placeholder="Select Start Date"
                      value={data.scheduleDurationStart || ""}
                      required
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label>Schedule Running End Date</label>
                    <input
                      type="date"
                      name="scheduleDurationEnd"
                      placeholder="Select End Date"
                      value={data.scheduleDurationEnd || ""}
                      required
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label>Days of the Week</label>
                    <div className="checkboxs">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <label key={day}>
                          <input
                            type="checkbox"
                            name="schedule_days"
                            value={day}
                            checked={data.schedule_days
                              ?.split(",")
                              .includes(day)}
                            disabled
                          />
                          {day}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {data?.scheduleRepeat === "No" && (
                <div className="form-group">
                  <label>Schedule Running Start Date</label>
                  <input
                    type="date"
                    name="scheduleDurationStart"
                    value={data.scheduleDurationStart || ""}
                    placeholder="Select Start Date"
                    required
                    readOnly
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Single;

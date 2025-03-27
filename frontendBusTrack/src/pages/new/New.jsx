import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./new.scss";
import { formFields } from "../../data.js";
import useUnsavedChangesWarning from "../../components/hook/useUnsavedChangesWarning";
import Modal from "../../components/modal/Modal.jsx";
import { useContext } from "react";
import { FormDirtyContext } from "../../components/context/FormDirtyContext";
import { useNavigate } from "react-router-dom";
import { request } from "../../axios_Helper.js";

const New = (props) => {
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [existingSchedules, setExistingSchedules] = useState([]);
  const alertShown = useRef(false);

  const navigate = useNavigate();
  const { isFormDirty, setIsFormDirty } = useContext(FormDirtyContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const { open, setOpen, nextPath, handleNavigation } =
    useUnsavedChangesWarning(isFormDirty);

  useEffect(() => {
    if (props.slug !== "schedules") return;

    const fetchData = async () => {
      try {
        const driverResponse = await request(
          "GET",
          "http://localhost:8090/api/v1/drivers",
          {}
        );
        const busResponse = await request(
          "GET",
          "http://localhost:8090/api/v1/buses",
          {}
        );
        const routeResponse = await request(
          "GET",
          "http://localhost:8090/api/v1/routes",
          {}
        );
        const scheduleResponse = await request(
          "GET",
          "http://localhost:8090/api/v1/schedules",
          {}
        );

        const filteredRoutes = routeResponse.data.filter(
          (route) =>
            Array.isArray(route.route_stops) && route.route_stops.length > 0
        );

        setExistingSchedules(scheduleResponse.data);
        setDrivers(driverResponse.data);
        setBuses(busResponse.data);
        setRoutes(filteredRoutes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.slug]);

  let title, fields;

  switch (props.slug) {
    case "students":
      title = "Add New Student";
      fields = formFields.find((item) => item.slug === "students").listItems;
      break;
    case "staffs":
      title = "Add New Staff";
      fields = formFields.find((item) => item.slug === "staffs").listItems;
      break;
    case "drivers":
      title = "Add New Driver";
      fields = formFields.find((item) => item.slug === "drivers").listItems;
      break;
    case "buses":
      title = "Add New Bus";
      fields = formFields.find((item) => item.slug === "buses").listItems;
      break;
    case "announcements":
      title = "Add New Announcement";
      fields = formFields.find(
        (item) => item.slug === "announcements"
      ).listItems;
      break;
    case "schedules":
      title = "Add New Schedule";
      fields = formFields.find((item) => item.slug === "schedules").listItems;
      break;
    default:
  }

  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  useEffect(() => {
    setIsFormDirty(
      !!Object.values(formData).some((value, key) =>
        key === "schedule_days" ? value.length > 0 : value !== ""
      )
    );

    alertShown.current = false;
  }, [formData, setIsFormDirty]);

  const checkEmailExists = async (email) => {
    try {
      const response = await request(
        "GET",
        `http://localhost:8090/api/v1/${props.slug}/${email}`,
        {}
      );
      return response.data;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    setFormData((prevFormData) => {
      const selectedDays = prevFormData[name]
        ? prevFormData[name].split(",").filter(Boolean)
        : [];

      const updatedDays = checked
        ? [...selectedDays, value]
        : selectedDays.filter((day) => day !== value);

      return {
        ...prevFormData,
        [name]: updatedDays.join(","),
      };
    });
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };

      // Reset fields if scheduleRepeat is "No"
      if (
        props.slug === "schedules" &&
        name === "scheduleRepeat" &&
        value === "No"
      ) {
        updatedFormData = {
          ...updatedFormData,
          schedule_days: "",
          scheduleDurationStart: "",
          scheduleDurationEnd: "",
        };
      }

      return updatedFormData;
    });
  };

  // ✅ useEffect to validate scheduleDurationEnd > scheduleDurationStart
  useEffect(() => {
    if (formData.scheduleDurationStart && formData.scheduleDurationEnd) {
      const startDate = new Date(formData.scheduleDurationStart);
      const endDate = new Date(formData.scheduleDurationEnd);

      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);

      if (endDate <= startDate) {
        if (!alertShown.current) {
          alert("End date must be later than start date.");
          alertShown.current = true;
        }

        setFormData((prev) => ({ ...prev, scheduleDurationEnd: "" }));
      }
    }
  }, [formData.scheduleDurationStart, formData.scheduleDurationEnd]);

  // ✅ Validate selected days when all fields are updated
  useEffect(() => {
    if (
      formData.schedule_days &&
      formData.scheduleDurationStart &&
      formData.scheduleDurationEnd
    ) {
      const validDays = checkIfDayExists(
        new Date(formData.scheduleDurationStart),
        new Date(formData.scheduleDurationEnd),
        formData.schedule_days.split(",")
      );

      console.log("Valid Days Found:", validDays);

      if (!validDays) {
        alert("Selected day does not appear within the given date range.");
        setFormData((prevFormData) => ({
          ...prevFormData,
          schedule_days: "",
        }));
      }
    }
  }, [
    formData.schedule_days,
    formData.scheduleDurationStart,
    formData.scheduleDurationEnd,
  ]);

  // ✅ Function to check if selected days exist in the date range
  const checkIfDayExists = (startDate, endDate, selectedDays) => {
    const dayMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const selectedDayIndexes = selectedDays.map((day) => dayMap[day]);

    let currentDate = new Date(startDate);
    const foundDays = new Set();

    while (currentDate <= endDate) {
      const currentDayIndex = currentDate.getDay();

      if (selectedDayIndexes.includes(currentDayIndex)) {
        foundDays.add(currentDayIndex);
      }

      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    const allDaysFound = selectedDayIndexes.every((day) => foundDays.has(day));

    if (allDaysFound) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedFormData = { ...formData };

    if (formData.student_email) {
      try {
        const emailExists = await checkEmailExists(formData.student_email);

        if (emailExists) {
          alert("Please fix errors before submitting. \nEmail already exists.");
          return;
        }
      } catch (error) {
        alert("Error checking email. Please try again.");
        return;
      }
    }

    if (props.slug === "announcements") {
      const currentDate = new Date();
      updatedFormData = {
        ...updatedFormData,
        announcement_date: currentDate.toISOString().split("T")[0],
        announcement_time: currentDate.toLocaleTimeString("en-US", {
          hour12: false,
        }),
        staff_email: user.email,
      };
    }

    if (props.slug === "schedules") {
      const selectedRoute = routes.find(
        (route) => route.id === formData.schedule_route
      );
      if (!selectedRoute) {
        alert("Invalid route selection.");
        return;
      }

      console.log("Selected Route:", selectedRoute);

      const newStart = new Date(`1970-01-01T${formData.schedule_time}`);
      const newEnd = new Date(
        newStart.getTime() + selectedRoute.route_duration * 60000
      );
      const newScheduleDays = formData.schedule_days || [];

      const newStartDate = new Date(formData.scheduleDurationStart);
      const newEndDate = new Date(formData.scheduleDurationEnd);

      console.log("New Schedule Details:", {
        newStart,
        newEnd,
        newStartDate,
        newEndDate,
        newScheduleDays,
      });

      const conflicts = existingSchedules.filter((schedule) => {
        if (schedule.schedule_name === formData.schedule_name) return false;

        const isExistingRepeating = schedule.scheduleRepeat === "Yes";
        const existingScheduleDays = isExistingRepeating
          ? schedule.schedule_days || []
          : [];

        const existingStartDate = new Date(schedule.scheduleDurationStart);
        const existingEndDate = schedule.scheduleDurationEnd
          ? new Date(schedule.scheduleDurationEnd)
          : existingStartDate;

        console.log("Checking against existing schedule:", {
          schedule,
          existingStartDate,
          existingEndDate,
          isExistingRepeating,
          existingScheduleDays,
        });

        const scheduleRoute = routes.find(
          (r) => r.id === schedule.schedule_route
        );
        if (!scheduleRoute) return false;

        // 🚀 Case 1: Both schedules are non-repeating -> Check exact date
        if (!isExistingRepeating && formData.scheduleRepeat === "No") {
          console.log("Case 1: Both are non-repeating");
          if (existingStartDate.getTime() !== newStartDate.getTime())
            return false;
        }

        // 🚀 Case 2: One is repeating, one is non-repeating -> Ensure overlapping day
        if (!isExistingRepeating && formData.scheduleRepeat === "Yes") {
          console.log("Case 2: Existing is non-repeating, New is repeating");
          const existingScheduleDay = existingStartDate.toLocaleDateString(
            "en-US",
            {
              weekday: "long",
            }
          );
          if (!newScheduleDays.includes(existingScheduleDay)) return false;
        }

        if (isExistingRepeating && formData.scheduleRepeat === "No") {
          console.log("Case 2: Existing is repeating, New is non-repeating");
          const newScheduleDay = newStartDate.toLocaleDateString("en-US", {
            weekday: "long",
          });
          if (!existingScheduleDays.includes(newScheduleDay)) return false;
        }

        console.log("Checking repeating schedules:", {
          isExistingRepeating,
          newScheduleRepeat: formData.scheduleRepeat,
        });

        // 🚀 Case 3: Both schedules are repeating -> Ensure common days & overlapping duration
        if (isExistingRepeating && formData.scheduleRepeat === "Yes") {
          console.log("✅ Entered repeating schedule check");

          const newScheduleDays =
            typeof formData.schedule_days === "string"
              ? formData.schedule_days.split(",").map((day) => day.trim()) // Convert to array
              : Array.isArray(formData.schedule_days)
              ? formData.schedule_days
              : [];

          const existingScheduleDays =
            typeof schedule.schedule_days === "string"
              ? schedule.schedule_days.split(",").map((day) => day.trim()) // Convert to array
              : Array.isArray(schedule.schedule_days)
              ? schedule.schedule_days
              : [];

          console.log("Existing Schedule Days:", existingScheduleDays);
          console.log("New Schedule Days:", newScheduleDays);

          const hasCommonDays = newScheduleDays.some((day) =>
            existingScheduleDays.includes(day)
          );

          console.log("Has common days:", hasCommonDays);

          if (!hasCommonDays) {
            console.log("⛔ No common days, skipping");
            return false;
          }

          console.log("New Start Date:", newStartDate);
          console.log("New End Date:", newEndDate);
          console.log("Existing Start Date:", existingStartDate);
          console.log("Existing End Date:", existingEndDate);

          if (
            newEndDate < existingStartDate ||
            newStartDate > existingEndDate
          ) {
            console.log("⛔ No overlapping duration, skipping");
            return false;
          }

          console.log("✅ Conflict detected (Repeating schedules overlap)");
        }

        const scheduleStart = new Date(`1970-01-01T${schedule.schedule_time}`);
        const scheduleEnd = new Date(
          scheduleStart.getTime() + scheduleRoute.route_duration * 60000
        );

        console.log("Existing Schedule Time Range:", {
          scheduleStart,
          scheduleEnd,
        });

        // ✅ Final Conflict Check: Overlapping time and same bus/driver
        const hasConflict =
          (schedule.schedule_driver === formData.schedule_driver ||
            schedule.schedule_bus === formData.schedule_bus) &&
          newStart < scheduleEnd &&
          newEnd > scheduleStart;

        if (hasConflict) {
          console.log("⚠️ Conflict detected:", {
            newSchedule: { newStart, newEnd },
            existingSchedule: { scheduleStart, scheduleEnd },
            busDriverMatch:
              schedule.schedule_driver === formData.schedule_driver ||
              schedule.schedule_bus === formData.schedule_bus,
          });
        }

        return hasConflict; // 🚀 Keep checking all schedules
      });

      // ❌ If at least one conflict exists, block scheduling
      if (conflicts.length > 0) {
        alert(
          "Conflict detected! Driver or Bus is already scheduled on an overlapping route."
        );
        return;
      }

      console.log("✅ No conflict! Proceeding with the new schedule.");

      updatedFormData = {
        ...updatedFormData,
        schedule_days: Array.isArray(formData.schedule_days)
          ? formData.schedule_days.join(", ")
          : String(formData.schedule_days || ""),
      };
    }

    try {
      await request(
        "POST",
        `http://localhost:8090/api/v1/${props.slug}`,
        updatedFormData
      );
      alert("Data created successfully!");
      setIsFormDirty(false);
      navigate(`/${props.slug}`);
    } catch (error) {
      alert("Failed to create new data. Please try again.");
      console.error("Submit error:", error);
    }

    console.log("Form Submitted:", updatedFormData);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="newContent">
          <div className="top">
            <h2>{title}</h2>
            <div className="link">
              <div
                onClick={() => handleNavigation(`/${props.slug}`)}
                className="backLink"
              >
                Back
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-middle">
              {fields.map((field) => (
                <div
                  className={`form-group ${field.className || ""}`}
                  key={field.name}
                >
                  <label>{field.label}</label>

                  {field.name === "student_phone" ||
                  field.name === "bus_capacity" ? (
                    <input
                      type="tel"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      pattern="[0-9]+"
                      title="Please enter only numbers"
                    />
                  ) : field.type === "checkbox-group" ? (
                    <div className="checkboxs">
                      {field.options.map((day) => (
                        <label key={day}>
                          <input
                            type="checkbox"
                            name={field.name}
                            value={day}
                            checked={formData[field.name]?.includes(day)}
                            onChange={handleCheckboxChange}
                          />
                          {day}
                        </label>
                      ))}
                    </div>
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                      {(field.name === "schedule_driver"
                        ? drivers
                        : field.name === "schedule_bus"
                        ? buses
                        : field.name === "schedule_route"
                        ? routes
                        : field.options || []
                      ).map((option) =>
                        typeof option === "object" ? (
                          <option key={option.id} value={option.id}>
                            {option.id}
                          </option>
                        ) : (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                    />
                  )}
                </div>
              ))}

              {formData.scheduleRepeat === "Yes" && (
                <>
                  <div className="form-group">
                    <label>Schedule Running Start Date</label>
                    <input
                      type="date"
                      name="scheduleDurationStart"
                      placeholder="Select Start Date"
                      value={formData.scheduleDurationStart || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Schedule Running End Date</label>
                    <input
                      type="date"
                      name="scheduleDurationEnd"
                      placeholder="Select End Date"
                      value={formData.scheduleDurationEnd || ""}
                      onChange={handleChange}
                      required
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
                            checked={formData.schedule_days?.includes(day)}
                            onChange={handleCheckboxChange}
                          />
                          {day}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {formData.scheduleRepeat === "No" && (
                <div className="form-group">
                  <label>Schedule Running Start Date</label>
                  <input
                    type="date"
                    name="scheduleDurationStart"
                    placeholder="Select Start Date"
                    value={formData.scheduleDurationStart || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </div>

            <div className="form-footer">
              <button type="submit" className="submit-btn">
                <img src="/media/upload.svg" className="icon" alt="" />
                PUBLISH NOW
              </button>
            </div>
          </form>
        </div>
      </div>

      {open && (
        <Modal setOpen={setOpen} type="unsavedChanged" nextPath={nextPath} />
      )}
    </div>
  );
};

export default New;

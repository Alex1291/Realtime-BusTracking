import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./newRoute.scss";
import { formFields } from "../../data.js";
import useUnsavedChangesWarning from "../../components/hook/useUnsavedChangesWarning";
import Modal from "../../components/modal/Modal.jsx";
import { useContext } from "react";
import { FormDirtyContext } from "../../components/context/FormDirtyContext";
import { useNavigate } from "react-router-dom";
import { request } from "../../axios_Helper.js";

const NewRoute = (props) => {
  const navigate = useNavigate();
  const { isFormDirty, setIsFormDirty } = useContext(FormDirtyContext);

  const { open, setOpen, nextPath, handleNavigation } =
    useUnsavedChangesWarning(isFormDirty);

  let title = "Add New Route",
    fields = formFields.find((item) => item.slug === "routes").listItems;

  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  useEffect(() => {
    setIsFormDirty(
      !!Object.values(formData).some((value, key) => value !== "")
    );
  }, [formData, setIsFormDirty]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };

      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedFormData = { ...formData };

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
    <div className="newRoute">
      <Sidebar />
      <div className="newRouteContainer">
        <Navbar />
        <div className="newRouteContent">
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

                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
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

export default NewRoute;

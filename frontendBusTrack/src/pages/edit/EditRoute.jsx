import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { formFieldsEdit } from "../../data.js";
import { useParams } from "react-router-dom";
import useUnsavedChangesWarning from "../../components/hook/useUnsavedChangesWarning";
import Modal from "../../components/modal/Modal.jsx";
import { useContext } from "react";
import { FormDirtyContext } from "../../components/context/FormDirtyContext";
import { useNavigate } from "react-router-dom";
import { request } from "../../axios_Helper.js";
import "./editRoute.scss";

const EditRoute = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  let title = "Edit Route #" + id,
    fields = formFieldsEdit.find((item) => item.slug === "routes").listItems;

  const { isFormDirty, setIsFormDirty } = useContext(FormDirtyContext);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  useEffect(() => {
    request("GET", `http://localhost:8090/api/v1/${props.slug}/${id}`, {})
      .then((response) => {
        setData(response.data);
        setFormData(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, props.slug]);

  const { open, setOpen, nextPath, handleNavigation } =
    useUnsavedChangesWarning(isFormDirty);

  useEffect(() => {
    const isDirty = Object.entries(formData).some(([key, value]) => {
      return data && data[key] !== value;
    });

    setIsFormDirty(isDirty);
  }, [data, formData, setIsFormDirty]);

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
        "PUT",
        `http://localhost:8090/api/v1/${props.slug}/${id}/edit`,
        updatedFormData
      );

      alert("Data updated successfully!");
      setIsFormDirty(false);
      navigate(`/${props.slug}`);
    } catch (error) {
      alert("Failed to update. Please try again.");
      console.error(error);
    }

    console.log("Form Updated:", updatedFormData);
  };

  return (
    <div className="editRoute">
      <Sidebar />
      <div className="editRouteContainer">
        <Navbar />
        <div className="editRouteContent">
          <div className="top">
            <h2>{title}</h2>
            <div className="link">
              <div
                onClick={() => handleNavigation(`/${props.slug}/${id}`)}
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

export default EditRoute;

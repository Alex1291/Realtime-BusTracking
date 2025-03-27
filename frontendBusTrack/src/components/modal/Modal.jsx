import "./modal.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FormDirtyContext } from "../context/FormDirtyContext";

const Modal = ({ setOpen, type, nextPath, action, message }) => {
  let title, description, button, actions;
  let navigate = useNavigate();

  const { setIsFormDirty } = useContext(FormDirtyContext);

  const handleDelete = (e) => {
    e.preventDefault();

    action();

    setOpen(false);
  };

  switch (type) {
    case "delete":
      title = "Confirm Deletion";
      description = "Are you sure you want to delete this item?";
      button = ["Delete", "Cancel"];
      actions = [handleDelete];
      break;
    case "info":
      title = "Additional Info";
      description = message;
      button = ["Confirm"];
      actions = [handleDelete];
      break;
    case "unsavedChanged":
      title = "Warning";
      description = "Are you sure you want to leave? Your data will be lost.";
      button = ["Yes, Leave", "Cancel"];
      break;
    default:
      break;
  }

  return (
    <div className="modal-overlay" onClick={() => setOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>{title}</h1>
        <p>
          {description.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div className="buttons">
          {type === "delete" && (
            <>
              <button className="cancel" onClick={() => setOpen(false)}>
                {button[1]}
              </button>
              <button className="confirm" onClick={actions[0]}>
                {button[0]}
              </button>
            </>
          )}

          {type === "info" && (
            <button className="confirm" onClick={() => setOpen(false)}>
              {button[0]}
            </button>
          )}

          {type === "unsavedChanged" && (
            <>
              <button
                className="confirm"
                onClick={() => {
                  setOpen(false);
                  navigate(nextPath);
                  setIsFormDirty(false);
                }}
              >
                {button[0]}
              </button>
              <button className="cancel" onClick={() => setOpen(false)}>
                {button[1]}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

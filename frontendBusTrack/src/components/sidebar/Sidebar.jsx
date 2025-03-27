import "./sidebar.scss";
import { menu } from "../../data.js";
import useUnsavedChangesWarning from "../../components/hook/useUnsavedChangesWarning";
import Modal from "../modal/Modal";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormDirtyContext } from "../context/FormDirtyContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isFormDirty } = useContext(FormDirtyContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user.isAdmin === "Yes";

  const { open, setOpen, nextPath, handleNavigation } =
    useUnsavedChangesWarning(isFormDirty);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    navigate("/login", { replace: true });

    alert("Logged out!");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span
          className={`logo ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => handleNavigation("/")}
        >
          Bus Admin
        </span>
      </div>

      <div className="center">
        <ul>
          {menu.map((item) => (
            <div className="item" key={item.id}>
              <p className="title">{item.title}</p>
              {item.listItems
                .filter(
                  (listItem) => !(listItem.title === "Staffs" && !isAdmin)
                ) 
                .map((listItem) => {
                  const isActive =
                    listItem.url === "/"
                      ? location.pathname === "/"
                      : location.pathname.includes(listItem.url);

                  return (
                    <li key={listItem.id}>
                      {listItem.title === "Logout" ? (
                        <div
                          className={`navItem ${isActive ? "active" : ""}`}
                          onClick={handleLogout}
                        >
                          <img src={listItem.icon} className="icon" alt="" />
                          <span className="listItemTitle">
                            {listItem.title}
                          </span>
                        </div>
                      ) : (
                        <div
                          className={`navItem ${isActive ? "active" : ""}`}
                          onClick={() => handleNavigation(listItem.url)}
                        >
                          <img src={listItem.icon} className="icon" alt="" />
                          <span className="listItemTitle">
                            {listItem.title}
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
            </div>
          ))}
        </ul>
      </div>
      {open && (
        <Modal setOpen={setOpen} type="unsavedChanged" nextPath={nextPath} />
      )}
    </div>
  );
};

export default Sidebar;

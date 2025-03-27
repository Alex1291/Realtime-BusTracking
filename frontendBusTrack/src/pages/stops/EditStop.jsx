import GoogleMapComponentEdit from "../../components/googleMap/GoogleMapComponentEdit";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./editStop.scss";
import Navbar from "../../components/navbar/Navbar";
const EditStop = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="editStop">
        <Sidebar />
        <div className="editStopContainer">
          <Navbar />
          <div className="editStopContent">
            <div className="top">
              <h2>Edit Bus Stops</h2>
              <div className="link"></div>
            </div>{" "}
            <div className="bottom">
              {" "}
              <GoogleMapComponentEdit />
            </div>
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default EditStop;

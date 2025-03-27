import GoogleMapComponent from "../../components/googleMap/GoogleMapComponent";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./viewStop.scss";
import Navbar from "../../components/navbar/Navbar";

const ViewStop = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="viewStop">
        <Sidebar />
        <div className="viewStopContainer">
          <Navbar />
          <div className="viewStopContent">
            <div className="top">
              <h2>View Bus Stops</h2>
              <div className="link">
                <Link to={"/routes"} className="backLink">
                  Back
                </Link>
                <Link to={"/routes/" + id + "/editStop"} className="editLink">
                  Edit
                </Link>
              </div>
            </div>{" "}
            <div className="bottom">
              {" "}
              <GoogleMapComponent />
            </div>
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default ViewStop;

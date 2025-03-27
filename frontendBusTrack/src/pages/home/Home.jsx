import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import BigCalendar from "../../components/calendar/BigCalendar";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="homeContent">
          <div className="top">
            <h2>Dashboard</h2>
          </div>
          <div className="bottom">
            <Widget type="driver" />
            <Widget type="student" />
            <Widget type="bus" />
            <Widget type="announcement" />
          </div>
          <div className="bottom-2">
            <h3>Schedule</h3>
            <BigCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

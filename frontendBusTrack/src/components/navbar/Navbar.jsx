import "./navbar.scss";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">Welcome {user.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

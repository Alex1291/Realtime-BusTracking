import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { request } from "../../axios_Helper.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await request(
        "GET",
        "http://localhost:8090/api/v1/staffs/" + email,
        {}
      );

      if (response.status === 200) {
        const userData = response.data;

        if (userData.staff_password === password) {
          localStorage.setItem("isAuthenticated", "Yes");
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: userData.staff_email,
              name: userData.staff_name,
              isAdmin: userData.staff_isAdmin,
            })
          );

          alert("Login successful!");
          navigate("/", { replace: true });
          localStorage.setItem("isAuthenticated", "true");
        } else {
          alert("Login unsuccessfuly! Try again");
        }
      }
    } catch (error) {
      alert("Login unsuccessfuly! Try again");
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2 className="form-title">Log in As Admin</h2>
        <form action="#" className="login-form">
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email address"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <img src="/media/email.svg" alt="" />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img src="/media/password.svg" alt="" />
          </div>
          <button onClick={handleLogin} type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

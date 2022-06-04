import { useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Signup from "./Components/Signup";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Signin from "./Components/Signin";
import HomePage from "./Components/HomePage";

function App() {
  const { pathname } = useLocation();
  console.log(pathname);
  let isLoggedInJsonObject = {};
  const navigate = useNavigate();
  try {
    isLoggedInJsonObject = JSON.parse(localStorage.getItem("userInfo"));
  } catch (e) {
    isLoggedInJsonObject = localStorage.getItem("userInfo");
  }

  useEffect(() => {
    if (pathname === "/" && !isLoggedInJsonObject) {
      window.location.assign("/signup");
    } else if (pathname === "/" && isLoggedInJsonObject) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;

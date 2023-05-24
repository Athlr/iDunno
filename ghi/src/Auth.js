import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Auth() {
  const [formData, setFormData] = useState({});
  const location = useLocation();

  const { token, register, login } = useToken();

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isSignIn = location.pathname.includes("signin");

  const handleSubmit = () => {
    if (isSignIn) {
      login(formData.username, formData.password);
    } else {
      register(formData, `${process.env.REACT_APP_API_HOST}/api/accounts`);
    }
  };

  const { username = "", password = "" } = formData;
  return token ? null : (
    <div>
      <ul>
        <li>
          username{" "}
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleFormChange}
          />
        </li>
        <li>
          password{" "}
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleFormChange}
          />
        </li>
      </ul>
      <button onClick={handleSubmit}>{isSignIn ? "sign in" : "sign up"}</button>
    </div>
  );
}

export default Auth;

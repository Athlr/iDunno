import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Auth() {
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { token, register, login, logout } = useToken();

  useEffect(() => {
    if (token && !location.pathname.includes("signout")) {
      navigate("/home");
    }
  }, [token]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isSignIn = location.pathname.includes("signin");
  const isSignUp = location.pathname.includes("signup");
  const isSignOut = location.pathname.includes("signout");

  const handleSubmit = () => {
    if (isSignIn) {
      login(formData.username, formData.password);
    } else if (isSignUp) {
      register(formData, `${process.env.REACT_APP_API_HOST}/api/accounts`);
    }
    else {
      logout(formData, `${process.env.REACT_APP_API_HOST}/api/accounts`)
      navigate("/signin")
    }

  };

  const { username = "", password = "", email = "", first_name = "", last_name = "" } = formData;
  
  if (isSignOut) {
    return (
      <div className="row">
      <div className="offset-3 col-6" >
        <div className="shadow p-4 mt-4">
          <h1>Sign Out</h1>
          <button onClick={handleSubmit} className="btn btn-primary">Sign Out!</button>
        </div>
      </div>
    </div>
    )
  }
  
  return token ? null : (
    <div className="row">
      <div className="offset-3 col-6" >
        <div className="shadow p-4 mt-4">
            <h1>{isSignIn ? "Login": "Sign Up!"}</h1>
            
              <div className="form-floating mb-3">
                <input
                type="text"
                name="username"
                value={username}
                onChange={handleFormChange}
                required
                placeholder="User Name..."
                id="username"
                className="form-control"
              />
              </div>
              <div className="form-floating mb-3">
                <input
                type="password"
                name="password"
                value={password}
                onChange={handleFormChange}
                required
                placeholder="Password"
                id="password"
                className="form-control"
              />
              </div>
              {isSignUp && (
                <div className="form-floating mb-3">
                  <input 
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleFormChange}
                  required
                  placeholder="Email"
                  id="email"
                  className="form-control"
                  />
                </div>
              )}

              {isSignUp && (
                <div className="form-floating mb-3">
                  <input 
                  type="text"
                  name="first_name"
                  value={first_name}
                  onChange={handleFormChange}
                  required
                  placeholder="First Name"
                  id="first_name"
                  className="form-control"
                  />
                </div>
              )}

              {isSignUp && (
                <div className="form-floating mb-3">
                  <input 
                  type="text"
                  name="last_name"
                  value={last_name}
                  onChange={handleFormChange}
                  required
                  placeholder="Last Name"
                  id="last_name"
                  className="form-control"
                  />
                </div>
              )}
              <button onClick={handleSubmit} className="btn btn-primary">{isSignIn ? "Login": "Sign Up!"}</button>
            
          </div>
      </div>
    </div>
  );
}

export default Auth;

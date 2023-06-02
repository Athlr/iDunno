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

  const handleSubmit = (event) => {
    if (isSignIn) {
      event.preventDefault();
      login(formData.username, formData.password);
    } else if (isSignUp) {
      event.preventDefault();
      register(formData, `${process.env.REACT_APP_API_HOST}/api/accounts`);
    } else {
      logout(formData, `${process.env.REACT_APP_API_HOST}/api/accounts`);
      navigate("/signin");
    }
  };

  const {
    username = "",
    password = "",
    email = "",
    first_name = "",
    last_name = "",
  } = formData;

  if (isSignOut) {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Sign Out</h1>
            <button onClick={handleSubmit} className="btn btn-primary">
              Sign Out!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return token ? null : (
    <div
      className="p-10 flex items-center justify-center bg-salmon relative overflow-hidden"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="absolute w-full h-full">
        <video autoPlay muted className="object-cover w-full h-full">
          <source src="/idunno_signup_form_2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="bg-white border border-gray-200 rounded p-6 shadow-lg space-y-12 relative z-10 h-auto max-h-full overflow-auto">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            {isSignIn ? "Login" : "Create an Account"}
          </h2>
          <form
            onSubmit={handleSubmit}
            id="user-form"
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
          >
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  value={username}
                  onChange={handleFormChange}
                  placeholder="BootyMuncher69"
                  required
                  type="text"
                  name="username"
                  id="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={handleFormChange}
                  placeholder="BigMac123!"
                  required
                  type="password"
                  name="password"
                  id="password"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {isSignUp && (
              <>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      value={email}
                      onChange={handleFormChange}
                      placeholder="doublequarterpounderwithcheese@aol.com"
                      required
                      type="text"
                      name="email"
                      id="email"
                      className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      value={first_name}
                      onChange={handleFormChange}
                      placeholder="Ronald"
                      required
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      value={last_name}
                      onChange={handleFormChange}
                      placeholder="McDonald"
                      required
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="col-span-full">
              <button
                type="submit"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {isSignIn ? "Login" : "Sign Up!"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;

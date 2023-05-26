import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FriendsMain from "./Friends/FriendsMain";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "./useUser";
import Auth from "./Auth";
import Nav from "./Main/Nav";
import Home from "./Home";


function App() {
  // const { token } = useToken();
  // const { user } = useUser(token);

  return (
    <div>
    <Nav />
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Auth />} />
      <Route path="/signin" element={<Auth />} />
      <Route path="/signout" element={<Auth />} />
      <Route path="friends">
        <Route path="" element={<FriendsMain />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;

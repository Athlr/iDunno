import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FriendsMain from "./Friends/FriendsMain";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "./useUser";
import Auth from "./Auth";

function App() {
  // const { token } = useToken();
  // const { user } = useUser(token);

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
      <Route path="/signin" element={<Auth />} />
      <Route path="/signout" element={<Auth />} />
      <Route path="friends">
        <Route path="" element={<FriendsMain />} />
      </Route>
    </Routes>
  );
}

export default App;

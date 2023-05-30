import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FriendsMain from "./Friends/FriendsMain";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "./useUser";
import Auth from "./Auth";
import Nav from "./Main/Nav";
import NewRestaurantForm from "./Restaurants/NewRestaurantForm";
import ProfilePage from "./Profiles/ProfilePage";
import FriendPage from "./Profiles/FriendsPage";

function App() {
  // const { token } = useToken();
  // const { user } = useUser(token);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/signout" element={<Auth />} />
        <Route path="friends">
          <Route path="" element={<FriendsMain />} />
        </Route>
        <Route path="/restaurants">
          {/* <Route path="" element={<RestaurantList />} /> */}
          <Route path="new" element={<NewRestaurantForm />} />
        </Route>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/:friend_id" element={<FriendPage />} />
      </Routes>
    </div>
  );
}

export default App;

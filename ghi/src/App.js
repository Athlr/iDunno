import { Routes, Route } from "react-router-dom";
import FriendsMain from "./Friends/FriendsMain";
import Auth from "./Auth";
import RestaurantListPage from "./Restaurants/RestaurantListPage";
import Nav from "./Main/Nav";
import NewRestaurantForm from "./Restaurants/NewRestaurantForm";
import ProfilePage from "./Profiles/ProfilePage";
import FriendPage from "./Profiles/FriendsPage";
import Footer from "./Main/Footer";
import MainPage from "./MainPage";
import RestaurantListForm from "./Restaurants/RestaurantListForm";
import FriendRestaurantPage from "./Restaurants/FriendRestaurantPage";
import EditRestaurantListForm from "./Restaurants/EditRestaurantListPage";
import EditRestaurantForm from "./Restaurants/EditRestaurants";
import HomePage from "./HomePage";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/signout" element={<Auth />} />
          <Route path="friends">
            <Route path="" element={<FriendsMain />} />
          </Route>
          <Route path="/restaurants">
            <Route path=":listId?" element={<RestaurantListPage />} />
            <Route path="CreateList" element={<RestaurantListForm />} />
            <Route path="new" element={<NewRestaurantForm />} />
            <Route
              path=":listId/edit/:restaurantId"
              element={<EditRestaurantForm />}
            />
            <Route
              path=":friend_id/:listId"
              element={<FriendRestaurantPage />}
            />
            <Route path="edit/:listId" element={<EditRestaurantListForm />} />
          </Route>
          <Route path="/profile">
            <Route path="" element={<ProfilePage />} />
            <Route path=":friend_id" element={<FriendPage />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

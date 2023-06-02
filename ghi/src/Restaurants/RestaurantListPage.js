import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [selectedListId, setSelectedListId] = useState("");
  const { token } = useToken();
  const { user } = useUser(token);
  const navigate = useNavigate();

  const { listId } = useParams();

  const handleUpdate = (e, stateFunction) => {
    const value = e.target.value;
    stateFunction(value);
    if (value === "") {
      setRestaurants([]);
    } else {
      fetchRestaurantData(value);
    }
  };

  const fetchRestaurantListData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/restaurant-list`;
    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });

    if (response.ok) {
      const data = await response.json();
      setRestaurantList(data);
    }
  };

  const fetchRestaurantData = async (list_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/restaurant_list/${list_id}/restaurants`;
    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });

    if (response.ok) {
      const data = await response.json();
      setRestaurants(data);
    }
  };

  const handleAddRestaurant = () => {
    if (selectedListId) {
      navigate("/restaurants/new", { state: { listId: selectedListId } });
    }
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    const url = `${process.env.REACT_APP_API_HOST}/restaurant_list/${selectedListId}/remove-restaurant/${restaurantId}`;
    const config = {
      credentials: "include",
      method: "delete",
    };

    const response = await fetch(url, config);
    if (response.ok) {
      fetchRestaurantData(selectedListId);
    }
  };

  const handleCreateRestaurantList = () => {
    navigate("/restaurants/CreateList");
  };

  useEffect(() => {
    fetchRestaurantListData();
  }, []);

  useEffect(() => {
    setSelectedListId(listId || "");
  }, [listId]);

  useEffect(() => {
    if (selectedListId) {
      fetchRestaurantData(selectedListId);
    }
  }, [selectedListId]);

  return (
    <div className="my-5 container">
      <h1 className="text-3xl font-bold mb-5">Restaurant Lists</h1>
      <div className="mb-3">
        <select
          onChange={(e) => handleUpdate(e, setSelectedListId)}
          value={selectedListId}
          name="restaurantLists"
          id="restaurantLists"
          className="form-select border border-gray-300 px-4 py-2 rounded-md w-full"
        >
          <option value="">--</option>
          {restaurantList.map((restaurantList) => {
            return (
              <option value={restaurantList.list_id} key={restaurantList.list_id}>
                {restaurantList.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mb-3">
        <button
          onClick={handleAddRestaurant}
          className="btn btn-primary"
          disabled={!selectedListId}
        >
          Add Restaurant
        </button>
        <button
          onClick={handleCreateRestaurantList}
          className="btn btn-primary ml-2"
        >
          Create Restaurant List
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {restaurants.map((restaurant) => {
          return (
            <div key={restaurant.restaurant_id} className="bg-white rounded-md shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">{restaurant.name}</h3>
              <p className="text-gray-600 mb-2">Price: {restaurant.price}</p>
              <p className="text-gray-600 mb-4">Cuisine: {restaurant.cuisine_name}</p>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteRestaurant(restaurant.restaurant_id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

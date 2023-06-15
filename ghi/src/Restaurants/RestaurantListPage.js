import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [selectedListId, setSelectedListId] = useState("");
  const [isCardView, setIsCardView] = useState(true);
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

  const handleViewChange = () => {
    setIsCardView(!isCardView);
  };

  return (
    <div className="container h-screen min-w-full bg-[#faceaf]">
      <h1 className="text-3xl text-center mb-10 font-bold">Restaurant Lists</h1>
      <div className="mb-3 mx-1 ml-20 flex items-center">
        <select
          onChange={(e) => handleUpdate(e, setSelectedListId)}
          value={selectedListId}
          name="restaurantLists"
          id="restaurantLists"
          className="form-select border border-gray-500 px-4 py-2 rounded-md w-6/12 mr-2"
        >
          <option value="">--</option>
          {restaurantList.map((restaurantList) => {
            return (
              <option
                value={restaurantList.list_id}
                key={restaurantList.list_id}
              >
                {restaurantList.name}
              </option>
            );
          })}
        </select>
        <button
          onClick={handleAddRestaurant}
          className="btn btn-primary bg-darkCyan"
          disabled={!selectedListId}
        >
          Add Restaurant
        </button>
        <button
          onClick={handleViewChange}
          className="btn btn-primary ml-2 bg-darkCyan"
        >
          {isCardView ? "Switch to List View" : "Switch to Card View"}
        </button>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
        {isCardView ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-20">
            {restaurants.map((restaurant) => {
              return (
                <div
                  key={restaurant.restaurant_id}
                  className="bg-[#e89d5b51] rounded-md shadow-md p-4 hover:transform hover:scale-105  transition duration-300 ease-in-out"
                >
                  <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                  <p className="text-lg text-gray-600 mb-2">Price: {restaurant.price}</p>
                  <p className="text-lg text-gray-600 mb-4">Cuisine: {restaurant.cuisine_name}</p>
                  <div className="flex">
                    <Link
                      to={`/restaurants/${selectedListId}/edit/${restaurant.restaurant_id}`}
                    >
                      <button className="btn btn-sm btn-primary bg-blue-500 hover:bg-blue-600">Edit</button>
                    </Link>
                    <button
                      className="btn btn-sm btn-danger ml-2 hover:bg-red-500"
                      onClick={() => handleDeleteRestaurant(restaurant.restaurant_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <ul className="ml-20 mx-20 mr-20 max-w-screen-lg">
            {restaurants.map((restaurant) => {
              return (
                <li
                  key={restaurant.restaurant_id}
                  className="bg-[#e89d5b51] rounded-md shadow-md p-4 mb-4 flex justify-between hover:transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                    <div className="flex">
                      <p className="text-lg text-gray-600 mr-2">Price:</p>
                      <p className="text-lg text-gray-600 mr-4">{restaurant.price}</p>
                      <p className="text-lg text-gray-600 mr-2">Cuisine:</p>
                      <p className="text-lg text-gray-600">{restaurant.cuisine_name}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <Link
                      to={`/restaurants/${selectedListId}/edit/${restaurant.restaurant_id}`}
                    >
                      <button className="btn btn-sm btn-primary bg-blue-500 hover:bg-blue-600">Edit</button>
                    </Link>
                    <button
                      className="btn btn-sm btn-danger ml-2 hover:bg-red-500"
                      onClick={() => handleDeleteRestaurant(restaurant.restaurant_id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

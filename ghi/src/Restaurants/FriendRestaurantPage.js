import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FriendRestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [isCardView, setIsCardView] = useState(true);
  const { listId } = useParams();

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

  const handleViewChange = () => {
    setIsCardView(!isCardView);
  };

  useEffect(() => {
    if (listId) {
      fetchRestaurantData(listId);
    }
  }, [listId]);

  return (
    <div className="container h-screen min-w-full bg-[#faceaf]">
      <h1 className="text-3xl text-center mb-20 font-bold mb-5">Friends List</h1>
      <div className="flex justify-end mx-20 mr-20">
        <button onClick={handleViewChange} className="btn btn-primary ml-2 bg-darkCyan ">
          {isCardView ? "Switch to List View" : "Switch to Card View"}
        </button>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
        {isCardView ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mx-20 mr-20 overflow-hidden">
            {restaurants.map((restaurant) => {
              return (
                <div
                  key={restaurant.restaurant_id}
                  className="bg-[#e89d5b51] rounded-md shadow-md p-4 hover:transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  <h3 className="text-lg font-semibold mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-2">Price: {restaurant.price}</p>
                  <p className="text-gray-600 mb-4">Cuisine: {restaurant.cuisine_name}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <ul className="ml-60 mx-20 mr-20 max-w-screen-lg">
            {restaurants.map((restaurant) => {
              return (
                <li
                  key={restaurant.restaurant_id}
                  className="bg-[#e89d5b51] rounded-md shadow-md p-4 mb-4 flex justify-between hover:transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{restaurant.name}</h3>
                    <div className="flex">
                      <p className="text-gray-600 mr-2">Price:</p>
                      <p className="text-gray-600 mr-4">{restaurant.price}</p>
                      <p className="text-gray-600 mr-2">Cuisine:</p>
                      <p className="text-gray-600">{restaurant.cuisine_name}</p>
                    </div>
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

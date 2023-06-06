import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FriendRestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
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

  useEffect(() => {
    if (listId) {
      fetchRestaurantData(listId);
    }
  }, [listId]);

  return (
    <div className="my-5 container">
      <h1 className="text-3xl font-bold mb-5">Restaurant List</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {restaurants.map((restaurant) => {
          return (
            <div
              key={restaurant.restaurant_id}
              className="bg-white rounded-md shadow-md p-4"
            >
              <h3 className="text-lg font-semibold mb-2">{restaurant.name}</h3>
              <p className="text-gray-600 mb-2">Price: {restaurant.price}</p>
              <p className="text-gray-600 mb-4">
                Cuisine: {restaurant.cuisine_name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

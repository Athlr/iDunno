import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

export default function EditRestaurantForm() {
  const [cuisines, setCuisines] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cuisineId, setCuisineId] = useState("");
  const { listId, restaurantId } = useParams();
  const [restaurantData, setRestaurantData] = useState("");
  const navigate = useNavigate();
  const { token } = useToken();

  const fetchCuisineData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/cuisine-list`;
    const fetchConfig = {
      credentials: "include",
      method: "get",
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const data = await response.json();
      setCuisines(data);
    }
  };

  const fetchRestaurantData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/restaurants/${restaurantId}`;
    const fetchConfig = {
      credentials: "include",
      method: "get",
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const data = await response.json();
      setRestaurantData(data);
    }
  };

  const handleName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handlePrice = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleCuisineId = (event) => {
    const value = event.target.value;
    setCuisineId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (token) {
      const data = {
        name: name,
        price: price,
        cuisine_id: cuisineId,
        list_id: listId,
      };
      const restaurant_url = `${process.env.REACT_APP_API_HOST}/restaurants/${restaurantId}`;
      const config = {
        credentials: "include",
        method: "put",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(restaurant_url, config);
      if (response.ok) {
        setName("");
        setPrice("");
        setCuisineId("");
        navigate(`/restaurants/${listId}`);
      }
    }
  };

  useEffect(() => {
    fetchRestaurantData();
    fetchCuisineData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (restaurantData) {
      setName(restaurantData.name);
      setPrice(restaurantData.price);
      setCuisineId(restaurantData.cuisine_id);
    }
  }, [restaurantData]);

  return (
    <>
      <div
        className="p-10 flex items-center justify-center bg-salmon relative overflow-hidden"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="absolute w-full h-full">
          <video autoPlay muted className="object-cover w-full h-full">
            <source src="/idunno_restaurant_form_3.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="bg-white border border-gray-200 rounded p-6 shadow-lg space-y-12 relative z-10 h-auto max-h-full overflow-auto">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a restaurant
            </h2>
            <form
              onSubmit={handleSubmit}
              id="create-restaurant-form"
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Restaurant Name
                </label>
                <div className="mt-2">
                  <input
                    value={name}
                    onChange={handleName}
                    placeholder="Denny's"
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="Price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <select
                    value={price}
                    onChange={handlePrice}
                    placeholder="$$$$"
                    required
                    type="text"
                    name="Price"
                    id="Price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose a Price</option>
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                    <option value="$$$$">$$$$</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="Cuisine ID"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cuisine
                </label>
                <div className="mt-2">
                  <select
                    value={cuisineId}
                    onChange={handleCuisineId}
                    placeholder="Cuisine"
                    required
                    name="Cuisine ID"
                    id="Cuisine ID"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose a Cuisine</option>
                    {cuisines.map((cuisine) => {
                      return (
                        <option
                          key={cuisine.cuisine_id}
                          value={cuisine.cuisine_id}
                        >
                          {cuisine.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <button
                  type="submit"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

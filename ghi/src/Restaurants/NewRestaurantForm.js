import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";

export default function NewRestaurantForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cuisineId, setCuisineId] = useState("");
  const { token } = useToken();
  const { user } = useUser(token);

  const handleName = async (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handlePrice = async (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleCuisineId = async (event) => {
    const value = event.target.value;
    setCuisineId(value);
  };

  const handleSubmit = async (event) => {
    if (token) {
      const data = {
        name: name,
        price: price,
        cuisine_id: cuisineId,
      };
      console.log(data);
      const restaurant_url = `${process.env.REACT_APP_API_HOST}/restaurants`;
      const config = {
        credentials: "include",
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      event.preventDefault();
      const response = await fetch(restaurant_url, config);
      if (response.ok) {
        const newRestaurant = await response.json();
        console.log(newRestaurant);
        setName("");
        setPrice("");
        setCuisineId("");
        // navigate("/restaurants");
      }
    }
  };

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Restaurant</h1>
            <form onSubmit={handleSubmit} id="create-restaurant-form">
              <div className="form-floating mb-3">
                <input
                  value={name}
                  onChange={handleName}
                  placeholder="Restaurant Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">Restaurant Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={price}
                  onChange={handlePrice}
                  placeholder="Price"
                  required
                  type="text"
                  name="Price"
                  id="Price"
                  className="form-control"
                />
                <label htmlFor="Price">Price</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={cuisineId}
                  onChange={handleCuisineId}
                  placeholder="Cuisine ID"
                  required
                  type="text"
                  name="Cuisine ID"
                  id="Cuisine ID"
                  className="form-control"
                />
                <label htmlFor="employee id">Cuisine ID</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

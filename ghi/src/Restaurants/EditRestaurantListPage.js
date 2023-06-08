import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRestaurantListForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [listPicture, setListPicture] = useState("");
  const [restaurantData, setRestaurantData] = useState("");
  const { token } = useToken();
  const { user } = useUser(token);
  const { listId } = useParams();
  const navigate = useNavigate();

  const fetchRestaurantsData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/restaurant-list/${listId}`;
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

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleListPictureChange = (event) => {
    const value = event.target.value;
    setListPicture(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.name = name;
    data.description = description;
    data.list_picture = listPicture;
    data.user_id = user.id;

    const url = `${process.env.REACT_APP_API_HOST}/restaurant-list/${listId}`;
    const fetchConfig = {
      credentials: "include",
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setName("");
      setDescription("");
      setListPicture("");
      navigate(`/profile/`);
    }
  };

  useEffect(() => {
    if (listId) {
      fetchRestaurantsData();
    }
  }, [listId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setName(restaurantData.name);
    setDescription(restaurantData.description);
    setListPicture(restaurantData.list_picture);
  }, [restaurantData]);

  return (
  <div className="container h-screen min-w-full bg-[#faceaf]">
    <div className="flex justify-center items-center h-full ">
      <div className="shadow p-4 mt-4 rounded-md bg-[#e89d5b51]">
        <h1 className="text-2xl font-bold mb-4">Update Restaurant List</h1>
        <form onSubmit={handleSubmit} id="create-restaurant-form">
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              List Name
            </label>
            <input
              value={name}
              onChange={handleNameChange}
              placeholder="Name"
              required
              type="text"
              name="name"
              id="name"
              className="form-input w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <input
              value={description}
              onChange={handleDescriptionChange}
              placeholder="*Optional*"
              type="text"
              name="description"
              id="description"
              className="form-input w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="listPicture" className="block font-medium mb-1">
              List Picture
            </label>
            <select
              className="form-select border border-gray-500 px-4 py-2 rounded-md w-full"
              onChange={handleListPictureChange}
              defaultValue={listPicture}
              name="listPicture"
              id="listPicture"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284824.png">
                Taco
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284797.png">
                Toast
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284794.png">
                Cupcake
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284792.png">
                Donut
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284815.png">
                Coffee
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284795.png">
                Sushi
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284791.png">
                French Fries
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284805.png">
                Apple
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284798.png">
                Cookie
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284823.png">
                Broccoli
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284814.png">
                Ice Cream
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284789.png">
                Burger
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284800.png">
                Pizza
              </option>
              <option value="https://cdn-icons-png.flaticon.com/128/284/284835.png">
                Bell Pepper
              </option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

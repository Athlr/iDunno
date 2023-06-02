import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";
import { useNavigate } from "react-router-dom";

function RestaurantListForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useToken();
  const { user } = useUser(token);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.name = name;
    data.description = description;
    data.user_id = user.id;

    const url = `${process.env.REACT_APP_API_HOST}/restaurant-list`;
    const fetchConfig = {
      credentials: "include",
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    console.log(response);
    if (response.ok) {
      const newRestaurantList = await response.json();
      setName("");
      setDescription("");
      navigate(`/profile/`);
    }
  };

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Restaurant List</h1>
            <form onSubmit={handleSubmit} id="create-restaurant-form">
              <div className="form-floating mb-3">
                <input
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">List Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Description"
                  required
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                />
                <label htmlFor="description">Description</label>
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

export default RestaurantListForm;

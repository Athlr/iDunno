import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";
import { useNavigate } from "react-router-dom";

function RestaurantListForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [listPicture, setListPicture] = useState("https://cdn-icons-png.flaticon.com/128/284/284789.png");
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

  const handleListPictureChange = (event) => {
    const value = event.target.value;
    setListPicture(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.name = name;
    data.description = description;
    if (listPicture != null) {
      data.list_picture = listPicture;
    }
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
    if (response.ok) {
      setName("");
      setDescription("");
      setListPicture(null);
      navigate(`/profile/`);
    }
  };

  return (
    <div className="container h-screen min-w-full bg-[#A1BD98] flex justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow" style={{ borderBottom: "1px solid black" }}>
          <div className="flex justify-center">
            <div className="flex justify-center">
              <div className="w-96">
                <img
                  className="rounded-md h-64"
                  src={process.env.PUBLIC_URL + "/static/img/create_list.png"}
                  alt=""
                />
              </div>
          </div>
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
                className="form-control w-96 ml-4"
              />
              <label className="ml-4" htmlFor="name">List Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={description}
                onChange={handleDescriptionChange}
                placeholder="*Optional"
                type="text"
                name="description"
                id="description"
                className="form-control w-96 ml-4"
              />
              <label className="ml-4" htmlFor="description">Description</label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="block w-96 ml-4 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-0 "
                onChange={handleListPictureChange}
                defaultValue={listPicture}
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
              <label className="ml-4" htmlFor="Picture_Url">List Picture</label>
            </div>
            <button type="submit" className="btn btn-primary ml-4">
              Create
            </button>
          </form>
          </div>
        </div>
    </div>
  );
}

export default RestaurantListForm;

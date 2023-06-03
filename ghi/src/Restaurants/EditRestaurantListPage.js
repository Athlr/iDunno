// import React, { useState } from "react";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "../useUser";
// import { useNavigate, useParams } from "react-router-dom";

// export default function EditRestaurantListForm() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [listPicture, setListPicture] = useState("");
//   const { token } = useToken();
//   const { user } = useUser(token);
//   const { listId } = useParams();
//   const navigate = useNavigate();

//   const updateName = async (listId) => {
//     const url = `${process.env.REACT_APP_API_HOST}/restaurant-list/${listId}`;

//     const data = {
//       name: name,
//       description: null,
//       list_picture: null,
//       user_id: null,
//     };

//     const response = await fetch(url, {
//       credentials: "include",
//       method: "put",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       setName("");
//     }
//   };


//   const updateDescription = async (listId) => {
//     const url = `${process.env.REACT_APP_API_HOST}/restaurant-list/${listId}`;

//     const data = {
//       name: null,
//       description: description,
//       list_picture: null,
//       user_id: null,
//     };

//     const response = await fetch(url, {
//       credentials: "include",
//       method: "put",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       setDescription("");
//     }
//   };

//   const updateListPicture = async (listId) => {
//     const url = `${process.env.REACT_APP_API_HOST}/restaurant-list/${listId}`;

//     const data = {
//       name: null,
//       description: null,
//       list_picture: listPicture,
//       user: id,
//     };

//     const response = await fetch(url, {
//       credentials: "include",
//       method: "put",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       setListPicture("");
//       navigate(`/profile/`);
//     }
//     }
//   };






//   return (
//     <div className="my-5 container">
//       <div className="row">
//         <div className="offset-3 col-6">
//           <div className="shadow p-4 mt-4">
//             <h1>Create a Restaurant List</h1>
//             <form onSubmit={handleSubmit} id="create-restaurant-form">
//               <div className="form-floating mb-3">
//                 <input
//                   value={name}
//                   onChange={handleNameChange}
//                   placeholder="Name"
//                   required
//                   type="text"
//                   name="name"
//                   id="name"
//                   className="form-control"
//                 />
//                 <label htmlFor="name">List Name</label>
//               </div>
//               <div className="form-floating mb-3">
//                 <input
//                   value={description}
//                   onChange={handleDescriptionChange}
//                   placeholder="*Optional*"
//                   required
//                   type="text"
//                   name="description"
//                   id="description"
//                   className="form-control"
//                 />
//                 <label htmlFor="description">Description</label>
//               </div>
//               <div className="form-floating mb-3">
//                 <input
//                   value={listPicture}
//                   onChange={handleListPictureChange}
//                   placeholder="*Optional*"
//                   type="text"
//                   name="Picture_Url"
//                   id="Picture_Url"
//                   className="form-control"
//                 />
//                 <label htmlFor="Picture_Url">Picture Url</label>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Update
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




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
    const response = await fetch(url, fetchConfig)
        if (response.ok) {
            const data = await response.json();
            setRestaurantData(data)
        }
  }


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
    console.log(response);
    if (response.ok) {
      const newRestaurantList = await response.json();
      setName("");
      setDescription("");
      setListPicture("");
      navigate(`/profile/`);
    }
  };

    useEffect(() => {
        fetchRestaurantsData();
    }, []);


    useEffect(() => {
        setName(restaurantData.name)
        setDescription(restaurantData.description)
        setListPicture(restaurantData.list_picture)
    }, [restaurantData]);

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
                  placeholder="*Optional*"
                  required
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={listPicture}
                  onChange={handleListPictureChange}
                  placeholder="*Optional*"
                  type="text"
                  name="Picture_Url"
                  id="Picture_Url"
                  className="form-control"
                />
                <label htmlFor="Picture_Url">Picture Url</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";

export default function NewRestaurantForm() {
  const [cuisines, setCuisines] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cuisineId, setCuisineId] = useState("");
  const location = useLocation();
  const { listId } = location.state;
  const navigate = useNavigate();
  const { token } = useToken();
  console.log("Token after useToken:", token);
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
      console.log("Token:", token);
      const data = {
        name: name,
        price: price,
        cuisine_id: cuisineId,
        list_id: listId,
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
        // console.log(newRestaurant);
        setName("");
        setPrice("");
        setCuisineId("");
        navigate(`/restaurants/${ listId }`);
      }
    }
  };

  if (!token) {
    navigate("/signin");
  }

  useEffect(() => {
    const fetchCuisines = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/cuisine-list`
      );
      if (response.ok) {
        const cuisines = await response.json();
        setCuisines(cuisines);
      } else {
        // handle error
        console.error("Failed to fetch cuisines");
      }
    };

    fetchCuisines();
  }, []);

  return (
    <>
      <div className="p-10 min-h-screen flex items-center justify-center bg-salmon">
        <div className="my-5 container">
          <div className="row">
            <div className="offset-3 col-6">
              <div className="text-xs sm:text-base md:text-lg lg:text-3xl shadow p-4 mt-4">
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
                  </div>
                  <div className="form-floating mb-3">
                    <select
                      value={price}
                      onChange={handlePrice}
                      placeholder="Price"
                      required
                      type="text"
                      name="Price"
                      id="Price"
                      className="form-control"
                    >
                      <option value="">Choose a Price</option>
                      <option value="$">$</option>
                      <option value="$$">$$</option>
                      <option value="$$$">$$$</option>
                      <option value="$$$$">$$$$</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <select
                      value={cuisineId}
                      onChange={handleCuisineId}
                      placeholder="Cuisine ID"
                      required
                      name="Cuisine ID"
                      id="Cuisine ID"
                      className="form-select"
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
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "../useUser";

// export default function NewRestaurantForm() {
//   const [cuisines, setCuisines] = useState([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [cuisineId, setCuisineId] = useState("");
//   const navigate = useNavigate();
//   const { token } = useToken();
//   console.log("Token after useToken:", token);
//   const { user } = useUser(token);

//   const handleName = async (event) => {
//     const value = event.target.value;
//     setName(value);
//   };

//   const handlePrice = async (event) => {
//     const value = event.target.value;
//     setPrice(value);
//   };

//   const handleCuisineId = async (event) => {
//     const value = event.target.value;
//     setCuisineId(value);
//   };

//   const handleSubmit = async (event) => {
//     if (token) {
//       console.log("Token:", token);
//       const data = {
//         name: name,
//         price: price,
//         cuisine_id: cuisineId,
//       };
//       console.log(data);
//       const restaurant_url = `${process.env.REACT_APP_API_HOST}/restaurants`;
//       const config = {
//         method: "post",
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       event.preventDefault();
//       const response = await fetch(restaurant_url, config);
//       if (response.ok) {
//         const newRestaurant = await response.json();
//         console.log(newRestaurant);
//         setName("");
//         setPrice("");
//         setCuisineId("");
//         navigate("/restaurants");
//       }
//     }
//   };

//   if (!token) {
//     navigate("/signin");
//   }

//   useEffect(() => {
//     const fetchCuisines = async () => {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_HOST}/cuisine-list`
//       );
//       if (response.ok) {
//         const cuisines = await response.json();
//         setCuisines(cuisines);
//       } else {
//         // handle error
//         console.error("Failed to fetch cuisines");
//       }
//     };

//     fetchCuisines();
//   }, []);

//   return (
//     <>
//       <div className="p-10 min-h-screen flex items-center justify-center bg-salmon">
//         <div className="my-5 container">
//           <div className="row">
//             <div className="offset-3 col-6">
//               <div className="text-xs sm:text-base md:text-lg lg:text-3xl shadow p-4 mt-4">
//                 <h1>Create a Restaurant</h1>
//                 <form onSubmit={handleSubmit} id="create-restaurant-form">
//                   <div className="form-floating mb-3">
//                     <input
//                       value={name}
//                       onChange={handleName}
//                       placeholder="Restaurant Name"
//                       required
//                       type="text"
//                       name="name"
//                       id="name"
//                       className="form-control"
//                     />
//                   </div>
//                   <div className="form-floating mb-3">
//                     <input
//                       value={price}
//                       onChange={handlePrice}
//                       placeholder="Price"
//                       required
//                       type="text"
//                       name="Price"
//                       id="Price"
//                       className="form-control"
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <select
//                       value={cuisineId}
//                       onChange={handleCuisineId}
//                       placeholder="Cuisine ID"
//                       required
//                       name="Cuisine ID"
//                       id="Cuisine ID"
//                       className="form-select"
//                     >
//                       <option value="">Choose a Cuisine</option>
//                       {cuisines.map((cuisine) => {
//                         return (
//                           <option
//                             key={cuisine.cuisine_id}
//                             value={cuisine.cuisine_id}
//                           >
//                             {cuisine.name}
//                           </option>
//                         );
//                       })}
//                     </select>
//                   </div>
//                   <button type="submit" className="btn btn-primary">
//                     Create
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

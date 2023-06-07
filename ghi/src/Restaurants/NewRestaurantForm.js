// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "../useUser";

// export default function NewRestaurantForm() {
//   const [cuisines, setCuisines] = useState([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [cuisineId, setCuisineId] = useState("");
//   const location = useLocation();
//   const { listId } = location.state;
//   const navigate = useNavigate();
//   const { token } = useToken();
//   console.log("Token after useToken:", token);
//   const { user } = useUser(token);

//   const handleName = (event) => {
//     const value = event.target.value;
//     setName(value);
//   };

//   const handlePrice = (event) => {
//     const value = event.target.value;
//     setPrice(value);
//   };

//   const handleCuisineId = (event) => {
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
//         list_id: listId,
//       };
//       console.log(data);
//       const restaurant_url = `${process.env.REACT_APP_API_HOST}/restaurants`;
//       const config = {
//         credentials: "include",
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
//         // console.log(newRestaurant);
//         setName("");
//         setPrice("");
//         setCuisineId("");
//         navigate(`/restaurants/${listId}`);
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
//       <div
//         className="p-10 flex items-center justify-center bg-salmon relative overflow-hidden"
//         style={{ height: "calc(100vh - 64px)" }}
//       >
//         <div className="absolute w-full h-full">
//           <video autoPlay muted className="object-cover w-full h-full">
//             <source src="/idunno_restaurant_form_3.mp4" type="video/mp4" />
//           </video>
//         </div>
//         <div className="bg-white border border-gray-200 rounded p-6 shadow-lg space-y-12 relative z-10 h-auto max-h-full overflow-auto">
//           <div className="border-b border-gray-900/10 pb-12">
//             <h2 className="text-base font-semibold leading-7 text-gray-900">
//               Create a restaurant
//             </h2>
//             <form
//               onSubmit={handleSubmit}
//               id="create-restaurant-form"
//               className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
//             >
//               <div className="sm:col-span-4">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Restaurant Name
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     value={name}
//                     onChange={handleName}
//                     placeholder="Denny's"
//                     required
//                     type="text"
//                     name="name"
//                     id="name"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//               <div className="sm:col-span-4">
//                 <label
//                   htmlFor="Price"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Price
//                 </label>
//                 <div className="mt-2">
//                   <select
//                     value={price}
//                     onChange={handlePrice}
//                     placeholder="$$$$"
//                     required
//                     type="text"
//                     name="Price"
//                     id="Price"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   >
//                     <option value="">Choose a Price</option>
//                     <option value="$">$</option>
//                     <option value="$$">$$</option>
//                     <option value="$$$">$$$</option>
//                     <option value="$$$$">$$$$</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="sm:col-span-4">
//                 <label
//                   htmlFor="Cuisine ID"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Cuisine
//                 </label>
//                 <div className="mt-2">
//                   <select
//                     value={cuisineId}
//                     onChange={handleCuisineId}
//                     placeholder="Cuisine"
//                     required
//                     name="Cuisine ID"
//                     id="Cuisine ID"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   >
//                     <option value="">Choose a Cuisine</option>
//                     {cuisines.map((cuisine) => {
//                       return (
//                         <option
//                           key={cuisine.cuisine_id}
//                           value={cuisine.cuisine_id}
//                         >
//                           {cuisine.name}
//                         </option>
//                       );
//                     })}
//                   </select>
//                 </div>
//               </div>
//               <div className="col-span-full">
//                 <button
//                   type="submit"
//                   className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//                 >
//                   Create
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

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
        setName("");
        setPrice("");
        setCuisineId("");
        navigate(`/restaurants/${listId}`);
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
        console.error("Failed to fetch cuisines");
      }
    };

    fetchCuisines();
  }, []);

  return (
    <>
      <div
        className="p-10 flex items-center justify-center bg-salmon relative overflow-hidden"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <video autoPlay muted className="object-cover w-full h-full">
            <source src="/idunno_restaurant_form_3.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="bg-white border border-gray-200 rounded p-6 shadow-lg space-y-12 relative z-10 h-auto max-h-full overflow-auto md:w-3/4 lg:w-1/2 xl:w-1/3">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a restaurant
            </h2>
            <form
              onSubmit={handleSubmit}
              id="create-restaurant-form"
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <div className="sm:col-span-6">
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
              <div className="sm:col-span-6">
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
              <div className="sm:col-span-6">
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
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-full sm:w-auto"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

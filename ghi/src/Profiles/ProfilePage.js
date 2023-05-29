import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";
import ProfileList from "./ProfileList";

export default function ProfilePage() {
  const { token } = useToken();
  const { user } = useUser(token);
  console.log(user);

  const [restaurantList, setRestaurantList] = useState([]);

  const fetchRestaurantListData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/restaurant-list`;

    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setRestaurantList(data);
    }
  };

  useEffect(() => {
    fetchRestaurantListData();
  }, []);

  return (
    <div className="h-screen">
      <div className="container mx-auto mt-8 w-4/5 bg-zinc-100 h-auto">
        <div className="photo-wrapper p-2 flex">
          <img
            className="w-32 h-32 rounded-full"
            src="https://cdn.discordapp.com/attachments/1105246169736675350/1110310871764312074/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.png"
            alt="John Doe"
          />
          <div className="p-2">
            <h3 className="text-xl text-gray-900 font-medium leading-8">
              {user ? user.first_name : ""} {user ? user.last_name : ""}
            </h3>
            <div className="text-gray-400 text-xs font-semibold">
              <p>@{user ? user.username : ""}</p>
            </div>
          </div>
          <div className="flex items-end ml-auto">
            <button className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Add Restaurant Lists
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-5 w-4/5 bg-zinc-100 h-3/4 overflow-y-scroll">
        <div>
          <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
            Restaurant Lists
          </h3>
        </div>
        <div className="flex justify-center">
          <div className="relative w-4/5">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-x-20 gap-y-5 mt-5 mx-auto w-4/5">
          {restaurantList.map((list) => {
            return (
              <ProfileList
                key={list.list_id}
                name={list.name}
                description={list.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

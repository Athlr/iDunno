import React, { useEffect, useState } from "react";
import FriendsList from "./FriendsList";
import { useParams } from "react-router-dom";

export default function FriendPage() {
  const [friendInfo, setFriendInfo] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [search, setSearch] = useState("");
  const { friend_id } = useParams();

  const mainBackground = {
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/static/img/blob-background.svg"
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: `calc(100vh - 64px)`,
  };

  const fetchUserData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/friends/${friend_id}`;

    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });

    if (response.ok) {
      const data = await response.json();
      setFriendInfo(data);

      if (friendInfo === null) {
        return;
      }
    }
  };

  const fetchRestaurantListData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/restaurant-list/user/${friend_id}`;

    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });

    if (response.ok) {
      const data = await response.json();
      setRestaurantList(data);
    }
  };

  useEffect(() => {
    fetchRestaurantListData();
    fetchUserData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div style={mainBackground}>
      <div className="container mx-auto pt-8 w-4/5 h-auto">
        <div className="photo-wrapper p-4 pt-8 flex bg-[#faf0e6] rounded-md">
          <img
            className="w-32 h-32 rounded-full"
            src={friendInfo.profile_pic}
            alt="John Doe"
          />
          <div className="p-2">
            <h3 className="text-xl text-gray-900 font-medium leading-8">
              {friendInfo.first_name} {friendInfo.last_name}
            </h3>
            <div className="text-gray-400 text-xs font-semibold">
              <p>@{friendInfo.username}</p>
            </div>
            <div className="pt-1">
              {friendInfo.favorited_id ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f4b688"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex items-end ml-auto"></div>
        </div>
      </div>
      <div className="container mx-auto mt-5 w-4/5 bg-[#faf0e6] h-4/6 overflow-y-scroll rounded-md">
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-x-20 gap-y-5 mt-5 mx-auto w-4/5">
          {restaurantList
            .filter((list) => {
              return list.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((list) => {
              return (
                <FriendsList
                  key={list.list_id}
                  listId={list.list_id}
                  picture={list.list_picture}
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

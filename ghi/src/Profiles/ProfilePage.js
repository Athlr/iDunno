import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import ProfileList from "./ProfileList";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";

export default function ProfilePage() {
  const { token } = useToken();
  const [userData, setUserData] = useState("");
  const [restaurantList, setRestaurantList] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEditProfile = () => {
    setIsEditOpen(true);
  };

  const closeEditProfile = () => {
    setIsEditOpen(false);
  };

  const mainBackground = {
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/static/img/blob-background.svg"
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: `calc(100vh - 64px)`,
  };

  const fetchUserData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/accounts`;

    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });

    if (response.ok) {
      const data = await response.json();
      setUserData(data);
    }
  };

  const fetchRestaurantListData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/restaurant-list`;

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
    if (token) {
      fetchRestaurantListData();
      fetchUserData();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return token ? (
    <>
      <EditProfile
        fetchUserData={() => fetchUserData()}
        isEditOpen={isEditOpen}
        closeEditProfile={() => closeEditProfile()}
      />
      <div style={mainBackground}>
        <div className="container mx-auto pt-8 w-4/5 h-auto">
          <div className="photo-wrapper p-4 pt-8 flex bg-[#faf0e6] rounded-md">
            <img
              className="w-32 h-32 rounded-full"
              src={userData.profile_picture_url}
              alt="user's profile"
            />
            <div className="p-2">
              <h3 className="text-xl text-gray-900 font-medium leading-8">
                {userData.first_name} {userData.last_name}
              </h3>
              <div className="text-gray-400 text-xs font-semibold">
                <p>@{userData.username}</p>
              </div>
            </div>
            <div className="flex items-end ml-auto ">
              <Link to="/restaurants/createList">
                <button className="mr-3 bg-zinc-200 hover:bg-black text-black hover:text-white outline outline-1 font-bold py-2 px-4 rounded-full">
                  Add Restaurant Lists
                </button>
              </Link>
              <button
                onClick={() => openEditProfile()}
                className="bg-zinc-200 hover:bg-black text-black hover:text-white outline outline-1 font-bold py-2 px-4 rounded-full"
              >
                Edit Profile
              </button>
            </div>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  <ProfileList
                    key={list.list_id}
                    listId={list.list_id}
                    picture={list.list_picture}
                    name={list.name}
                    description={list.description}
                    fetchRestaurantListData={() => fetchRestaurantListData()}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  ) : null;
}

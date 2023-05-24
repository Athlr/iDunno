import React, { useEffect, useState } from "react";
import FriendsCard from "./FriendsCard";
// import useToken from "@galvanize-inc/jwtdown-for-react";

export default function FriendsMain() {
  const [friendsList, setFriendsList] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  const fetchFriendsData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/friends`;

    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setFriendsList(data);
    }
  };

  useEffect(() => {
    fetchFriendsData();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-8 w-4/5">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Friends</h1>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search"
              className="p-2 border border-gray-400 rounded"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Button
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-20 gap-y-5 mx-auto mt-8 w-4/5">
        {friendsList.map((friend) => {
          return (
            <FriendsCard
              key={friend.friend_id}
              username={friend.username}
              first_name={friend.first_name}
              last_name={friend.last_name}
              profile_pic={friend.profile_pic}
            />
          );
        })}
      </div>
    </>
  );
}

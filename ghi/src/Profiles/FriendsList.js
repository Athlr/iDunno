import React from "react";
import { Link, useParams } from "react-router-dom";

export default function FriendsList({ listId, picture, name, description }) {
  const modalWidth = "calc(100% - 12rem)";
  const { friend_id } = useParams();
  return (
    <Link to={`/restaurants/${friend_id}/${listId}`}>
      <div className="flex justify-self-center flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full md:h-44 hover:bg-gray-100">
        <div className="rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg flex justify-center items-center">
          <img className="w-32 h-32" src={picture} alt="" />
        </div>
        <div
          className="flex flex-col justify-between p-4 leading-normal overflow-x-hidden"
          style={{ width: modalWidth }}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {name}
            <hr></hr>
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 whitespace-normal break-words">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

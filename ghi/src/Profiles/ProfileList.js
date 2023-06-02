import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProfileList({ listId, picture, name, description }) {
  const modalWidth = "calc(100% - 12rem)";

  return (
    // <Link to={`/restaurants/${listId}`}>
    //   <div className="flex justify-self-center flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    //     <img
    //       className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    //       src="https://cdn-icons-png.flaticon.com/128/284/284831.png"
    //       alt=""
    //     />
    //     <div className="flex flex-col justify-between p-4 leading-normal overflow-x-hidden">
    //       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
    //         {name}
    //       </h5>
    //       <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 whitespace-normal break-words">
    //         {description}
    //       </p>
    //     </div>
    //   </div>
    // </Link>
    <Link to={`/restaurants/${listId}`}>
      <div className="flex justify-self-center flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full md:h-44 hover:bg-gray-100">
        <div className="rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg flex justify-center items-center">
          <img className="w-32 h-32" src={picture} alt="" />
        </div>
        <div
          className="flex flex-col justify-between p-4 leading-normal overflow-x-hidden"
          style={{ width: modalWidth }}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            <div className="grid justify-items-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
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

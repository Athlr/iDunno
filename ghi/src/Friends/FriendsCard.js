import React, { useState } from "react";

export default function FriendsCard({
  username,
  first_name,
  last_name,
  profile_pic,
}) {
  // const [menuOpen, setMenuOpen] = useState(false);

  //   const handleUpdate = (e, stateFunction) => {
  //     const value = e.target.value;
  //     stateFunction(value);
  //   };

  return (
    <div className="max-w-xs w-52 mx-3 my-3 justify-self-center">
      <div className="bg-white shadow-xl rounded-lg py-3 bg-zinc-100">
        <div className="flex justify-end mr-3">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
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
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
          {/* <button onClick={() => setMenuOpen(!menuOpen)}>
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
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
            {menuOpen && (
              <div className="absolute bg-white shadow-lg rounded-lg py-2 z-10">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Delete Friend
                </button>
              </div>
            )}
          </button> */}
        </div>
        <div className="photo-wrapper p-2">
          <img
            className="w-32 h-32 rounded-full mx-auto"
            src={profile_pic}
            alt="John Doe"
          />
        </div>
        <div className="p-2">
          <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
            {first_name} {last_name}
          </h3>
          <div className="text-center text-gray-400 text-xs font-semibold">
            <p>@{username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";

export default function ProfileList({ name, description }) {
  return (
    // <a
    //   href="#"
    //   className="flex justify-self-center flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    // >
    //   <img
    //     className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    //     src="https://cdn.discordapp.com/attachments/1105246169736675350/1110310871764312074/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.png"
    //     alt=""
    //   />
    //   <div className="flex flex-col justify-between p-4 leading-normal">
    //     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //       {name}
    //     </h5>
    //     <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
    //       {description}
    //     </p>
    //   </div>
    // </a>
    <a
      href="#"
      className="flex justify-self-center flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src="https://cdn.discordapp.com/attachments/1105246169736675350/1110310871764312074/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.png"
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </a>
  );
}

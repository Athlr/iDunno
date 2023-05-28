import React, { useEffect, useState, Fragment } from "react";
import FriendsCard from "./FriendsCard";
import { Dialog, Transition } from "@headlessui/react";

export default function FriendsMain() {
  const [friendsList, setFriendsList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [addUsername, setAddUsername] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const openRequest = () => {
    setIsRequestOpen(true);
    fetchFriendRequests();
  };

  const closeRequest = () => {
    setIsRequestOpen(false);
  };

  const fetchFriendsData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/friends`;

    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Friends", data);
      setFriendsList(data);
    }
  };

  const fetchFriendRequests = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/requests`;

    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Requests", data);
      setFriendRequests(data);
    }
  };

  const addFriend = async () => {
    console.log(message);
    setMessage("");
    const url = `${process.env.REACT_APP_API_HOST}/requests`;

    const data = {
      receiver_username: addUsername,
    };

    const response = await fetch(url, {
      credentials: "include",
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setMessage(data);
      setAddUsername("");
    }
  };

  const acceptFriendRequest = async (request_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/requests/${request_id}`;

    const data = {
      status: "accepted",
    };

    const response = await fetch(url, {
      credentials: "include",
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      fetchFriendRequests();
      fetchFriendsData();
    }
  };

  const rejectFriendRequest = async (request_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/requests/${request_id}`;

    const data = {
      status: "rejected",
    };

    const response = await fetch(url, {
      credentials: "include",
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      fetchFriendRequests();
    }
  };

  useEffect(() => {
    fetchFriendsData();
  }, []);

  return (
    <>
      <Transition appear show={isRequestOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeRequest}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeRequest}
                    >
                      X
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add a Friend
                  </Dialog.Title>
                  <hr></hr>
                  <div className="relative my-2">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-0"
                      placeholder="Add friend by Username..."
                      value={addUsername}
                      onChange={(e) => setAddUsername(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="text-white absolute top-0 right-0 h-full bg-blue-700 hover:bg-blue-800 font-medium rounded-r-lg text-sm px-4 py-2"
                      onClick={addFriend}
                    >
                      Add Friend
                    </button>
                  </div>
                  <div className="my-2 text-sm mb-2 text-rose-600">
                    {message.message ? message.message : ""}
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Friend Requests
                  </Dialog.Title>
                  <hr></hr>
                  <div className="mt-2">
                    {friendRequests.map((request) => {
                      return (
                        <div
                          key={request.request_id}
                          className="w-full bg-zinc-100 py-4 px-6 flex rounded-md items-center justify-between mb-2"
                        >
                          <div className="text-sm text-gray-500">
                            <div className="font-bold">
                              {request.first_name} {request.last_name}
                            </div>
                            @{request.username}
                          </div>
                          <div>
                            <button
                              onClick={() =>
                                acceptFriendRequest(request.request_id)
                              }
                              className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M17.707 7.707a1 1 0 0 0-1.414-1.414L9 13.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l8-8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                rejectFriendRequest(request.request_id)
                              }
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 4.293a1 1 0 0 1 1.414 0L10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 0-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        // <div
                        //   key={request.request_id}
                        //   className="text-sm text-gray-5000"
                        // >
                        //   @{request.username}
                        // </div>
                      );
                    })}
                    <p className="flex text-sm text-gray-500 justify-end">
                      iDunno
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="container mx-auto mt-8 w-4/5">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Friends</h1>
          <div className="flex space-x-2">
            <div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => openRequest()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Friend Request
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-20 gap-y-5 mx-auto mt-8 w-4/5">
        {friendsList
          .filter((friend) => {
            const full_name = `${friend.first_name} ${friend.last_name}`;
            return (
              friend.username.toLowerCase().includes(search.toLowerCase()) ||
              full_name.toLowerCase().includes(search.toLowerCase())
            );
          })
          .map((friend) => {
            return (
              <FriendsCard
                key={friend.friend_id}
                friend_id={friend.friend_id}
                username={friend.username}
                first_name={friend.first_name}
                last_name={friend.last_name}
                profile_pic={friend.profile_pic}
                fetchFriendsData={() => fetchFriendsData()}
              />
            );
          })}
      </div>
    </>
  );
}

import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function EditProfile({
  fetchUserData,
  isEditOpen,
  closeEditProfile,
}) {
  const [userData, setUserData] = useState("");
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  const updateFirstName = async (user_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/accounts/${user_id}`;

    const data = {
      first_name: firstName,
      last_name: null,
      password: null,
      profile_picture: null,
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
      fetchUserData();
      setFirstName("");
      fetchUserDataModal();
    }
  };

  const updateLastName = async (user_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/accounts/${user_id}`;

    const data = {
      first_name: null,
      last_name: lastName,
      password: null,
      profile_picture: null,
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
      fetchUserData();
      setLastName("");
      fetchUserDataModal();
    }
  };

  const updatePassword = async (user_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/accounts/${user_id}`;

    const data = {
      first_name: null,
      last_name: null,
      password: password,
      profile_picture: null,
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
      fetchUserData();
      setPassword("");
      fetchUserDataModal();
    }
  };

  const updateProfilePicture = async (user_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/accounts/${user_id}`;

    const data = {
      first_name: null,
      last_name: null,
      password: null,
      profile_picture: pictureUrl,
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
      fetchUserData();
      setPictureUrl("");
      fetchUserDataModal();
    }
  };

  const fetchUserDataModal = async () => {
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

  useEffect(() => {
    fetchUserDataModal();
  }, []);

  useEffect(() => {
    if (isEditOpen) {
      fetchUserDataModal();
    }
  }, [isEditOpen]);

  useEffect(() => {
    setEmail(userData.email);
    setUsername(userData.username);
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setPassword("");
    setPictureUrl(userData.profile_picture_url);
  }, [userData]);

  return (
    <Transition appear show={isEditOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeEditProfile}>
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
                    onClick={closeEditProfile}
                  >
                    X
                  </button>
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Your Account
                </Dialog.Title>
                <hr className="mb-3"></hr>
                <Dialog.Title
                  as="h3"
                  className="text-md font-medium leading-6 text-gray-900"
                >
                  Edit Profile Picture:
                </Dialog.Title>
                <div className="photo-wrapper p-2 flex justify-center">
                  <img
                    className="w-24 h-24 rounded-full"
                    src={userData.profile_picture_url}
                    alt="user's profile"
                  />
                </div>
                <div className="relative my-2">
                  <select
                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-0"
                    onChange={(e) => setPictureUrl(e.target.value)}
                    required
                    defaultValue={pictureUrl}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="https://images.coplusk.net/project_images/208626/image/2019-11-27-210127-burger.jpg">
                      Dog Burger
                    </option>
                    <option value="https://images.coplusk.net/project_images/208630/image/2019-11-27-210147-3c.jpg">
                      Fox Burger
                    </option>
                    <option value="https://images.coplusk.net/project_images/208627/image/2019-11-27-210132-burger2.jpg">
                      Bunny Burger
                    </option>
                    <option value="https://images.coplusk.net/project_images/208629/image/2019-11-27-205811-egg2.jpg">
                      Egg Burger
                    </option>
                    <option value="https://images.coplusk.net/project_images/208628/image/2019-11-27-205808-egg.jpg">
                      Egg
                    </option>
                  </select>
                  <button
                    type="submit"
                    className="text-white absolute top-0 right-0 h-full bg-blue-700 hover:bg-blue-800 font-medium rounded-r-lg text-sm px-4 py-2"
                    onClick={updateProfilePicture}
                  >
                    Update
                  </button>
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-md font-medium leading-6 text-gray-900"
                >
                  Edit Account Information:
                </Dialog.Title>
                <div className="text-sm">Username</div>
                <div className="relative my-2">
                  <input
                    type="text"
                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-0"
                    placeholder="Update Last Name..."
                    value={username}
                    readOnly
                  />
                </div>
                <div className="text-sm">Email</div>
                <div className="relative my-2">
                  <input
                    type="text"
                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-0"
                    placeholder="Update Last Name..."
                    value={email}
                    readOnly
                  />
                </div>
                <div className="text-sm">First Name</div>
                <div className="relative my-2">
                  <input
                    type="text"
                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-0"
                    placeholder="Update First Name..."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute top-0 right-0 h-full bg-blue-700 hover:bg-blue-800 font-medium rounded-r-lg text-sm px-4 py-2"
                    onClick={() => updateFirstName(userData.user_id)}
                  >
                    Update
                  </button>
                </div>
                <div className="text-sm">Last Name</div>
                <div className="relative my-2">
                  <input
                    type="text"
                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-0"
                    placeholder="Update Last Name..."
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute top-0 right-0 h-full bg-blue-700 hover:bg-blue-800 font-medium rounded-r-lg text-sm px-4 py-2"
                    onClick={() => updateLastName(userData.user_id)}
                  >
                    Update
                  </button>
                </div>
                <div className="text-sm">Password</div>
                <div className="relative my-2">
                  <input
                    type="password"
                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-0"
                    placeholder="Update Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute top-0 right-0 h-full bg-blue-700 hover:bg-blue-800 font-medium rounded-r-lg text-sm px-4 py-2"
                    onClick={updatePassword}
                  >
                    Update
                  </button>
                </div>

                <hr></hr>
                <div className="mt-2">
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
  );
}

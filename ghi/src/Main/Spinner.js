import React, { useState, useEffect, Fragment } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Dialog, Transition } from "@headlessui/react";
import useUser from "../useUser";

export default function SpinningCarousel() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [userSelectedRestaurants, setUserSelectedRestaurants] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [selectedUserList, setSelectedUserList] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [hasFirstRotation, setHasFirstRotation] = useState(false);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [friendsIsOpen, setFriendsIsOpen] = useState(false);
  const [userFriends, setUserFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectedFriendsProfiles, setSelectedFriendsProfiles] = useState([]);
  const [selectedFriendsLists, setSelectedFriendsLists] = useState([]);
  const [selectedFriendsList, setSelectedFriendsList] = useState({});
  const [selectedFriendsListsRestaurants, setSelectedFriendsListsRestaurants] =
    useState([]);
  const { token } = useToken();
  const { user } = useUser(token);

  function closeModal() {
    fetchFriendRestaurants();
    flatten();
    setSelectedUserList(null);
    if (
      selectedUserList === null &&
      Object.keys(selectedFriendsList).length === 0
    ) {
      fetchRestaurants();
    }
    setIsOpen(false);
  }

  function openFriendsModal() {
    setFriendsIsOpen(true);
  }

  function closeFriendModal() {
    setFriendsIsOpen(false);
  }

  const toggleRotation = () => {
    if (!isRotating) {
      setIsRotating(true);
      setHasFirstRotation(false);
    } else {
      setIsRotating(false);
      if (hasFirstRotation) {
        const updatedRestaurants = [...restaurants];
        const idx = getRandomRestaurant();
        const item = updatedRestaurants.splice(idx, 1)[0];
        updatedRestaurants.unshift(item);
        setRestaurants(updatedRestaurants);
        setHasFirstRotation(true);
        
      } else {
        const updatedRestaurants = [...restaurants];
        const idx = getRandomRestaurant();
        const item = updatedRestaurants.splice(idx, 1)[0];
        updatedRestaurants.unshift(item);
        setRestaurants(updatedRestaurants);
        
      }
    }
  };

  const getRandomRestaurant = () => {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    return randomIndex;
  };

  const handleCuisineChange = (event) => {
    const selectedCuisineValue = event.target.value;
    setSelectedCuisine(parseInt(selectedCuisineValue));
  };

  const handlePriceChange = (event) => {
    const selectedPrice = event.target.value;
    setSelectedPrice(selectedPrice);
  };

  const handleUserListChange = (event) => {
    const selectedList = event.target.value;
    setSelectedUserList(selectedList);
  };

  const handleFriendChange = (friendId) => {
    if (selectedFriends.includes(parseInt(friendId))) {
      setSelectedFriends(
        selectedFriends.filter((id) => id !== parseInt(friendId))
      );
    } else {
      setSelectedFriends([...selectedFriends, parseInt(friendId)]);
    }
  };

  const handleFriendListChange = (listId, dropdownId) => {
    setSelectedFriendsList((prevData) => {
      const updatedSelections = { ...prevData };
      if (listId === "") {
        delete updatedSelections[dropdownId];
      } else {
        updatedSelections[dropdownId] = parseInt(listId);
      }
      return updatedSelections;
    });
    fetchFriendRestaurants();
  };

  const fetchFriendData = async () => {
    const responses = await Promise.all(
      selectedFriends.map((friend_id) =>
        fetch(`${process.env.REACT_APP_API_HOST}/friends/${friend_id}`, {
          credentials: "include",
          method: "get",
        }).then((response) => response.json())
      )
    );

    const friendProfiles = responses.map((data) => ({
      id: data.friend_id,
      username: data.username,
    }));

    return friendProfiles;
  };

  const fetchFriendLists = async () => {
    const responses = await Promise.all(
      selectedFriends.map((friend_id) =>
        fetch(
          `${process.env.REACT_APP_API_HOST}/restaurant-list/user/${friend_id}`,
          { credentials: "include", method: "get" }
        ).then((response) => response.json())
      )
    );

    const friendsList = responses.flatMap((data) =>
      data.map((item) => ({
        id: item.list_id,
        name: item.name,
        user_id: item.user_id,
      }))
    );
    return friendsList;
  };

  const fetchRestaurants = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/sponsored`;
    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });

    if (response.ok) {
      const data = await response.json();
      setRestaurants(data);
    }
  };

  const fetchCuisine = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/cuisine-list`;
    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });
    if (response.ok) {
      const data = await response.json();
      setCuisines(data);
    }
  };

  const fetchUserLists = async () => {
    if (token) {
      const url = `${process.env.REACT_APP_API_HOST}/restaurant-list/user/${user.id}`;
      const response = await fetch(url, {
        credentials: "include",
        method: "get",
      });

      if (response.ok) {
        const data = await response.json();
        setUserLists(data);
      }
    } else {
    }
  };

  const fetchFreinds = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/friends`;
    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });
    if (response.ok) {
      const data = await response.json();
      setUserFriends(data);
    }
  };

  const fetchFriendRestaurants = async () => {
    for (const list of Object.values(selectedFriendsList)) {
      const url = `${process.env.REACT_APP_API_HOST}/restaurant_list/${list}/restaurants`;
      const response = await fetch(url, {
        credentials: "include",
        method: "get",
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedFriendsListsRestaurants((prevState) => ({
          ...prevState,
          [list]: data,
        }));
      }
    }
  };

  const fetchUsersRestaurants = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/restaurant_list/${selectedUserList}/restaurants`;
    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });

    if (response.ok) {
      const data = await response.json();
      setUserSelectedRestaurants(data);
    }
  };

  const filterRestaurants = () => {
    let filterRestaurants = restaurants;
    if (selectedCuisine !== null) {
      filterRestaurants = filterRestaurants.filter(
        (restaurant) => restaurant.cuisine_id === selectedCuisine
      );
    }

    if (selectedPrice !== "") {
      filterRestaurants = filterRestaurants.filter(
        (restaurant) => restaurant.price === selectedPrice
      );
    }

    setFilteredRestaurants(filterRestaurants);
  };

  function flatten() {
    const result = [];
    for (let key in selectedFriendsListsRestaurants) {
      if (selectedFriendsListsRestaurants.hasOwnProperty(key)) {
        const value = selectedFriendsListsRestaurants[key];

        if (Array.isArray(value)) {
          result.push(...value);
        } else {
          result.push(value);
        }
      }
    }
    result.push(...userSelectedRestaurants);
    setRestaurants(result);
    return result;
  }

  function openModal() {
    setIsOpen(true);
    setRestaurants([]);
    setSelectedFriendsList({});
    setSelectedFriendsListsRestaurants([]);
    setSelectedPrice("");
    setSelectedCuisine(null);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (selectedFriends.length === 0) {
        setSelectedFriendsProfiles([]);
        setSelectedFriendsLists([]);
        return;
      }

      const profiles = await fetchFriendData();
      setSelectedFriendsProfiles(profiles);
      const lists = await fetchFriendLists();
      setSelectedFriendsLists(lists);
    };
    fetchData();
  }, [selectedFriends]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isRotating) {
      setHasFirstRotation(false);
      setTimeout(() => {
        setIsRotating(false);
        if (hasFirstRotation) {
          const updatedRestaurants = [...restaurants];
          const idx = getRandomRestaurant();
          const item = updatedRestaurants.splice(idx, 1)[0];
          updatedRestaurants.unshift(item);
          setHasFirstRotation(true);
        } else {
          const updatedRestaurants = [...restaurants];
          const idx = getRandomRestaurant();
          const item = updatedRestaurants.splice(idx, 1)[0];
          updatedRestaurants.unshift(item);
          setRestaurants(updatedRestaurants);
        }
      }, 1500);
    }
  }, [isRotating]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedFriendsList) {
      fetchFriendRestaurants();
    }
  }, [selectedFriendsList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchRestaurants();
    fetchCuisine();
    if (token) {
      fetchFreinds();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedUserList) {
      fetchUsersRestaurants();
    }
  }, [selectedUserList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user) {
      fetchUserLists();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    filterRestaurants();
  }, [restaurants]); // eslint-disable-line react-hooks/exhaustive-deps

  const placeholderCount = Math.max(9 - filteredRestaurants.length, 0);
  const placeholderFaces = Array.from(
    { length: placeholderCount },
    (_, index) => index
  
  );


  let faceCount = Math.floor(Math.random() * 4) + 3;

  return (
    <div className="h-full w-full flex flex-col items-center overflow-hidden">
      <div className="container mx-auto flex-grow">
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Filtering Options:
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Cuisines:</p>
                    </div>
                    {cuisines.length > 0 && (
                      <div
                        className="mt-4"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                        }}
                      >
                        {cuisines.map((cuisine, index) => (
                          <div key={index}>
                            <input
                              type="radio"
                              value={cuisine.cuisine_id}
                              id={cuisine.cuisine_id}
                              defaultChecked={
                                cuisine.cuisine_id === selectedCuisine
                              }
                              onClick={handleCuisineChange}
                              name="cuisint-radion"
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <label
                              htmlFor={cuisine.cuisine_id}
                              className={`inline-flex items-center mb-2
                          ${
                            cuisine.cuisine_id === selectedCuisine?.id
                              ? "text-blue-900"
                              : "text-gray-700"
                          }`}
                            >
                              <span className="ml-2">{cuisine.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Price:</p>
                    </div>
                    <div className="mt-4">
                      <div className="mt-4">
                        <div className="radio-buttons">
                          <button
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                              padding: "5px 10px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              cursor: "pointer",
                              backgroundColor:
                                selectedPrice === "$" ? "#ccc" : "",
                            }}
                            className={`radio-button ${
                              selectedPrice === "$" ? "selected" : ""
                            }`}
                            value={"$"}
                            onClick={handlePriceChange}
                          >
                            $
                          </button>
                          <button
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                              padding: "5px 10px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              cursor: "pointer",
                              backgroundColor:
                                selectedPrice === "$$" ? "#ccc" : "",
                            }}
                            className={`radio-button ${
                              selectedPrice === "$$" ? "selected" : ""
                            }`}
                            value={"$$"}
                            onClick={handlePriceChange}
                          >
                            $$
                          </button>
                          <button
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                              padding: "5px 10px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              cursor: "pointer",
                              backgroundColor:
                                selectedPrice === "$$$" ? "#ccc" : "",
                            }}
                            className={`radio-button ${
                              selectedPrice === "$$$" ? "selected" : ""
                            }`}
                            value={"$$$"}
                            onClick={handlePriceChange}
                          >
                            $$$
                          </button>
                          <button
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                              padding: "5px 10px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              cursor: "pointer",
                              backgroundColor:
                                selectedPrice === "$$$$" ? "#ccc" : "",
                            }}
                            className={`radio-button ${
                              selectedPrice === "$$$$" ? "selected" : ""
                            }`}
                            value={"$$$$"}
                            onClick={handlePriceChange}
                          >
                            $$$$
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">User Lists:</p>
                    </div>
                    {userLists.length > 0 && (
                      <div className="mt-4">
                        <select
                          onChange={handleUserListChange}
                          className="form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value={null}>Select Your List!</option>
                          {userLists.map((userList) => (
                            <option
                              key={userList.list_id}
                              value={userList.list_id}
                            >
                              {userList.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Friends:</p>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={openFriendsModal}
                        >
                          Eatting with a buddy?
                        </button>
                      </div>
                      <Transition appear show={friendsIsOpen} as={Fragment}>
                        <Dialog
                          as="div"
                          className="relative z-10"
                          onClose={closeFriendModal}
                        >
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                  <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                  >
                                    Who are you eating with?:
                                  </Dialog.Title>
                                  <hr></hr>
                                  <Dialog.Title
                                    as="h4"
                                    className="text-md font-medium leading-6 text-gray-900 mt-1 mb-1"
                                  >
                                    Favorites:
                                  </Dialog.Title>
                                  <div className="space-y-2">
                                    {userFriends
                                      .filter((friend) => {
                                        return friend.favorited_id !== null;
                                      })
                                      .map((friend) => (
                                        <div
                                          key={friend.friend_id}
                                          className="flex items-center form-check"
                                        >
                                          <input
                                            type="checkbox"
                                            id={friend.friend_id}
                                            value={friend.friend_id}
                                            checked={selectedFriends.includes(
                                              friend.friend_id
                                            )}
                                            onChange={(e) =>
                                              handleFriendChange(e.target.value)
                                            }
                                            className="form-check-input text-blue-500"
                                          />
                                          <label
                                            htmlFor={friend.friend_id}
                                            className="ml-2 block text-sm text-gray-700"
                                          >
                                            {friend.username}
                                          </label>
                                        </div>
                                      ))}
                                  </div>
                                  <Dialog.Title
                                    as="h4"
                                    className="text-md font-medium leading-6 text-gray-900 mt-1 mb-1"
                                  >
                                    Friends:
                                  </Dialog.Title>
                                  <div className="space-y-2">
                                    {userFriends
                                      .filter((friend) => {
                                        return friend.favorited_id === null;
                                      })
                                      .map((friend) => (
                                        <div
                                          key={friend.friend_id}
                                          className="flex items-center form-check"
                                        >
                                          <input
                                            type="checkbox"
                                            id={friend.friend_id}
                                            value={friend.friend_id}
                                            checked={selectedFriends.includes(
                                              friend.friend_id
                                            )}
                                            onChange={(e) =>
                                              handleFriendChange(e.target.value)
                                            }
                                            className="form-check-input text-blue-500"
                                          />
                                          <label
                                            htmlFor={friend.friend_id}
                                            className="ml-2 block text-sm text-gray-700"
                                          >
                                            {friend.username}
                                          </label>
                                        </div>
                                      ))}
                                  </div>
                                </Dialog.Panel>
                              </Transition.Child>
                            </div>
                          </div>
                        </Dialog>
                      </Transition>
                      <div className="mt-4">
                        {selectedFriendsProfiles.map((friendProfile) => (
                          <div key={friendProfile.id}>
                            <label
                              htmlFor={`dropdown-${friendProfile.id}`}
                              className="text-sm text-gray-500"
                            >
                              {friendProfile.username}:{" "}
                            </label>
                            <select
                              id={`dropdown-${friendProfile.id}`}
                              className="form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              style={{ width: "200px", marginTop: "5px" }}
                              onChange={(event) =>
                                handleFriendListChange(
                                  event.target.value,
                                  `dropdown-${friendProfile.id}`
                                )
                              }
                            >
                              <option key={""} value={""}>
                                Your buddy's Lists!
                              </option>
                              {selectedFriendsLists
                                .filter(
                                  (friendList) =>
                                    friendList.user_id === friendProfile.id
                                )
                                .map((filteredFriendList) => (
                                  <option
                                    key={filteredFriendList.id}
                                    value={filteredFriendList.id}
                                  >
                                    {filteredFriendList.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Filter!
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <div
          className="container"
          style={{
            position: "relative",
            width: "320px",
            margin: "100px auto 0 auto",
            perspective: "1000px",
            transform: "rotateY(50deg)", // Neat place to change size of the frames.
          }}
        >
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 9999,
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              animation: isRotating ? "rotate360 1s infinite linear" : "none",
            }}
          >
            {filteredRestaurants.slice(0, 9).map((restaurant, index) => {
              if (faceCount % 3 === 0) {
                faceCount += 1;
                if (index === 7) {
                    return (
                      <a href={`${process.env.PUBLIC_URL}/question`} 
                      style={{
                            position: "absolute",
                            width: "300px",
                            height: "187px",
                            top: "20px",
                            left: "10px",
                            right: "10px",
                            backgroundSize: "cover",
                            backgroundColor: "#b76f53",
                            border: "2px solid black",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            transform: `rotateY(${index * 40}deg) translateZ(430px)`,
                            color: "#aa3e29",
                            textShadow: "1px 1px 1px black",
                            fontSize: "20px",
                          }}>
                        <div
                          key={index}
                        >
                          <h3>
                            {restaurant ? restaurant.name : "No Restaurant Exist"}
                          </h3>
                        </div>
                      </a>
                    );
                  }else{
                     return (
                        <div
                          key={index}
                          style={{
                            position: "absolute",
                            width: "300px",
                            height: "187px",
                            top: "20px",
                            left: "10px",
                            right: "10px",
                            backgroundSize: "cover",
                            backgroundColor: "#b76f53",
                            border: "2px solid black",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            transform: `rotateY(${index * 40}deg) translateZ(430px)`,
                            color: "#aa3e29",
                            textShadow: "1px 1px 1px black",
                            fontSize: "20px",
                          }}
                        >
                          <h3>
                            {restaurant ? restaurant.name : "No Restaurant Exist"}
                          </h3>
                        </div>
                    );
                  }
              } else if (faceCount % 3 === 1) {
                faceCount += 1;
                if (index === 7) {
                  return (
                    <a href={`${process.env.PUBLIC_URL}/question`} 
                    style={{
                          position: "absolute",
                          width: "300px",
                          height: "187px",
                          top: "20px",
                          left: "10px",
                          right: "10px",
                          backgroundSize: "cover",
                          backgroundColor: "#f9a240",
                          border: "2px solid black",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          transform: `rotateY(${index * 40}deg) translateZ(430px)`,
                          color: "#f58057",
                          textShadow: "1px 1px 1px black",
                          fontSize: "20px",
                        }}>
                      <div
                        key={index}
                      >
                        <h3>
                          
                            {restaurant ? restaurant.name : "No Restaurant Exist"}
                        
                        </h3>
                      </div>
                    </a>  
                    );
                  }else{
                      return (
                        <div
                          key={index}
                          style={{
                            position: "absolute",
                            width: "300px",
                            height: "187px",
                            top: "20px",
                            left: "10px",
                            right: "10px",
                            backgroundSize: "cover",
                            backgroundColor: "#f9a240",
                            border: "2px solid black",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            transform: `rotateY(${index * 40}deg) translateZ(430px)`,
                            color: "#f58057",
                            textShadow: "1px 1px 1px black",
                            fontSize: "20px",
                          }}
                        >
                          <h3>
                            
                              {restaurant ? restaurant.name : "No Restaurant Exist"}
                            
                          </h3>
                        </div>
                      );
                  }
              } else {
                faceCount += 1;
                if (index === 7) {
                  return (
                    <a href={`${process.env.PUBLIC_URL}/question`} 
                    style={{
                          position: "absolute",
                          width: "300px",
                          height: "187px",
                          top: "20px",
                          left: "10px",
                          right: "10px",
                          backgroundSize: "cover",
                          backgroundColor: "#A1BD98",
                          border: "2px solid black",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          transform: `rotateY(${index * 40}deg) translateZ(430px)`,
                          color: "#d4b66c",
                          textShadow: "1px 1px 1px black",
                          fontSize: "20px",
                        }}> 
                      <div
                        key={index}
                      >
                        <h3>
                          
                            {restaurant ? restaurant.name : "No Restaurant Exist"}
                          
                        </h3>
                      </div>
                    </a>
                  );
                  }else{
                    return (
                      <div
                        key={index}
                        style={{
                          position: "absolute",
                          width: "300px",
                          height: "187px",
                          top: "20px",
                          left: "10px",
                          right: "10px",
                          backgroundSize: "cover",
                          backgroundColor: "#A1BD98",
                          border: "2px solid black",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          transform: `rotateY(${index * 40}deg) translateZ(430px)`,
                          color: "#d4b66c",
                          textShadow: "1px 1px 1px black",
                          fontSize: "20px",
                        }}
                      >
                        <h3>
                          
                            {restaurant ? restaurant.name : "No Restaurant Exist"}
                          
                        </h3>
                      </div>
                    );
                  }
              }
            })}
            {placeholderFaces.map((index) => {
              if (faceCount % 3 === 0) {
                faceCount += 1;
                return (
                  <div
                    key={index}
                    style={{
                      position: "absolute",
                      width: "300px",
                      height: "187px",
                      top: "20px",
                      left: "10px",
                      right: "10px",
                      backgroundSize: "cover",
                      backgroundColor: "#b76f53",
                      border: "2px solid black",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      transform: `rotateY(${
                        (filteredRestaurants.length + index) * 40
                      }deg) translateZ(430px)`,
                      color: "#aa3e29",
                      textShadow: "1px 1px 1px black",
                      fontSize: "20px",
                    }}
                  >
                    <h3>iDunno</h3>
                  </div>
                );
              } else if (faceCount % 3 === 1) {
                faceCount += 1;
                return (
                  <div
                    key={index}
                    style={{
                      position: "absolute",
                      width: "300px",
                      height: "187px",
                      top: "20px",
                      left: "10px",
                      right: "10px",
                      backgroundSize: "cover",
                      backgroundColor: "#f9a240",
                      border: "2px solid black",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      transform: `rotateY(${
                        (filteredRestaurants.length + index) * 40
                      }deg) translateZ(430px)`,
                      color: "#f58057",
                      textShadow: "1px 1px 1px black",
                      fontSize: "20px",
                    }}
                  >
                    <h3>iDunno</h3>
                  </div>
                );
              } else {
                faceCount += 1;
                return (
                  <div
                    key={index}
                    style={{
                      position: "absolute",
                      width: "300px",
                      height: "187px",
                      top: "20px",
                      left: "10px",
                      right: "10px",
                      backgroundSize: "cover",
                      backgroundColor: "#e1b773",
                      border: "2px solid black",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      transform: `rotateY(${
                        (filteredRestaurants.length + index) * 40
                      }deg) translateZ(430px)`,
                      color: "#f8e5bc",
                      textShadow: "1px 1px 1px black",
                      fontSize: "20px",
                    }}
                  >
                    <h3>iDunno</h3>
                  </div>
                );
              }
            })}
            <style>
              {`
            @keyframes rotate360{
                0% {
    transform: rotateY(0deg);
    animation-timing-function: ease-in-out;
  }
  20% {
    transform: rotateY(-216deg);
    animation-timing-function: linear;
  }
  100% {
    transform: rotateY(-1080deg);
    animation-timing-function: linear;
  }
            }
            `}
            </style>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-2 mb-4 py-96">
          <button onClick={toggleRotation} className="btn">
            {isRotating ? "Stop" : "Start"}
          </button>
          {token && (
            <button onClick={openModal} className="btn">
              Filter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

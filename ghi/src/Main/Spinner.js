import React, { useState, useEffect, Fragment } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Dialog, Transition } from '@headlessui/react'
import useUser from '../useUser';

export default function SpinningCarousel() {
  const [restaurants, setRestaurants] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [selectedUserList, setSelectedUserList] = useState(null)
  const [isRotating, setIsRotating] = useState(false);
  const [hasFirstRotation, setHasFirstRotation] = useState(false);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [isOpen, setIsOpen] = useState(false)
  const { token } = useToken();
  const { user } = useUser(token);

  function closeModal() {
    filteredUserList();
    setIsOpen(false);

    setSelectedCuisine(null);
    setSelectedPrice('');
    
  }

  const getRandomRestaurant = () => {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    return restaurants[randomIndex].name;
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

  const fetchCuisine = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/cuisine-list`;
    const response = await fetch(url, {
        credentials: 'include',
        method: 'get',
      });
      if (response.ok) {
        const data = await response.json();
        setCuisines(data);
      }
  };

  const fetchUserLists = async () => {
    if(token) {
      const url = `${process.env.REACT_APP_API_HOST}/restaurant-list/user/${user.id}`;
      const response = await fetch(url, {
        credentials: 'include',
        method: 'get',
      });

      if (response.ok) {
        const data = await response.json();
        setUserLists(data);
      };

     }else{

     };
  };


  const filteredUserList = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/restaurant_list/${selectedUserList}/restaurants`;
    const response = await fetch(url, {
        credentials: 'include',
        method: 'get',
      });

      if (response.ok){
        if (selectedUserList && selectedCuisine !== null && selectedPrice !== ''){
          const data = await response.json();
          const filteredRestaurants = data.filter(restaurant => { 
            return (
              restaurant.cuisine_id === selectedCuisine &&
              restaurant.price === selectedPrice
            );
          });
          setRestaurants(filteredRestaurants);
          
      }else if (selectedUserList && selectedCuisine !== null){
          const data = await response.json();
          const filteredRestaurants = data.filter(restaurant => { 
            return (
              restaurant.cuisine_id === selectedCuisine
            );
          });
          setRestaurants(filteredRestaurants);
        }else if (selectedUserList && selectedPrice !== ''){
          const data = await response.json();
          const filteredRestaurants = data.filter(restaurant => { 
            return (
              restaurant.price === selectedPrice
            );
          });
          setRestaurants(filteredRestaurants);
        }else if (selectedUserList){
          const data = await response.json();
          setRestaurants(data);
        }else{
          fetchRestaurants();
        }
      }
  };


  const fetchRestaurants = async () => {
      if (!token){
      const url = `${process.env.REACT_APP_API_HOST}/sponsored`;
      const response = await fetch(url, {
        credentials: 'include',
        method: 'get',
      });

      if (response.ok) {
        const data = await response.json();
        setRestaurants(data);
      }
    }else{
      
    };
  }; 


  function openModal() {
    setIsOpen(true)
  };

  const toggleRotation = () => {
    if (!isRotating) {
      setIsRotating(true);
      setHasFirstRotation(false);
    } else {
      setIsRotating(false);
      if (hasFirstRotation) {
        const updatedRestaurants = [...restaurants];
        updatedRestaurants[0] = getRandomRestaurant();
        setRestaurants(updatedRestaurants);
        setHasFirstRotation(true);
      } else {
        const updatedRestaurants = [...restaurants];
        updatedRestaurants[0].name = getRandomRestaurant();
        setRestaurants(updatedRestaurants);
      }
    }
  };


  useEffect(() => {
    let timeoutID;
    if (isRotating){
      setHasFirstRotation(false);
      timeoutID = setTimeout(() => {
        setIsRotating(false);
      if (hasFirstRotation) {
        const updatedRestaurants = [...restaurants];
        updatedRestaurants[0] = getRandomRestaurant();
        setRestaurants(updatedRestaurants);
        setHasFirstRotation(true);
      } else {
        const updatedRestaurants = [...restaurants];
        updatedRestaurants[0].name = getRandomRestaurant();
        setRestaurants(updatedRestaurants);
      }
      }, 3000);
    }
  }, [isRotating]);

 
  useEffect(() => {
  
    fetchRestaurants();
    fetchCuisine();
    
  }, []);

  useEffect(() => {
    if (user){
    fetchUserLists();
    };
  },[user]);

  const placeholderCount = Math.max(9 - restaurants.length, 0);
  const placeholderFaces = Array.from({ length: placeholderCount }, (_, index) => index);

  return (
    <div>
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
                    <p className="text-sm text-gray-500">
                     Cuisines:
                    </p>
                  </div>
                  {cuisines.length > 0 && (
                    <div className='mt-4'>
                    {cuisines.map((cuisine, index) =>(
                      <div key={index} >
                        <input 
                        type='radio'
                        value={cuisine.cuisine_id}
                        id={cuisine.cuisine_id}
                        defaultChecked={cuisine.cuisine_id === selectedCuisine}
                        onClick={handleCuisineChange}
                        name='cuisint-radion'
                        className="form-radio h-4 w-4 text-blue-600"
                        />
                      <label 
                        htmlFor={cuisine.cuisine_id}
                        className={`inline-flex items-center mb-2 
                          ${cuisine.cuisine_id === selectedCuisine?.id ? 'text-blue-900' : 'text-gray-700'}`}>
                        <span className='ml-2'>{cuisine.name}</span>
                      </label>
                      </div>
                    ))}
                  </div>
                  )}
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                     Price:
                    </p>
                  </div>
                  <div className='mt-4'>
                    <div className="mt-4">
                      <div className="radio-buttons">
                        <button
                          style={{
                          display: 'inline-block',
                          marginRight: '10px',
                          padding: '5px 10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          backgroundColor: selectedPrice === '$' ? '#ccc' : ''
                          }}
                          className={`radio-button ${selectedPrice === '$' ? 'selected' : ''}`}
                          value={'$'}
                          onClick={handlePriceChange}
                        >
                          $
                        </button>
                        <button
                          style={{
                          display: 'inline-block',
                          marginRight: '10px',
                          padding: '5px 10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          backgroundColor: selectedPrice === '$$' ? '#ccc' : ''
                          }}
                          className={`radio-button ${selectedPrice === '$$' ? 'selected' : ''}`}
                          value={'$$'}
                          onClick={handlePriceChange}
                        >
                          $$
                        </button>
                        <button
                          style={{
                          display: 'inline-block',
                          marginRight: '10px',
                          padding: '5px 10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          backgroundColor: selectedPrice === '$$$' ? '#ccc' : ''
                          }}
                          className={`radio-button ${selectedPrice === '$$$' ? 'selected' : ''}`}
                          value={'$$$'}
                          onClick={handlePriceChange}
                        >
                          $$$
                        </button>
                        <button
                          style={{
                          display: 'inline-block',
                          marginRight: '10px',
                          padding: '5px 10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          backgroundColor: selectedPrice === '$$$$' ? '#ccc' : ''
                          }}
                          className={`radio-button ${selectedPrice === '$$$$' ? 'selected' : ''}`}
                          value={'$$$$'}
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
                        <option value="">Select a user list</option>
                        {userLists.map((userList) => (
                          <option key={userList.list_id} value={userList.list_id}>
                            {userList.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
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
        className='container'
        style={{ position: 'relative', 
        width: '320px', 
        margin: '100px auto 0 auto', 
        perspective: '1000px',
        transform: 'rotateY(50deg)' // Neat place to change size of the frames.
    }}
      >
        <div
          style={{
            position: 'fixed', top: 0, left: 0, zIndex: 9999,
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            animation: isRotating ? 'rotate360 1s infinite linear' : 'none',
          }}
        >
          {restaurants.slice(0, 9).map((restaurant, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: '300px',
                height: '187px',
                top: '20px',
                left: '10px',
                right: '10px',
                backgroundSize: 'cover',
                boxShadow: 'inset 0 0 0 2000px rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                transform: `rotateY(${index * 40}deg) translateZ(430px)`,
              }}
            >
              <h3>{restaurant.name}</h3>
            </div>
          ))};

          {placeholderFaces.map((index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: '300px',
                height: '187px',
                top: '20px',
                left: '10px',
                right: '10px',
                backgroundSize: 'cover',
                boxShadow: 'inset 0 0 0 2000px rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                transform: `rotateY(${(restaurants.length + index) * 40}deg) translateZ(430px)`,
              }}
            >
              Place Holder
            </div>
          ))}
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
      <div style={{ textAlign: 'center' }}>
        <button onClick={toggleRotation}>{isRotating ? 'Stop' : 'Start'}</button>
        <div>{token && (<button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Filter
        </button>)}</div>
      </div>
    </div>
  );
}
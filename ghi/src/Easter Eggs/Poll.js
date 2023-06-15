import React, { useEffect, useState } from "react";


export default function PollPage(){
    const [fingersCount, setFingersCount] = useState(null);
    const [legsCount, setLegsCount] = useState(null);
    const [legsPressed, setLegsPressed] = useState(false);
    const [fingersPressed, setFingersPressed] = useState(false)

    const fetchCountData = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/question`;
        const response = await fetch(url, {
        credentials: "include",
        method: "get",
        });

        const data = await response.json();

        const fingerData = data.find(item => item.id === 1);
        const legsData = data.find(item => item.id === 2);

        const fingersCount = fingerData["count"];
        const legsCount = legsData["count"];

        setFingersCount(fingersCount);
        setLegsCount(legsCount);

        };

    useEffect(() => {
        fetchCountData()
    },[]);

    const handleFingersButtonClick = async () => {
        const newFingersCount = fingersCount + 1;
        const url = `${process.env.REACT_APP_API_HOST}/question/1`;
        const response = await fetch(url, {
            credentials: "include",
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ count: newFingersCount }),
        });
        if (response.ok) {
            setFingersCount(newFingersCount);
            setFingersPressed(true);
        } else {
            console.log("Error updating fingers count");
        }
        };


        const handleLegsButtonClick = async () => {
        const newLegsCount = legsCount + 1;
        const url = `${process.env.REACT_APP_API_HOST}/question/2`;
        const response = await fetch(url, {
            credentials: "include",
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ count: newLegsCount }),
        });
        if (response.ok) {
            setLegsCount(newLegsCount);
            setLegsPressed(true);
        } else {
            console.log("Error updating fingers count");
        }
        };

    return (
    <div style={{ backgroundColor: "rgb(75, 0, 130)", height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
        <div>
        <h1 style={{ textAlign: "center", fontSize: "3rem" }}>The Big Question</h1>
        <h2 style={{ textAlign: "center", fontSize: "1.5rem" }}>Would you rather have:</h2>
        </div>
        <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center justify-center w-1/3 p-4 rounded-md">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div>
                <img
                    className="rounded-t-lg"
                    src={process.env.PUBLIC_URL + "/static/img/hotdog_fingers.png"}
                    alt=""
                    style={{ height: "300px", width: "100%" }}
                />
                </div>
                <div className="bg-navy p-5 rounded-b-lg">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                        Hotdog Fingers
                        </h5>
                    </div>
                    <p className="mb-3 font-normal text-gray-400 ">
                        Having hotdog fingers would undoubtedly 
                        be an unusual and peculiar experience. 
                        Picture this: instead of having regular human fingers, 
                        each of your fingers resembles a plump, perfectly cooked hotdog.
                    </p>
                    <button onClick={handleFingersButtonClick}
                    style={{ 
                        backgroundColor: "gray", 
                        color: "white", 
                        padding: "8px 16px", 
                        borderRadius: "4px",
                        pointerEvents: fingersPressed || legsPressed ? "none" : "auto",
                        opacity: fingersPressed || legsPressed ? 0.5 : 1, }}
                        >Make Your Choice!
                    </button>
                    {fingersPressed || legsPressed ? (
                        <p style={{ color: "white", marginTop: "8px" }}>
                            Fingers Count: {fingersCount}
                        </p>
                    ) : null}
                </div>
            </div>
            </div>
            <div className="flex items-center justify-center w-1/3 p-4 rounded-md">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div>
                <img
                    className="rounded-t-lg"
                    src={process.env.PUBLIC_URL + "/static/img/cactus_legs.png"}
                    alt=""
                    style={{ height: "300px", width: "100%" }}
                />
                </div>
                <div className="bg-navy p-5 rounded-b-lg">
                <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    Cactus Legs
                    </h5>
                </div>
                <p className="mb-3 font-normal text-gray-400 ">
                    Your legs would have a cactus-like exterior, 
                    characterized by sharp, spiky protrusions. 
                    The skin would be rough and textured, 
                    resembling the outer surface of a cactus plant. 
                    These spines could vary in size and shape, 
                    depending on the specific type of cactus leg.
                </p>
                <button onClick={handleLegsButtonClick}
                    style={{ 
                        backgroundColor: "gray", 
                        color: "white", 
                        padding: "8px 16px", 
                        borderRadius: "4px",
                        pointerEvents: fingersPressed || legsPressed ? "none" : "auto",
                        opacity: fingersPressed || legsPressed ? 0.5 : 1,
                     }}
                        >Make Your Choice!
                    </button>
                    {fingersPressed || legsPressed ? (
                        <p style={{ color: "white", marginTop: "8px" }}>
                            Legs Count: {legsCount}
                        </p>
                    ) : null}
                </div>
            </div>
            </div>
        </div>
    </div>
    );
}
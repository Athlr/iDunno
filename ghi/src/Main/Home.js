import { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";
import WheelComponent from "react-wheel-of-prizes";
import './Home.css';

export default function Home() {
    
    const segColors = ["black","grey","red","blue", "green"];
    const [sponsored, setSponsored] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useToken();
    const { user } = useUser(token);    
    



    const getSponsoredRestaurants = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/restaurants/`;
        const response = await fetch(url,{
            credentials: "include",
            method: "get",
        });
        if (response.ok){
            const data = await response.json();
            const sponsored = data.filter((restaurant) => restaurant.suggested === true);
            setSponsored(sponsored);
            const segmentNames = [];
            for (const restaurant of sponsored){
                segmentNames.push(restaurant.name);
            }
            setSponsored(segmentNames)
        }
        setLoading(false);
    };

    useEffect( () => {
        getSponsoredRestaurants();
    }, []);
  const onFinished = (winner) => {
    console.log(winner);
  };

    return (
    <div className="App">
      <h1>Spinner wheel Demo for TDC</h1>
      <div className="Wheel-Container">
        {loading ? (
            <div>Loading ... </div>
         ): (
        <WheelComponent
          segments={sponsored}
          segColors={segColors}
          winningSegment="MM"
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Start"
          isOnlyOnce={false}
          size={190}
          upDuration={600}
          downDuration={700}
          fontFamily="Helvetica"
        />
         )};
      </div>
      <h2> Spin the wheel and win exiting offers</h2>
    </div>
  );
}
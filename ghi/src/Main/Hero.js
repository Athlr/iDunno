import React from "react";
import "animate.css/animate.min.css";

const Hero = () => {
  return (
    <div className="hero-section flex justify-between items-center bg-salmon py-20">
      <div className="text-section w-1/2 px-10">
        <h1 className="animate__animated animate__fadeInUp text-6xl font-semibold text-woodland mb-10 pb-11">
          Making decisions is hard.
          <br /> Let us help you make them.
          <br />
          Sit in voluptate esse voluptate enim culpa minim.
        </h1>
        <p className="animate__animated animate__fadeInUp text-4xl text-woodland">
          Our application allows the user to create a list of restaurants, then
          we will choose one for you! Sunt consectetur incididunt irure commodo
          aute adipisicing. Ut aliquip incididunt eiusmod dolor dolore voluptate
          aliquip in veniam adipisicing incididunt. Pariatur fugiat velit id
          dolore magna reprehenderit cupidatat enim esse magna officia quis sint
          in. Nulla aute enim occaecat excepteur nulla minim.
        </p>
      </div>
      <style>
        {`.custom-shakeY {
          animation-duration: 12s;
        }`}
      </style>
      <div className="animate__animated animate__shakeY animate__infinite custom-shakeY image-section w-1/2">
        <img
          src="./static/img/burgericon.png"
          alt="Restaurant"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};
export default Hero;

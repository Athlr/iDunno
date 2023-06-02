import React from "react";

const Hero = () => {
  return (
    <div className="hero-section flex justify-between items-center bg-salmon py-20">
      <div className="text-section w-1/2 px-10">
        <h1 className="text-6xl font-semibold text-white mb-8 pb-8">
          Making decisions is hard.
          <br /> Let us help you make them.
        </h1>
        <p className="text-2xl text-white">
          Our application allows the user to create a list of restaurants, then
          we will choose one for you!
        </p>
      </div>
      <div className="image-section w-1/2">
        <img
          src="/burgericon.png"
          alt="Restaurant"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default Hero;

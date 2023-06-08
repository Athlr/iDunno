import React from "react";
import "animate.css/animate.min.css";
import "tailwindcss/tailwind.css";

const Hero = () => {
  return (
    <div className="relative hero-section bg-salmon w-screen h-screen">
      <video
        autoPlay
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src={process.env.PUBLIC_URL + "/static/img/idunno_landing_3.mp4"}
          type="video/mp4"
        />
      </video>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="font-league mb-5 text-6xl font-bold text-woodland">
            iDunno
          </h1>
          <p className="mb-5 text-2xl text-woodland w-full">
            For when you just don't know. We do.
          </p>
          <button
            className="btn btn-primary text-xl px-10 py-2 bg-woodland border-none hover:bg-darkCyan"
            onClick={() => {
              const carousel = document.getElementById("carousel");
              if (carousel) {
                carousel.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

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

//   return (
//     <div className="hero-section flex justify-between items-center bg-salmon py-20">
//       <div className="text-section w-1/2 px-10">
//         <h1 className="animate__animated animate__fadeInUp text-6xl font-semibold text-woodland mb-10 pb-11">
//           Making decisions is hard.
//           <br /> Let us help you make them.
//           <br />
//           Sit in voluptate esse voluptate enim culpa minim.
//         </h1>
//         <p className="animate__animated animate__fadeInUp text-4xl text-woodland">
//           Our application allows the user to create a list of restaurants, then
//           we will choose one for you! Sunt consectetur incididunt irure commodo
//           aute adipisicing. Ut aliquip incididunt eiusmod dolor dolore voluptate
//           aliquip in veniam adipisicing incididunt. Pariatur fugiat velit id
//           dolore magna reprehenderit cupidatat enim esse magna officia quis sint
//           in. Nulla aute enim occaecat excepteur nulla minim.
//         </p>
//       </div>
// <style>
//   {`.custom-shakeY {
//     animation-duration: 12s;
//   }`}
// </style>
//       <div className="animate__animated animate__shakeY animate__infinite custom-shakeY image-section w-1/2">
//         <img
//           src="./static/img/burgericon.png"
//           alt="Restaurant"
//           className="object-cover h-full w-full"
//         />
//       </div>
//     </div>
//   );
// };

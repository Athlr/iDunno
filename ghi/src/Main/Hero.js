import React from "react";
import "animate.css/animate.min.css";
// import burgericon from "../Media/burgericon.png";
import idunno_landing_3 from "../Media/idunno_landing_3.mp4";
import "tailwindcss/tailwind.css";

// const Hero = () => {
//   return (
//     <div className="hero-section flex justify-between items-center bg-salmon py-20">
//       <div className="text-section w-1/2 px-10">
//         <h1 className="animate__animated animate__fadeInUp text-6xl font-semibold text-woodland mb-10 pb-11">
//           Making decisions is hard.
//           <br /> Let us help you make them.
//           <br />
//         </h1>
//         <p className="animate__animated animate__fadeInUp text-4xl text-woodland">
//           Our application allows the user to create a list of restaurants, then
//           we will choose one for you!
//         </p>
//       </div>
//       <style>
//         {`.custom-shakeY {
//           animation-duration: 12s;
//         }`}
//       </style>
//       <div className="animate__animated animate__shakeY animate__infinite custom-shakeY image-section w-1/2">
//         <img
//           src={burgericon}
//           alt="Restaurant"
//           className="object-cover h-full w-full"
//         />
//       </div>
//     </div>
//   );
// };
// export default Hero;

const Hero = () => {
  return (
    <div className="relative hero-section bg-salmon w-screen h-screen">
      <video
        autoPlay
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={idunno_landing_3} type="video/mp4" />
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

// const Hero = () => {
//   return (
//     <div className="hero min-h-screen" style={idunno_landing}>
//       <div className="hero-overlay bg-opacity-60"></div>
//       <div className="hero-content text-center text-neutral-content">
//         <div className="max-w-md">
//           <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
//           <p className="mb-5">
//             Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
//             excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
//             a id nisi.
//           </p>
//           <button className="btn btn-primary">Get Started</button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Hero;

import React from "react";
import Hero from "./Main/Hero";
import Cards from "./Main/Cards";
import SpinningCarousel from "./Main/Spinner";

// export default function MainPage() {
//   return (
//     <div className="flex flex-col items-center justify-center space-y-10">
//       <div className="w-full">
//         <Hero />
//       </div>
//       <div className="w-full h-full">
//         <SpinningCarousel />
//       </div>
//       <div className="w-full">
//         <Cards />
//       </div>
//     </div>
//   );
// }

export default function MainPage() {
  return (
    <>
      <div className="w-full h-full">
        <Hero />
      </div>
      <div id="carousel" className="w-full h-full">
        <SpinningCarousel />
      </div>
      <div className="w-full">
        <Cards />
      </div>
    </>
  );
}

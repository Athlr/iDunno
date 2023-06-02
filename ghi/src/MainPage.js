import react from "react";
import Hero from "./Main/Hero";
import SpinningCarousel from "./Main/Spinner";
import Cards from "./Main/Cards";

export default function MainPage() {
  return (
    <>
      <div>
        <Hero />
      </div>
      <div>
        <Cards />
      </div>
    </>
  );
}

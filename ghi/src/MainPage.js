import React from "react";
import Hero from "./Main/Hero";
import SpinningCarousel from "./Main/Spinner";
import WhoWeAre from "./Main/WhoWeAre";
import { useScroll, animated } from "@react-spring/web";

export default function MainPage() {
  const { scrollYProgress } = useScroll();
  const bgColor = scrollYProgress.to([0, 1], ["#f4b688", "#f09858"]);

  return (
    <animated.div
      style={{ background: bgColor }}
      className="flex flex-col min-h-screen overflow-x-hidden pb-2 overflow-y-hidden justify-center items-center"
    >
      <div className="h-screen flex items-center justify-center flex-shrink-0">
        <div className="w-full">
          <Hero />
        </div>
      </div>
      <div
        className="bg-darkCyan w-full h-20 flex justify-center items-center"
        id="carousel"
      >
        <div className="text-white text-4xl">Getting Started</div>
      </div>

      <div className="flex flex-col justify-center items-center md:flex-row mt-20 mb-10 px-4 w-4/5">
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <div className="flex flex-col mb-5 justify-center items-center text-center">
            <h1 className="font-league mb-5 text-6xl font-bold text-navy">
              How it works!
            </h1>
            <div className="max-w-lg p-6 bg-navy rounded-lg shadow">
              <p className="font-normal text-white">
                We've introduced a feature on our site that we're sure you're
                going to love - our Spinner. Simply click 'Start', and watch as
                it starts to turn. As it spins, it's actually sifting through a
                plethora of dining options, finding the perfect spot for you to
                eat. But that's not all!
                <br />
                <br />
                Once you sign in, you can edit the spinner to have your custom
                choices of cuisines, price and friends! Creating a shared list
                of favorites has never been easier! And here's where it gets
                interesting - the Spinner will sift through your combined
                favorites, making the task of choosing a place that everyone
                agrees on a breeze.
                <br />
                <br />
                The best part? There's a social media aspect too! You can add
                friends and favorite friends! After all, food tastes better when
                shared with friends, doesn't it?
              </p>
            </div>
          </div>
        </div>
        <div className="items-center w-full md:w-1/2 md:mt-0">
          <div className="mx-auto my-auto carousel-container">
            <SpinningCarousel />
          </div>
        </div>
      </div>
      <div className="bg-darkCyan w-full h-20 flex justify-center items-center">
        <div className="text-white text-4xl">
          Why You Should Register With us
        </div>
      </div>
      <div className="flex w-4/5 justify-center h-[48rem]">
        <div className="flex items-center justify-center w-1/3 p-4">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <img
                className="rounded-t-lg"
                src={
                  process.env.PUBLIC_URL + "/static/img/what_should_i_eat.png"
                }
                alt=""
              />
            </div>
            <div className="bg-navy p-5 rounded-b-lg">
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">
                  Internal Struggle
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-400">
                Ever been ensnared in the labyrinth of deciding where to dine?
                Or found yourself on the frontline of culinary clashes,
                defending the honor of pizza against the spicy allure of Thai
                food for the umpteenth time this week? The quest for the perfect
                meal can sometimes morph into an epic odyssey, a dance on the
                tightrope of taste and desire. Welcome to the gastronomic
                roulette - where every choice is a gamble and every turn could
                lead to an explosion of flavors.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-1/3 p-4 rounded-md">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <img
                className="rounded-t-lg"
                src={process.env.PUBLIC_URL + "/static/img/too_many.png"}
                alt=""
              />
            </div>
            <div className="bg-navy p-5 rounded-b-lg">
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                  Internal Desire
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-400 ">
                Does the paradox of choice have you in its grip? Standing in the
                heart of a metropolis with a thousand eateries, do you find
                yourself paralyzed by the smorgasbord of culinary delights on
                offer? From the comforting embrace of mom-and-pop diners to the
                avant-garde fusion cuisine that challenges the very concept of a
                'meal', our world is teeming with choices. But here's the
                question: in this ocean of options, how do we ever decide where
                to cast our nets? Is there such a thing as too much of a good
                thing?
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-1/3 p-4">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <video
                loop
                autoPlay
                muted
                className="top-0 left-0 w-full h-full object-cover"
              >
                <source
                  src={process.env.PUBLIC_URL + "/static/img/spin_it.mp4"}
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="bg-navy p-5 rounded-b-lg">
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                  Sweet Release
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-400">
                In this era of endless choices, it can feel like we're adrift on
                a sea of indecision. Each moment is a tide pulling us towards
                new horizons, with every decision echoing in the depths of
                possibility. It's exhilarating, yet overwhelming. It's freedom,
                yet a gilded cage. But amidst this dazzling kaleidoscope of
                choices, we are your lighthouse. Our app is the beacon that cuts
                through the fog of indecision, guiding you towards your perfect
                culinary match. Ready to embark on this gastronomic journey of a
                lifetime? Let's set sail together, into the uncharted waters of
                flavor and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-darkCyan w-full h-20 flex justify-center items-center">
        <div className="text-white text-4xl">Who We Are</div>
      </div>
      <div className="w-4/5">
        <WhoWeAre />
      </div>
    </animated.div>
  );
}

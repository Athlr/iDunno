import React from "react";
import Cards from "./Cards";

import { useSpring, animated } from "react-spring";
import { useInView } from "@react-spring/web";

export default function WhoWeAre() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-40% 0%",
  });

  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translate3d(0,0px,0)" : "translate3d(0,100px,0)",
    config: { mass: 1, tension: 280, friction: 120 },
  });

  return (
    <animated.div
      className="flex items-center justify-center text-white"
      style={springProps}
      ref={ref}
    >
      <div className="w-1/2">
        <Cards />
      </div>
      <div className="max-w-lg p-6 bg-navy rounded-lg shadow">
        <p>
          <div>
            We're a group of curious students, always exploring the different
            questions that life throws at us.
          </div>
          <br />
          <div>
            You know that moment when hunger strikes but the group chat turns
            into a battlefield of "I dunno, you pick" and "Not that place
            again"? Yeah, we've all been there. It's a universal hunger games,
            deciding where to eat that pleases everyone's taste buds.
          </div>
          <br />
          <div>
            Well, we thought, what if we can make this less of a headache and
            more of a game? Could we turn this daily struggle into an enjoyable
            experience? With this goal in mind, we decided to create a website
            that aims to resolve this exact problem.
          </div>
          <br />
          Our hope is that our website will help take the stress out of mealtime
          decisions. We want it to be a tool that helps you explore new places,
          satisfy diverse taste buds, and turn the task of choosing where to eat
          into a fun and engaging experience.
          <br />
          We hope you find our website helpful, and that it brings a little more
          joy to your everyday mealtime decisions.
        </p>
      </div>
      <style>
        {`.custom-shakeY {
          animation-duration: 12s;
        }`}
      </style>
      <div>
        <img
          className="animate__animated animate__shakeY animate__infinite custom-shakeY rounded-t-lg"
          src={process.env.PUBLIC_URL + "/static/img/burgericon.png"}
          alt=""
        />
      </div>
    </animated.div>
  );
}

import React from "react";

export default function Cards() {
  return (
    <div className="flex justify-center mt-6 space-x-6 bg-goldSand">
      <div className="flex flex-col items-center bg-grey space-y-4">
        <div className="w-64 h-80 bg-cognac border-gray-200 rounded-lg shadow p-8">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/aaron.png"
              alt="Aaron"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              Aaron Tran
            </h5>
            <span className="text-sm text-gray-900">Full Stack Engineer</span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <a
                href="https://www.linkedin.com/in/aaron-k-tran/"
                target="_blank"
                rel="noreferrer"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <img
                  className="h-11 w-11 mr-2"
                  src="/linkedin.png"
                  alt="LinkedIn Logo"
                />
              </a>
              <a
                href="https://gitlab.com/aatran2021"
                target="_blank"
                rel="noreferrer"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <img
                  className="h-11 w-12 mr-2"
                  src="/gitlabss.png"
                  alt="gitlab Logo"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="w-64 h-80 bg-cyan-600 border-gray-200 rounded-lg shadow p-8">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/luis.png"
              alt="Luis"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              Luis Bravo
            </h5>
            <span className="text-sm text-gray-900">Full Stack Engineer</span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <a
                href="https://www.linkedin.com/in/luis-fernando-bravo-morales-14a094254/"
                target="_blank"
                rel="noreferrer"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <img
                  className="h-11 w-15 mr-2"
                  src="/linkedin.png"
                  alt="LinkedIn Logo"
                />
              </a>
              <a
                href="https://gitlab.com/LuisBravo9900"
                target="_blank"
                rel="noreferrer"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <img
                  className="h-11 w-12 mr-2"
                  src="/gitlabss.png"
                  alt="gitlab Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center bg-grey space-y-4">
        <div className="w-64 h-80 bg-cyan-600 border-gray-200 rounded-lg shadow p-8">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/matt.png"
              alt="Matthew"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              Matthew Huff
            </h5>
            <span className="text-sm text-gray-900">Full Stack Engineer</span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <a
                href="https://www.linkedin.com/in/matthew-huff-6b4211125/"
                target="_blank"
                rel="noreferrer"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <img
                  className="h-11 w-11 mr-2"
                  src="/linkedin.png"
                  alt="LinkedIn Logo"
                />
              </a>
              <a
                href="https://gitlab.com/mhuff9112"
                target="_blank"
                rel="noreferrer"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <img
                  className="h-11 w-12 mr-2"
                  src="/gitlabss.png"
                  alt="gitlab Logo"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="w-64 h-80 bg-cyan-600 border-gray-200 rounded-lg shadow p-8">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/jb.png"
              alt="Justin"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              Justin Burgonio
            </h5>
            <span className="text-sm text-gray-900">Full Stack Engineer</span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <a
                href="https://www.linkedin.com/in/justinburgonio/"
                target="_blank"
                rel="noreferrer"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <img
                  className="h-11 w-11 mr-2"
                  src="/linkedin.png"
                  alt="LinkedIn Logo"
                />
              </a>
              <a
                href="https://gitlab.com/justinburgonio"
                target="_blank"
                rel="noreferrer"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <img
                  className="h-11 w-12 mr-2"
                  src="/gitlabss.png"
                  alt="gitlab Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
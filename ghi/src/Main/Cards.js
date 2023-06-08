import React from "react";
import aaron from "../Media/aaron.png";
import Luis from "../Media/Luis.png";
import jb from "../Media/jb.png";
import gitlabss from "../Media/gitlabss.png";
import MAtt from "../Media/MAtt.png";
import linkedin from "../Media/linkedin.png";

export default function Cards() {
  return (
    <div className="flex justify-center py-10 space-x-6 bg-salmon">
      <div className="flex items-center bg-grey space-x-6">
        <div className="animate__animated animate__fadeIn w-64 h-80 bg-darkCyan border-gray-200 rounded-lg shadow p-8">
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={aaron}
              alt="Aaron"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              Aaron Tran
            </h5>
            <span className="text-sm text-gray-900">Full Stack Engineer</span>
            <div className="flex mt-4 space-x-3">
              <a
                href="https://www.linkedin.com/in/aaron-k-tran/"
                target="_blank"
                rel="noreferrer"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <img
                  className="h-11 w-11 mr-2"
                  src={linkedin}
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
                  src={gitlabss}
                  alt="gitlab Logo"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="animate__animated animate__fadeIn w-64 h-80 bg-darkCyan border-gray-200 rounded-lg shadow p-8">
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={Luis}
              alt="Luis"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              Luis Bravo
            </h5>
            <span className="text-sm text-gray-900">Full Stack Engineer</span>
            <div className="flex mt-4 space-x-3">
              <a
                href="https://www.linkedin.com/in/luis-fernando-bravo-morales-14a094254/"
                target="_blank"
                rel="noreferrer"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <img
                  className="h-11 w-15 mr-2"
                  src={linkedin}
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
                  src={gitlabss}
                  alt="gitlab Logo"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="animate__animated animate__fadeIn w-64 h-80 bg-darkCyan border-gray-200 rounded-lg shadow p-8">
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={MAtt}
              alt="Matthew"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              Matthew Huff
            </h5>
            <span className="text-sm text-gray-900">Full Stack Engineer</span>
            <div className="flex mt-4 space-x-3">
              <a
                href="https://www.linkedin.com/in/matthew-huff-6b4211125/"
                target="_blank"
                rel="noreferrer"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <img
                  className="h-11 w-11 mr-2"
                  src={linkedin}
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
                  src={gitlabss}
                  alt="gitlab Logo"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="animate__animated animate__fadeIn w-64 h-80 bg-darkCyan border-gray-200 rounded-lg shadow p-8">
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={jb}
              alt="Justin"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              Justin Burgonio
            </h5>
            <span className="text-sm text-gray-900">Full Stack Engineer</span>
            <div className="flex mt-4 space-x-3">
              <a
                href="https://www.linkedin.com/in/justinburgonio/"
                target="_blank"
                rel="noreferrer"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <img
                  className="h-11 w-11 mr-2"
                  src={linkedin}
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
                  src={gitlabss}
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

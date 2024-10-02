'use client';
import axios from "axios";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Sixtyfour } from "next/font/google";
import { useState, useEffect } from "react";

const sf = Sixtyfour({
  display: "swap",
  weight: ["400"],
  subsets: ["latin"],
});

const playd = Playfair_Display({
  display: "swap",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const [name, setName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [previousIdeas, setPreviousIdeas] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false); // State for popup visibility

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}submit`, {
      name: name,
      idea: projectTitle,
      desc: projectDetails
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      maxBodyLength: 10000
    })
    .then((response) => {
      const newIdea = {
        idea: projectTitle,
        desc: projectDetails,
      };
      setPreviousIdeas((prev) => [newIdea, ...prev]);

      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 3000);
    })
    .catch((error) => {
      console.error('Some error occurred!', error);
    });

    setName("");
    setProjectDetails("");
    setProjectTitle("");
  };

  const toggleDescription = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <>
      <div className="min-h-screen overflow-hidden text-black relative" style={{ background: 'linear-gradient(to right, #191654, #43C6AC)'}}>
        <Link href="/">
          <img
            src="ieeecslogo.svg"
            width={150}
            height={150}
            alt="IEEE Computer Society Logo"
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-10 md:hidden transition-opacity duration-300 ${scrolling ? 'opacity-0' : 'opacity-100'}`}
          />
        </Link>

        <Link href="/">
          <img
            src="ieeecslogo.svg"
            width={200}
            height={200}
            alt="IEEE Computer Society Logo"
            className="absolute left-[1rem] top-[1rem] z-10 hidden md:block"
          />
        </Link>

        <div className="relative p-4 md:p-10 ">
          <h1 className={`text-4xl md:text-6xl font-bold text-center ${sf.className} mt-24 md:mt-0 text-white`}>
            Ideation Portal
          </h1>

          <div className={`mt-12 flex justify-center items-center ${playd.className}`}>
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-md lg:max-w-2xl"> 
              <h2 className="text-xl md:text-3xl font-semibold mb-4 md:mb-6 text-center">Submit Your Project Idea</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 md:mb-6">
                  <label htmlFor="name" className="block text-lg md:text-xl font-medium text-black mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="mb-4 md:mb-6">
                  <label htmlFor="title" className="block text-lg md:text-xl font-medium text-black mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required 
                  />
                </div>

                <div className="mb-4 md:mb-6">
                  <label htmlFor="details" className="block text-lg md:text-xl font-medium text-black mb-2">
                    Project Description
                  </label>
                  <textarea
                    id="details"
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required 
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-700 text-white font-semibold rounded-lg shadow hover:bg-indigo-500 transition-all duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>

              {popupVisible && (
                <div className="mt-4 text-center text-green-600 font-semibold">
                  Idea Submitted!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { useState, useEffect } from "react";

const manrope = Manrope({
  display: "swap",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const [name, setName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [previousIdeas, setPreviousIdeas] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}view`)
      .then((res) => {
        setPreviousIdeas(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); 

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
    })
    .catch((error) => {
      console.error('Some error occured!', error);
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
      <div className="h-screen overflow-auto md:overflow-hidden">
        <Image
          src="/background.jpg"
          layout="fill"
          objectFit="cover"
          className="absolute z-[-1]"
          alt="background"
        />
        
        <Link href="/">
          <Image
            src="ieeecslogo.svg"
            width={150}
            height={150}
            alt="IEEE Computer Society Logo"
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 md:hidden"
          />
        </Link>

        <Link href="/">
          <Image
            src="ieeecslogo.svg"
            width={200}
            height={200}
            alt="IEEE Computer Society Logo"
            className="absolute left-[1rem] top-[2rem] z-10 hidden md:block"
          />
        </Link>

        <div className="relative p-10">
          <h1 className={`text-4xl md:text-6xl font-bold text-center ${manrope.className} m-8 md:m-0`}>
            Ideation Portal
          </h1>

          <div className={`mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 ${manrope.className}`}>
            <div className="bg-white rounded-lg shadow-lg p-8 h-auto">
              <h2 className="text-3xl font-semibold mb-6">Submit Your Project</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-xl font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required // Added required attribute
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="title" className="block text-xl font-medium text-gray-700 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Enter project title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required // Added required attribute
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="details" className="block text-xl font-medium text-gray-700 mb-2">
                    Project Description
                  </label>
                  <textarea
                    id="details"
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    placeholder="Describe your project"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required // Added required attribute
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
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-semibold mb-6">Previous Ideas</h2>
              <div className="h-[30rem] overflow-y-auto space-y-6">
                {previousIdeas && previousIdeas.slice().reverse().map((idea, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                    onClick={() => toggleDescription(index)}
                  >
                    <h3 className="text-2xl font-semibold mb-2 text-indigo-700">
                      {idea.idea}
                    </h3>
                    <p className="text-gray-700">
                      {expanded === index
                        ? idea.desc
                        : idea.desc.length > 65
                          ? `${idea.desc.slice(0, 65)}...`
                          : idea.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

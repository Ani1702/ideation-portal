'use client'
import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { useState } from "react";

const manrope = Manrope({
  display: "swap",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const [name, setName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDetails, setProjectDetails] = useState('');

  const previousIdeas = [
    { title: "AI-Powered Chatbot", description: "A chatbot that uses AI to provide customer support." },
    { title: "Smart Home Automation", description: "An app to control home devices via a smartphone." },
    { title: "Fitness Tracker", description: "A wearable that tracks daily fitness activities." },
  ];

  return (
    <>
      <Image
        src="/background.jpg"
        width={10000}
        height={1000}
        className="absolute bg-cover z-[-1]"
      />
      <Link href="/">
        <Image
          src="ieeecslogo.svg"
          width={200}
          height={200}
          alt="IEEE Computer Society Logo"
          className="absolute left-[1rem] top-[2rem]"
        />
      </Link>

      <div className="relative p-10">
        <h1 className={`text-8xl font-bold text-center p-4 ${manrope.className}`}>
          IDEATION
        </h1>

        <div className={`mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 ${manrope.className}`}>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold mb-6">Submit Your Project</h2>
            <form>
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
                />
              </div>

              <div className="mb-6">
                <label htmlFor="details" className="block text-xl font-medium text-gray-700 mb-2">
                  Project Details
                </label>
                <textarea
                  id="details"
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  placeholder="Describe your project"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-500 transition-all duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold mb-6">Previous Ideas</h2>
            <div className="space-y-6">
              {previousIdeas.map((idea, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-2 text-indigo-700">
                    {idea.title}
                  </h3>
                  <p className="text-gray-700">{idea.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

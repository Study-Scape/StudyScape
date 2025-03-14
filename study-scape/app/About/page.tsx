"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Brandon",
      image: "/Brandon.jpg",
      bio: "I'm a second year computer science student here at UW and I helped implement the map and markers for Study Scape!"
    },
    {
      name: "Julie",
      image: "/Julie.jpeg",
      bio: "I'm a senior in computer science at UW. I love watching shows and reading romcoms in my free time. My usual study spot was truly my dorm desk at Maple Hall."
    },
    {
      name: "Michael",
      image: "/Michael.jpeg",
      bio: "I'm a 2nd year CS student at UW and I helped implement the map, markers, and navigation for StudyScape!"
    },
    {
      name: "Carl",
      image: "/Carl.jpg",
      bio: "I'm a junior in CS, and a NewJeans and The Bear enjoyer."
    },
    {
      name: "Dawn",
      image: "/Dawn.jpeg",
      bio: "Fifth-year in CS here (left)! Worked on the behind-the-scenes of StudyScape and I leave merge conflicts whereever I go."
    },
    {
      name: "Sanjana",
      image: "/Sanjana.jpg",
      bio: "I'm a third year computer science student and I worked on the frontend development of StudyScape, ensuring a seamless user experience."
    }
  ];

  return (
    <div className="p-8 bg-gradient-to-r from-indigo-50 to-purple-100">
      {/* Title */}
      <motion.h1 
        className="text-4xl font-extrabold text-purple-800 text-center mb-6"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        About StudyScape 📖
      </motion.h1>

      {/* Intro Section */}
      <motion.p 
        className="text-gray-700 text-lg text-center max-w-3xl mx-auto mb-6"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      > Meet the people behind StudyScape!🚀
      </motion.p>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {teamMembers.map((member, index) => (
          <motion.div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-40 h-48">
              <Image 
                src={member.image} 
                alt={`${member.name}'s photo`} 
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-2">{member.name}</h2>
            <p className="text-gray-600">{member.bio}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <motion.a 
          href="/" 
          className="px-6 py-3 bg-purple-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-purple-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          Explore Study Spots 🚀
        </motion.a>
      </div>
    </div>
  );
}
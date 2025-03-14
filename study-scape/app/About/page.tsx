"use client";
import { motion } from "framer-motion";
import Brandon from "/Users/dawnmai/cs-projects/StudyScape/Brandon.jpg";
import Julie from "/Users/dawnmai/cs-projects/StudyScape/Julie.jpeg";
import Carl from "/Users/dawnmai/cs-projects/StudyScape/Carl.jpg";
import Michael from "/Users/dawnmai/cs-projects/StudyScape/Michael.jpeg";
import Sanjana from "/Users/dawnmai/cs-projects/StudyScape/Sanjana.jpg";
import Dawn from "/Users/dawnmai/cs-projects/StudyScape/Dawn.jpeg";

export default function AboutPage() {
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

      {/* Intro to the Team */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <img src={Brandon.src} alt="Brandon" className="w-40 h-50" />
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">Brandon</h2>
          <p className="text-gray-600">I'm a second year computer science student here at UW and I helped implement the map and markers for Study Scape!</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <img src={Julie.src} alt="Julie" className="w-40 h-50" />
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">Julie</h2>
          <p className="text-gray-600">I’m a senior in computer science at UW. I love watching shows and reading romcoms in my free time. My usual study spot was truly my dorm desk at Maple Hall.</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <img src={Michael.src} alt="Michael" className="w-40 h-50" />
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">Michael</h2>
          <p className="text-gray-600">I'm a 2nd year CS student at UW and I helped implement the map, markers, and navigation for StudyScape!</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <img src={Carl.src} alt="Carl" className="w-40 h-50" />
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">Carl</h2>
          <p className="text-gray-600">I'm a junior in CS, and a NewJeans and The Bear enjoyer.</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <img src={Dawn.src} alt="Dawn" className="w-30 h-60" />
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">Dawn</h2>
          <p className="text-gray-600">Fifth-year in CS here (left)! Worked on the behind-the-scenes of StudyScape and I leave merge conflicts whereever I go.</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <img src={Sanjana.src} alt="Sanjana" className="w-40 h-50" />
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">Sanjana</h2>
          <p className="text-gray-600">I'm a third year computer science student and I worked on the frontend development of StudyScape, ensuring a seamless user experience.</p>
        </motion.div>
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
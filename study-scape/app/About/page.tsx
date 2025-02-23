"use client";
import { motion } from "framer-motion";
import { MapPin, Star, BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="p-8 bg-gradient-to-r from-indigo-50 to-purple-100 min-h-screen">
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
      >
        Ever wandered around UW looking for the perfect study spot? StudyScape helps you find, review, and explore the best locations based on noise level, outlets, food options, and more!🚀
      </motion.p>

      {/* Fun Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          <MapPin className="text-purple-600" size={40} />
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">50+</h2>
          <p className="text-gray-600">Study Spots Mapped</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          <Star className="text-yellow-500" size={40} />
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">4.8/5</h2>
          <p className="text-gray-600">Average Rating</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          <BookOpen className="text-blue-600" size={40} />
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">500+</h2>
          <p className="text-gray-600">Students Helped</p>
        </motion.div>
      </div>

      {/* Student Reviews (Fun Quotes Section) */}
      <div className="bg-purple-50 p-6 rounded-xl mt-8">
        <h2 className="text-xl font-bold text-purple-800 text-center mb-4">What UW Students Say:</h2>
        <motion.div 
          className="italic text-gray-700 text-center"
          animate={{ opacity: [0, 1], x: [-20, 0] }}
          transition={{ duration: 1 }}
        >
          <p>“I found my go-to study spot thanks to StudyScape! No more guessing where to go.” – Student Name, CSE</p>
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

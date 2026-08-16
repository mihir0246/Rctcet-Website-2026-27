"use client"

import SEO from "../Components/SEO";
import { useState } from "react"
import { motion } from "framer-motion"

import { teamMembers, boardOfDirectors } from "../data/teamData";

const TeamPage = () => {
  const [selectedYear, setSelectedYear] = useState("2026-2027")

  const filteredMembers = teamMembers.filter((member) => member.year === selectedYear)
  const filteredBoDs = boardOfDirectors.filter((bod) => bod.year === selectedYear)

  const academicYearOptions = Array.from({ length: 2027 - 2017 }, (_, i) => {
    const startYear = 2017 + i
    const endYear = startYear + 1
    return `${startYear}-${endYear}`
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
  <div className="p-8 bg-white dark:bg-[#1A1612]">
    <div className="flex flex-col justify-center items-center min-h-screen">
      <SEO title="Meet the Team" description="Meet the core team and board of directors of the Rotaract Club of TCET." />
      <div className="flex flex-col sm:flex-row justify-center items-center text-center mb-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-700 to-orange-500 dark:from-[#D4A829] dark:to-[#B8860B] bg-clip-text text-transparent mb-0 sm:mb-0 sm:mr-4">
          CORE TEAM
        </h1>
        <select
          id="year"
          className="p-2 border border-gray-300 dark:border-[#4A3B2F] rounded-md bg-white dark:bg-[#2D241C] text-orange-700 dark:text-[#D4A829] font-bold mt-2 sm:mt-0"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {academicYearOptions.map((year) => (
            <option key={year} value={year} className="dark:bg-[#2D241C] dark:text-[#F7F0E1]">
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="max-w-[80%] mx-auto">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-8">
          {filteredMembers.map((member, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="bg-[#faebd7] dark:bg-[#3D3027] p-6 rounded-lg shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            >
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="object-cover bg-slate-50 dark:bg-[#2D241C] w-full h-full rounded-lg transform transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <h2 className="mt-4 text-xl font-bold text-center text-gray-900 dark:text-[#F7F0E1]">{member.role}</h2>
              <p className="text-center text-gray-700 dark:text-[#EBD7C1]">{member.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>

    {filteredBoDs.length > 0 && (
      <div className="mt-32 mb-24">
        <h1 className="text-center text-4xl font-bold my-8 bg-gradient-to-r from-orange-700 to-orange-500 dark:from-[#D4A829] dark:to-[#B8860B] bg-clip-text text-transparent">
          Board of Directors
        </h1>
        <div className="max-w-[80%] mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {filteredBoDs.map((bod, index) => (
              <motion.div
                variants={itemVariants}
                key={index}
                className="bg-[#faebd7] dark:bg-[#3D3027] p-6 rounded-lg shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              >
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg ">
                  <img
                    src={bod.image || "/placeholder.svg"}
                    alt={bod.name}
                    loading="lazy"
                    className="object-cover w-full h-full rounded-lg transform transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h2 className="mt-4 md:text-md overflow-auto text-xl font-bold text-center text-gray-900 dark:text-[#F7F0E1]">{bod.role}</h2>
                <p className="text-center text-gray-700 dark:text-[#EBD7C1]">{bod.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    )}
  </div>
)
}

export default TeamPage

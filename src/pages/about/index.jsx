import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useAnimation } from 'framer-motion';
import { FiArrowRight, FiGlobe } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaFigma, FaRobot, FaBrain } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiGraphql, SiBlockchaindotcom } from 'react-icons/si';
import { GiArtificialIntelligence, GiCyberEye } from 'react-icons/gi';
import Header from '../../components/ui/Header';

// ===== CONSTANTS ===== //
const TECH_ICONS = [
  { icon: <FaReact className="text-cyan-400"/>, name: "React" },
  { icon: <FaNodeJs className="text-green-500"/>, name: "Node.js" },
  { icon: <SiTypescript className="text-blue-500"/>, name: "TypeScript" },
  { icon: <SiTailwindcss className="text-sky-400"/>, name: "Tailwind" },
  { icon: <FaFigma className="text-purple-500"/>, name: "Figma" },
  { icon: <SiGraphql className="text-pink-500"/>, name: "GraphQL" },
  { icon: <GiArtificialIntelligence className="text-red-500"/>, name: "AI" },
  { icon: <SiBlockchaindotcom className="text-yellow-400"/>, name: "Blockchain" }
];

// ===== COMPLETE TEAM DATA (6 MEMBERS) ===== //
const TEAM = [
  {
    name: "Perfect Irakoze",
    role: "Founder & CEO",
    bio: "Visionary architect of digital transformation. Leads with radical innovation and uncompromising excellence.",
     image: "https://i.ibb.co/YFRrXjTR/perfect.png",
    stats: ["8+ Years Exp", "42 Projects", "3 Startups"],
    color: "from-purple-600 via-indigo-600 to-blue-600",
    social: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    name: "J.D MUHIRE",
    role: "CTO",
    bio: "Technical mastermind who turns impossible ideas into scalable, robust systems.",
     image: "https://i.ibb.co/4ZXpK8Mx/muhire.png",
    stats: ["5+ Years Exp", "28 Projects", "Open Source"],
    color: "from-cyan-600 via-blue-600 to-indigo-600",
    social: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    name: "HERVE Chanel",
    role: "Lead Designer",
    bio: "Creates breathtaking interfaces that blend aesthetics with flawless functionality.",
     image: "https://i.ibb.co/cK7djr62/chanel.jpg",
    stats: ["5+ Years Exp", "Award Winner", "UX Specialist"],
    color: "from-pink-600 via-rose-600 to-red-600",
    social: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    name: "D.I Bonheur",
    role: "AI Engineer",
    bio: "Pushes boundaries of machine learning to create intelligent systems.",
     image: "https://i.ibb.co/SD67GTWv/bonheur.jpg",
    stats: ["PhD AI", "5 Patents", "ML Researcher"],
    color: "from-emerald-600 via-teal-600 to-cyan-600",
    social: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    name: "T. Sonia",
    role: "Blockchain Dev",
    bio: "Builds decentralized future with smart contracts and Web3 solutions.",
     image: "https://i.ibb.co/v6ZTMBx9/sonia.jpg",
    stats: ["50+ Projects", "DeFi Expert", "Solidity"],
    color: "from-amber-600 via-orange-600 to-red-600",
    social: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    name: "U. Edvin",
    role: "DevOps Engineer",
    bio: "Ensures bulletproof infrastructure and seamless deployments.",
     image: "https://i.ibb.co/BKqSJY95/edvin.jpg",
    stats: ["Cloud Architect", "CI/CD", "Kubernetes"],
    color: "from-violet-600 via-purple-600 to-fuchsia-600",
    social: { linkedin: "#", twitter: "#", github: "#" }
  }
];

// ===== MAIN COMPONENT ===== //
const CyberTeam = () => {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeMember, setActiveMember] = useState(null);
  const controls = useAnimation();

  // ===== 3D PARALLAX EFFECT ===== //
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  // ===== CYBER GRID BACKGROUND ===== //
  const GridBackground = () => {
    const rows = 15;
    const cols = 20;
    return (
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="grid grid-cols-20 grid-rows-15 h-full w-full">
          {[...Array(rows * cols)].map((_, i) => (
            <motion.div 
              key={i}
              className="border border-gray-800"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  // ===== FLOATING TECH ORBS ===== //
  const TechOrbs = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => {
          const Icon = TECH_ICONS[Math.floor(Math.random() * TECH_ICONS.length)];
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                rotate: 360,
              }}
              transition={{
                duration: 30 + Math.random() * 30,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            >
              {Icon.icon}
            </motion.div>
          );
        })}
      </div>
    );
  };

  // ===== NEON PULSING BORDER ===== //
  const NeonBorder = ({ member }) => {
    return (
      <motion.div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${member.color} opacity-70`}
        style={{
          filter: 'blur(15px)',
          zIndex: -1
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    );
  };

  // ===== MAIN RENDER ===== //
  return (
    <>
      <Header /> {/* Make Header visible at the top */}
      <div 
        ref={containerRef}
        className="min-h-screen bg-gray-950 overflow-hidden relative"
        onMouseMove={(e) => {
          const rect = containerRef.current.getBoundingClientRect();
          x.set((e.clientX - rect.left - rect.width/2) / 20);
          y.set((e.clientY - rect.top - rect.height/2) / 20);
          setMouse({ x: e.clientX, y: e.clientY });
        }}
      >
        {/* === CYBERPUNK BACKGROUND ELEMENTS === */}
        <GridBackground />
        <TechOrbs />
        
        {/* === MOUSE TRAIL === */}
        <motion.div
          className="fixed pointer-events-none rounded-full bg-blue-500 opacity-10 blur-3xl"
          style={{
            width: "400px",
            height: "400px",
            x: mouse.x - 200,
            y: mouse.y - 200,
            transition: "all 0.3s ease-out"
          }}
        />

        {/* === MAIN CONTENT === */}
        <div className="relative z-10 container mx-auto px-6 py-28">
          
          {/* === HEADER === */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-center mb-28"
          >
            <h1 className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-8">
              <span className="text-outline">THE</span> <span className="text-white">CREW</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Meet the <span className="text-cyan-400 font-bold">digital warriors</span> crafting the future with <span className="text-purple-400 font-bold">cutting-edge tech</span>
            </p>
          </motion.div>

          {/* === TEAM GRID (6 MEMBERS) === */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1000
            }}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.1,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }}
                whileHover={{ 
                  y: -15,
                  transition: { duration: 0.3 }
                }}
                onMouseEnter={() => setActiveMember(i)}
                onMouseLeave={() => setActiveMember(null)}
                className="relative rounded-3xl overflow-hidden border border-gray-800 bg-gray-900 bg-opacity-50 backdrop-blur-lg"
              >
                <NeonBorder member={member} />
                
                {/* Member Image */}
                <div className="relative h-96 overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>

                {/* Member Info */}
                <div className="p-8 relative">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <div className={`inline-block mt-2 px-4 py-1 rounded-full bg-gradient-to-r ${member.color} text-white text-sm font-bold`}>
                      {member.role}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{member.bio}</p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                      >
                        {stat}
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => {
                      const tech = TECH_ICONS[i];
                      return (
                        <motion.div
                          key={i}
                          whileHover={{ y: -5 }}
                          className="px-3 py-1 bg-black bg-opacity-50 rounded-full flex items-center gap-2 border border-gray-800"
                        >
                          {tech.icon}
                          <span className="text-xs text-gray-300">{tech.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </div>
    </>
  );
};

export default CyberTeam;

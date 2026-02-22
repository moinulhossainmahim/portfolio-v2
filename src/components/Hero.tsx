import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";


// ─── Hero Component ───────────────────────────────────────────────────────────

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative w-full min-h-screen lg:h-screen flex items-center justify-center overflow-hidden bg-primary-bg py-20 lg:py-0"
        >
            {/* Animated Background Blobs */}
            <motion.div
                animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-20 w-72 h-72 bg-accent-1/20 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.5, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-20 w-96 h-96 bg-accent-2/20 rounded-full blur-[120px]"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* Greeting */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-accent-1 font-mono mb-4 text-lg sm:text-xl tracking-wide uppercase"
                        >
                            Hi, my name is
                        </motion.p>

                        {/* Name with Gradient */}
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="text-4xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-white to-text-secondary"
                        >
                            {personalInfo.name}.
                        </motion.h1>

                        {/* Static Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8"
                        >
                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-1 to-accent-2">
                                Full Stack Engineer
                            </h2>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-2xl lg:mx-0 mx-auto text-text-secondary text-base sm:text-lg mb-10 leading-relaxed font-light"
                        >
                            {personalInfo.bio}
                        </motion.p>


                        {/* Social Icons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center justify-center lg:justify-start gap-8"
                        >
                            <a
                                href={personalInfo.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-text-secondary hover:text-white transition-colors transform hover:scale-110"
                            >
                                <FaGithub size={32} />
                            </a>
                            <a
                                href={personalInfo.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="text-text-secondary hover:text-accent-1 transition-colors transform hover:scale-110"
                            >
                                <FaLinkedin size={32} />
                            </a>
                        </motion.div>
                    </div>

                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                            delay: 0.4,
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                        }}
                        className="relative group"
                    >
                        {/* Decorative background ring */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent-1 to-accent-2 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />

                        <div className="relative w-72 h-[450px] sm:w-[400px] sm:h-[550px] md:w-[480px] md:h-[650px] rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-accent-1/50 transition-colors duration-500 shadow-3xl">
                            <img
                                src="/moinul-profile-image.jpg"
                                alt={personalInfo.name}
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay for professional feel */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-bg/40 to-transparent pointer-none" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-secondary/50 hidden sm:block"
            >
                <FaChevronDown size={24} />
            </motion.div>
        </section>
    );
};

export default Hero;

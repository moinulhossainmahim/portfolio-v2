import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaReact,
    FaNodeJs,
    FaDatabase,
    FaCode,
    FaGitAlt,
    FaFigma,
    FaDocker,
} from "react-icons/fa";
import {
    SiExpress,
    SiMongodb,
    SiTailwindcss,
    SiJavascript,
    SiTypescript,
    SiNextdotjs,
    SiRedux,
    SiNestjs,
    SiReactquery,
    SiSupabase,
    SiSanity,
} from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";
import TwilioIcon from "../assets/twilio";
import ZustandIcon from "../assets/zustand";
import JWPlayerIcon from "../assets/jwplayer";
import { CgCode } from "react-icons/cg";

// Standardizing some icons using available sets
// Zustand, JWPlayer, Cursor often lack stable icons in all versions, using FaCode/Database as fallback

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    linkedin: string;
    github: string;
    resumeLink: string;
    bio: string;
    shortBio: string;
}

export interface Education {
    institution: string;
    degree: string;
    duration: string;
    score: string;
}

export interface Project {
    title: string;
    tech: string[];
    description: React.ReactNode[];
    date: string;
    githubLink: string;
    liveLink: string | null;
    category: string;
    image: string;
    icon: React.ReactNode;
}

export interface SkillItem {
    name: string;
    icon: React.ReactNode;
}

export interface Skills {
    languages: SkillItem[];
    frameworksAndLibraries: SkillItem[];
    toolsAndPlatforms: SkillItem[];
    coreCompetencies: string[];
}

export interface Experience {
    role: string;
    organization: string;
    duration: string;
    points: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const personalInfo: PersonalInfo = {
    name: "Moinul Hossain",
    title: "Full Stack Engineer",
    email: "moinulhossainmahim@gmail.com",
    linkedin: "https://www.linkedin.com/in/moinulhossainmahim/",
    github: "https://github.com/moinulhossainmahim",
    resumeLink: "/RESUME_MOINUL_HOSSAIN.pdf",
    shortBio: "Building high-performance web applications with React, Next.js, and TypeScript.",
    bio: "I build high-performance, scalable web applications with a focus on clean architecture and seamless user experiences. Specializing in architecting modern full-stack ecosystems that drive technical innovation.",
};

export const education: Education[] = [
    {
        institution: "Northern University Bangladesh",
        degree: "Bachelor of Science in Computer Science and Engineering",
        duration: "August 2021 – October 2025",
        score: "CGPA: 3.66/4.0",
    },
    {
        institution: "Milestone College",
        degree: "Higher Secondary School",
        duration: "July 2018 – May 2020",
        score: "GPA: 4.56/5.0",
    },
];

export const projects: Project[] = [
    {
        title: "stuRENT",
        tech: ["React", "Next.js", "Redux", "Tailwind CSS", "Google OAuth", "Zod", "Docker"],
        description: [
            <>
                Developed <span className="text-accent-1 font-semibold">stuRENT</span>, a room-finding platform tailored for university students.
            </>,
            <>
                Enabled hosts to list <span className="text-text-primary font-medium">single rooms, sublets, and flats</span> with advanced filtering by type, gender, and university.
            </>,
            <>
                Ensured a <span className="text-text-primary font-medium">fully responsive</span> user experience with secure authentication and robust data validation.
            </>,
        ],
        date: "2024",
        githubLink: "https://github.com/moinulhossainmahim/sturent-ui",
        liveLink: "https://sturent.vercel.app",
        category: "Full Stack",
        icon: <FaReact size={24} className="text-accent-1" />,
        image: "/sturent.png",
    },
    {
        title: "Search Github User",
        tech: ["React", "React Router", "REST API", "FusionCharts"],
        description: [
            <>
                Built an <span className="text-accent-1 font-semibold">innovative web application</span> to explore the GitHub coding universe.
            </>,
            <>
                Empowered users to search for profiles and gain <span className="text-text-primary font-medium">instant insights</span> into repositories, followers, and language statistics.
            </>,
        ],
        date: "2023",
        githubLink: "https://github.com/moinulhossainmahim/Search-github-users",
        liveLink: "https://github-user-reactjs.netlify.app/",
        category: "Frontend",
        icon: <FaGithub size={24} className="text-accent-1" />,
        image: "/github-user.png",
    },
    {
        title: "E2S Automobiles",
        tech: ["React", "Tailwind CSS"],
        description: [
            <>
                Developed <span className="text-accent-1 font-semibold">E2S Automobiles</span>, an automobile company providing different types of automobiles services.
            </>,
            <>
                Utilized industry knowledge to deliver <span className="text-text-primary font-medium">different automobiles</span> for clients.
            </>,
        ],
        date: "2025",
        githubLink: "#",
        liveLink: "https://e2sautos.com",
        category: "Frontend",
        icon: <FaCode size={24} className="text-accent-1" />,
        image: "/e2sautos.png",
    },
    {
        title: "Cinehub",
        tech: ["React", "TypeScript", "Redux", "Material UI"],
        description: [
            <>
                Created an <span className="text-accent-1 font-semibold">immersive movie search</span> application for exploring favorite movies and series.
            </>,
            <>
                Integrated trailers and <span className="text-text-primary font-medium">rich metadata</span> in a seamless interface for entertainment enthusiasts.
            </>,
        ],
        date: "2023",
        githubLink: "https://github.com/moinulhossainmahim/entertainment-app",
        liveLink: "https://cine-hub.netlify.app/",
        category: "Frontend",
        icon: <FaCode size={24} className="text-accent-1" />,
        image: "/cinehub.png",
    },
    // {
    //     title: "Shop UI",
    //     tech: ["React", "TypeScript", "Redux", "Material UI", "SCSS"],
    //     description: [
    //         <>
    //             Developed a <span className="text-accent-1 font-semibold">user-friendly e-commerce platform</span> with a curated collection of products.
    //         </>,
    //         <>
    //             Implemented a <span className="text-text-primary font-medium">seamless shopping experience</span> across various categories from fashion to electronics.
    //         </>,
    //     ],
    //     date: "2023",
    //     githubLink: "https://github.com/moinulhossainmahim",
    //     liveLink: "https://daily-shop-ui.vercel.app/",
    //     category: "E-commerce",
    //     icon: <FaReact size={24} className="text-accent-1" />,
    //     image: "/shop-ui.png",
    // },
    // {
    //     title: "Shop Admin",
    //     tech: ["Next.js", "React", "TypeScript", "Redux", "Material UI"],
    //     description: [
    //         <>
    //             Built an <span className="text-accent-1 font-semibold">intuitive e-commerce admin panel</span> for store management and oversight.
    //         </>,
    //         <>
    //             Streamlined <span className="text-text-primary font-medium">inventory, orders, and customer interactions</span> onto a single, powerful platform.
    //         </>,
    //     ],
    //     date: "2023",
    //     githubLink: "https://github.com/moinulhossainmahim",
    //     liveLink: "https://shop-admin-nextjs.vercel.app/",
    //     category: "Management",
    //     icon: <FaDatabase size={24} className="text-accent-1" />,
    //     image: "/shop-admin.png",
    // },
];

export const skills: Skills = {
    languages: [
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "C", icon: <CgCode /> },
        { name: "C++", icon: <TbBrandCpp /> },
        { name: "SQL", icon: <FaDatabase /> },
    ],
    frameworksAndLibraries: [
        { name: "React JS", icon: <FaReact /> },
        { name: "Redux Toolkit", icon: <SiRedux /> },
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "React Query", icon: <SiReactquery /> },
        { name: "Zustand", icon: <ZustandIcon className="w-8 h-8" /> },
        { name: "Node JS", icon: <FaNodeJs /> },
        { name: "Nest JS", icon: <SiNestjs /> },
        { name: "Express JS", icon: <SiExpress /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    ],
    toolsAndPlatforms: [
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Supabase", icon: <SiSupabase /> },
        { name: "Sanity", icon: <SiSanity /> },
        { name: "Twilio", icon: <TwilioIcon className="w-8 h-8" /> },
        { name: "JW Player", icon: <JWPlayerIcon className="w-8 h-8" /> },
        { name: "Docker", icon: <FaDocker /> },
        { name: "Git", icon: <FaGitAlt /> },
        { name: "Figma", icon: <FaFigma /> },
    ],
    coreCompetencies: [
        "Presentations",
        "Oratory",
        "Team Leadership",
        "Event Hosting",
        "Agile Methodologies",
        "Problem Solving",
    ],
};

export const experience: Experience[] = [
    {
        role: "Software Engineer",
        organization: "TulipTech",
        duration: "March 2025 – Present",
        points: [
            "Managing a large-scale Turborepo monorepo consisting of 12 distinct applications, optimizing code sharing and build pipelines.",
            "Mentoring junior developers on component design and structuring code with high quality and re-usability.",
            "Collaborating on medical and sports platforms, focusing on operational efficiency and real-time data synchronization.",
            "Empathika: Developed a digital care management platform featuring Titan integration for medication ordering and AI-driven resident onboarding.",
            "The World Games 2025: Built a high-performance sports streaming platform serving 4M+ users with SSE live data synchronization and Supabase real-time notifications.",
        ],
    },
    {
        role: "Junior Software Engineer",
        organization: "ITLogiko",
        duration: "Jan 2025 – Feb 2025",
        points: [
            "ITLogiko: Built a landing page for company Utilized React, CSS, SCSS, HTML etc.",
            "Educational Institution Management System: Working on a web application which is responsible for managing educational institution.",
            "Frontend Development with React TypeScript – Building dynamic and user-friendly UI components using React and TypeScript, ensuring a seamless and responsive user experience for the educational institution management system.",
            "Backend Development with Laravel MySQL - Developing robust APIs and handling database operations using Laravel and MySQL, ensuring secure and efficient data management for the platform.",
            "Integrated APIs into the frontend using React and Redux Toolkit, ensuring a smooth, dynamic, and reliable user experience.",
        ],
    },
    {
        role: "Associate Software Engineer",
        organization: "TiBX",
        duration: "August 2022 – July 2023",
        points: [
            "Tirade Call Center: Built a call center web application for performing audio call, video call, conference call, messaging and managing users.",
            "Ascalon Health: Worked in Ascalon Health web application which is responsible for managing health details of different products of TiBX.Worked closely with backend developers to ensure seamless integration of frontend and backend",
            "Conducted peer code reviews, ensuring best practices and code standards were met."
        ],
    },
];

export const socialLinks = [
    {
        name: "LinkedIn",
        url: personalInfo.linkedin,
        icon: <FaLinkedin className="text-accent-1" />,
    },
    {
        name: "GitHub",
        url: personalInfo.github,
        icon: <FaGithub className="text-accent-1" />,
    },
    {
        name: "Email",
        url: `mailto:${personalInfo.email}`,
        icon: <FaEnvelope className="text-accent-1" />,
    },
];

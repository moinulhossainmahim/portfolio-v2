import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { FaHeart } from 'react-icons/fa';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="py-8 bg-secondary-bg text-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-sm text-text-secondary font-mono">
                    Designed &amp; Built with <FaHeart className="inline text-accent-2" /> by {personalInfo.name}
                </p>
                <p className="text-xs text-text-secondary font-mono mt-1">
                    © {currentYear} Moinul Hossain. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

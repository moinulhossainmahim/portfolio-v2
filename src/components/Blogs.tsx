import React, { useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface MediumPost {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    content?: string;
    thumbnail?: string;
    categories?: string[];
}

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300x180";
const POSTS_PER_PAGE = 10;

const extractImage = (content: string): string => {
    if (!content) return PLACEHOLDER_IMAGE;
    const doc = new DOMParser().parseFromString(content, "text/html");
    const img = doc.querySelector("img");
    return img?.getAttribute("src") || PLACEHOLDER_IMAGE;
};

/** Extract description from paragraph content only (skips figure/figcaption, etc.) */
const getDescriptionFromHtml = (html: string, maxLength = 120): string => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    const paragraphs = doc.querySelectorAll("p");
    const text = Array.from(paragraphs)
        .map((p) => p.textContent?.trim())
        .filter(Boolean)
        .join(" ");
    return text.slice(0, maxLength).trim() || "";
};

const formatPublishDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const Blogs: React.FC = () => {
    const [posts, setPosts] = useState<MediumPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch(
            "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@moinulhossainmahim"
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.items && Array.isArray(data.items)) {
                    setPosts(data.items);
                }
            })
            .catch(() => setPosts([]))
            .finally(() => setLoading(false));
    }, []);

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    const goToPage = (page: number) => {
        const next = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(next);
        document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section id="blogs" className="py-32 bg-secondary-bg">
            <div className="container mx-auto px-6 lg:px-12">
                <SectionTitle>Blogs</SectionTitle>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-80 rounded-md bg-primary-bg/50 border border-white/5 animate-pulse"
                            />
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-text-secondary mt-20"
                    >
                        No posts to show yet.
                    </motion.p>
                ) : (
                    <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
                        {paginatedPosts.map((post, index) => {
                            const thumb =
                                post.thumbnail ||
                                extractImage(post.content || post.description);
                            const description = getDescriptionFromHtml(
                                post.description || post.content || ""
                            );
                            const tags = post.categories?.slice(0, 4) || [];
                            const publishedDate = formatPublishDate(post.pubDate);

                            return (
                                <motion.a
                                    key={post.link}
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    className="group block rounded-md overflow-hidden bg-primary-bg border border-white/10 hover:border-accent-1/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent-1/5"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={thumb}
                                            alt=""
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-secondary-bg/20 group-hover:bg-transparent transition-colors duration-300" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {publishedDate && (
                                            <p className="text-xs font-mono text-accent-1/80 mb-2">
                                                {publishedDate}
                                            </p>
                                        )}
                                        <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-1 transition-colors line-clamp-2 mb-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-text-secondary line-clamp-3 mb-4 leading-relaxed">
                                            {description}
                                            {description.length >= 120 ? "…" : ""}
                                        </p>

                                        {/* Tags */}
                                        {tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs font-mono px-2.5 py-1 rounded bg-accent-1/10 text-accent-1 border border-accent-1/20"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-1 group-hover:gap-3 transition-all">
                                            Read on Medium
                                            <FaExternalLinkAlt
                                                size={12}
                                                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                            />
                                        </span>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* See more - when there are more pages */}
                    {totalPages > 1 && currentPage < totalPages && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-center mt-12"
                        >
                            <button
                                type="button"
                                onClick={() => goToPage(currentPage + 1)}
                                className="px-6 py-3 rounded-md font-medium text-accent-1 border border-accent-1 hover:bg-accent-1 hover:text-primary-bg transition-all duration-300"
                            >
                                See more
                            </button>
                        </motion.div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <motion.nav
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-wrap items-center justify-center gap-2 mt-16"
                            aria-label="Blog pagination"
                        >
                            <button
                                type="button"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2.5 rounded-md border border-white/10 text-text-secondary hover:border-accent-1 hover:text-accent-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-text-secondary transition-colors"
                                aria-label="Previous page"
                            >
                                <FaChevronLeft size={18} />
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                    (page) => (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => goToPage(page)}
                                            className={`min-w-[2.5rem] py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
                                                page === currentPage
                                                    ? "bg-accent-1 text-primary-bg border border-accent-1"
                                                    : "border border-white/10 text-text-secondary hover:border-accent-1 hover:text-accent-1"
                                            }`}
                                            aria-label={`Page ${page}`}
                                            aria-current={page === currentPage ? "page" : undefined}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2.5 rounded-md border border-white/10 text-text-secondary hover:border-accent-1 hover:text-accent-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-text-secondary transition-colors"
                                aria-label="Next page"
                            >
                                <FaChevronRight size={18} />
                            </button>
                        </motion.nav>
                    )}
                    </>
                )}
            </div>
        </section>
    );
};

export default Blogs;

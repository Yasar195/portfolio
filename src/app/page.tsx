"use client";

import Image from "next/image";
import photo from "../../public/artist-white.jpg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [page, setPage] = useState("career");

  const blogPosts = [
    {
      date: "2024 Jan 15",
      title: "Building Scalable React Applications",
      description: "Learn how to structure your React applications for scalability and maintainability. We'll cover best practices, state management, and performance optimization techniques.",
      tags: ["React", "Architecture", "Performance"],
      readTime: "8 min read",
      link: "https://hashnode.com/your-blog-1"
    },
    {
      date: "2023 Dec 28",
      title: "Modern CSS Techniques You Should Know",
      description: "Discover the latest CSS features and techniques that can revolutionize your web development workflow. From CSS Grid to Custom Properties, we'll explore it all.",
      tags: ["CSS", "Web Development", "Frontend"],
      readTime: "6 min read",
      link: "https://hashnode.com/your-blog-2"
    }
  ];

  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  const timelineVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.3 },
    }),
  };

  const careerHistory = [
    {
      period: "2023 jan - Present",
      role: "Software Engineer",
      company: "Bluecast Technologies",
      description: "Working on full-stack web development projects using modern technologies.",
      tech: ["React", "Next.js", "Node.js", "Tailwind CSS", "AWS"],
    },
    {
      period: "2023 nov - 2024 jan",
      role: "Junior Developer",
      company: "Trinity skillactz",
      description: "Worked",
      tech: ["JavaScript", "HTML", "CSS", "Basic React", "PHP"],
    }
  ];

  return (
    <div className="h-screen bg-slate-100 p-4 sm:p-6 md:p-8">
      <main className="mx-auto max-w-8xl">
        <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:gap-8 h-full">
            {/* Left Section - Navigation & Content */}
            <div className="w-full md:w-1/2 flex flex-col h-[calc(100vh-12rem)]">
              {/* Navigation - Fixed */}
              <nav className="bg-slate-100 rounded-lg p-4 mb-8 sticky top-0 z-10">
                <div className="flex flex-wrap md:flex-nowrap justify-center gap-3">
                  {["about", "blog", "career", "projects", "socials", "gallery"].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => setPage(item)}
                      className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors
                        ${page === item
                          ? "bg-slate-300 text-slate-700"
                          : "text-slate-600 hover:bg-slate-200"
                        }`}
                      whileTap={{ scale: 0.95, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}  // Click animation
                      whileHover={{ scale: 1.05 }}  // Hover effect for scaling up
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </nav>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto pr-4 -mr-4">
                <AnimatePresence mode="wait">
                  {page === "about" && (
                    <motion.div
                      key="about"
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6 text-lg"
                    >
                      <p className="text-xl font-semibold text-slate-800">
                        Hey there, I am{" "}
                        <span className="text-green-600 font-bold">Yasar Arafath</span> 👋
                      </p>

                      <p className="text-slate-600 leading-relaxed">
                        Welcome to my portfolio! I’m a passionate software engineer with a drive for solving real-world problems through elegant code. I specialize in full-stack web development, and I love creating seamless user experiences that are both functional and beautiful.
                      </p>

                      <p className="text-slate-600 leading-relaxed">
                        With over <span className="text-green-600 font-semibold">1 year of experience</span> working with cutting-edge technologies like <span className="text-blue-600">React</span>, <span className="text-blue-600">Next.js</span>, and <span className="text-yellow-600">Node.js</span>, I have honed my skills in building scalable, efficient, and user-friendly web applications.
                      </p>

                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-slate-700">📍</span>
                        <p className="text-slate-600">Currently based in <span className="font-semibold text-green-600">India</span>.</p>
                      </div>

                      <div className="mt-6">
                        <p className="text-lg font-semibold text-slate-800">Technologies I Work With:</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="px-4 py-2 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">React</span>
                          <span className="px-4 py-2 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">Next.js</span>
                          <span className="px-4 py-2 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">Node.js</span>
                          <span className="px-4 py-2 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">Tailwind CSS</span>
                          <span className="px-4 py-2 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">AWS</span>
                          <span className="px-4 py-2 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">MongoDB</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <p className="text-lg font-semibold text-slate-800">What Drives Me:</p>
                        <p className="text-slate-600 leading-relaxed">
                          I am deeply motivated by the impact that technology can have on people’s lives. Whether it’s optimizing a process, improving user experience, or building something entirely new, I’m driven to create innovative solutions that leave a lasting impact.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {page === "socials" && (
                    <motion.div
                      key="socials"
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-semibold">
                        Connect with Me on <span className="text-green-600">Social Media</span>
                      </h2>

                      <div className="flex flex-wrap gap-6">
                        <a
                          href="https://twitter.com/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-3 bg-slate-50 text-slate-700 rounded-full hover:bg-slate-200 transition-colors font-medium text-lg"
                        >
                          <i className="fab fa-twitter mr-2"></i> Twitter
                        </a>

                        <a
                          href="https://linkedin.com/in/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-3 bg-slate-50 text-slate-700 rounded-full hover:bg-slate-200 transition-colors font-medium text-lg"
                        >
                          <i className="fab fa-linkedin mr-2"></i> LinkedIn
                        </a>

                        <a
                          href="https://instagram.com/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-3 bg-slate-50 text-slate-700 rounded-full hover:bg-slate-200 transition-colors font-medium text-lg"
                        >
                          <i className="fab fa-instagram mr-2"></i> Instagram
                        </a>

                        <a
                          href="https://github.com/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-3 bg-slate-50 text-slate-700 rounded-full hover:bg-slate-200 transition-colors font-medium text-lg"
                        >
                          <i className="fab fa-github mr-2"></i> GitHub
                        </a>

                        <a
                          href="https://www.behance.net/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-3 bg-slate-50 text-slate-700 rounded-full hover:bg-slate-200 transition-colors font-medium text-lg"
                        >
                          <i className="fab fa-behance mr-2"></i> Behance
                        </a>
                      </div>
                    </motion.div>
                  )}
                  {page === "blog" && (
                    <motion.div
                      key="blog"
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-semibold">
                        Latest <span className="text-green-600">Blog Posts</span>
                      </h2>

                      <motion.div
                        variants={timelineVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative pl-8 border-l-2 border-slate-300"
                      >
                        {blogPosts.map((post, index) => (
                          <motion.div
                            key={index}
                            custom={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-8 relative"
                          >
                            {/* Timeline dot */}
                            <div className="absolute -left-[33px] w-4 h-4 bg-slate-300 rounded-full">
                              <div className="absolute inset-1 bg-white rounded-full" />
                            </div>

                            {/* Content */}
                            <a
                              href={post.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block bg-slate-50 rounded-lg p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
                            >
                              <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-slate-500">{post.date}</span>
                                <span className="text-sm text-slate-400">{post.readTime}</span>
                              </div>
                              <h3 className="text-lg font-semibold text-slate-800 mt-1">{post.title}</h3>
                              <p className="text-slate-600 mt-2">{post.description}</p>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {post.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-1 text-xs font-medium bg-slate-200 text-slate-700 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </a>
                          </motion.div>
                        ))}
                      </motion.div>

                      <div className="text-center mt-8">
                        <a
                          href="https://hashnode.com/your-profile"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition-colors font-medium text-sm"
                        >
                          View all posts on Hashnode →
                        </a>
                      </div>
                    </motion.div>
                  )}
                  {page === "gallery" && (
                    <motion.div
                      key="gallery"
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-semibold">
                        My <span className="text-green-600">Gallery</span>
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {["https://images.pexels.com/photos/28617424/pexels-photo-28617424/free-photo-of-cozy-indoor-scene-with-turkish-tea.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/30368522/pexels-photo-30368522/free-photo-of-autumn-at-museum-island-berlin-germany.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"].map((item) => (
                          <motion.div
                            key={item}
                            className="relative bg-slate-50 rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition-all"
                          >
                            <img
                              src={`${item}`}
                              alt={`Gallery Image`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <p className="text-white text-lg font-semibold">Image {item}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {page === "career" && (
                    <motion.div
                      key="career"
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-semibold">
                        Career <span className="text-green-600">Journey</span>
                      </h2>

                      <motion.div
                        variants={timelineVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative pl-8 border-l-2 border-slate-300"
                      >
                        {careerHistory.map((item, index) => (
                          <motion.div
                            key={index}
                            custom={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-8 relative"
                          >
                            {/* Timeline dot */}
                            <div className="absolute -left-[33px] w-4 h-4 bg-slate-300 rounded-full">
                              <div className="absolute inset-1 bg-white rounded-full" />
                            </div>

                            {/* Content */}
                            <div className="bg-slate-50 rounded-lg p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                              <span className="text-sm font-medium text-slate-500">{item.period}</span>
                              <h3 className="text-lg font-semibold text-slate-800 mt-1">{item.role}</h3>
                              <p className="text-green-600 font-medium">{item.company}</p>
                              <p className="text-slate-600 mt-2">{item.description}</p>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {item.tech.map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-2 py-1 text-xs font-medium bg-slate-200 text-slate-700 rounded-full"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src={photo}
                  alt="Portfolio photo"
                  className="object-contain"
                  priority
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="m-4 w-full py-4 flex items-center justify-center">
        <p className="text-sm text-slate-600">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-green-600">Yasar Arafath</span>. All rights reserved.
        </p>
      </div>
    </div>
  );
}
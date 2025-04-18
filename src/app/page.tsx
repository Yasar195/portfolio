"use client";

import Image from "next/image";
import photo from "../../public/artist-white.jpg";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogScreen from "../../component/Blogs";
import AboutScreen from "../../component/About";
import CareerScreen from "../../component/Career";
import ContactScreen from "../../component/Contact";
import GalleryScreen from "../../component/Gallery";
import ChatWidget from "../../component/Chat";

interface BlogTag {
  name: string;
}

interface BlogPost {
  node: {
    title: string;
    url: string;
    readTimeInMinutes: string;
    tags: BlogTag[];
    publishedAt: string;
    brief: string;
  };
}

// interface CareerHistoryItem {
//   period: string;
//   role: string;
//   company: string;
//   description: string;
//   tech: string[];
// }


export default function Home() {
  const [page, setPage] = useState("about");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(()=> {
    getStaticProps();
  }, [])

  async function getStaticProps() {
    const query = `
      query {
        publication(host: "blogs.yasararafath.in") {
          id
          posts(first: 10) {
            edges {
              node {
                title
                url
                readTimeInMinutes
                tags {
                  name
                }
                publishedAt
                brief
              }
            }
          }
        }
      }
    `;
  
    const response = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ query }), // Ensure the request is correctly formatted
    });
  
    const data = await response.json();
    const blogs: BlogPost[] = data.data.publication.posts.edges
  
    setBlogs([...blogs])
  }

  // const variants = {
  //   hidden: { opacity: 0, y: -50 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  //   exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  // };

  // const timelineVariants = {
  //   hidden: { opacity: 0, height: 0 },
  //   visible: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, x: -20 },
  //   visible: (i: number) => ({
  //     opacity: 1,
  //     x: 0,
  //     transition: { delay: i * 0.2, duration: 0.3 },
  //   }),
  // };

  // const careerHistory: CareerHistoryItem[] = [
  //   {
  //     period: "2023 jan - Present",
  //     role: "Software Engineer",
  //     company: "Bluecast Technologies",
  //     description: "Working on full-stack web development projects using modern technologies.",
  //     tech: ["React", "Next.js", "Node.js", "Tailwind CSS", "AWS"],
  //   },
  //   {
  //     period: "2023 nov - 2024 jan",
  //     role: "Junior Developer",
  //     company: "Trinity skillactz",
  //     description: "Worked",
  //     tech: ["JavaScript", "HTML", "CSS", "Basic React", "PHP"],
  //   }
  // ];

  return (
    <div className="relative h-screen bg-slate-100 p-4 sm:p-6 md:p-8">
      <main className="mx-auto max-w-8xl">
        <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:gap-8 h-full">
            {/* Left Section - Navigation & Content */}
            <div className="w-full md:w-1/2 flex flex-col h-[calc(100vh-12rem)]">
              {/* Navigation - Fixed */}
              <nav className="bg-green-100 rounded-full p-4 mb-8 sticky top-0 z-10">
                <div className="flex flex-wrap md:flex-nowrap justify-center gap-3">
                  {["about", "blog", "career", "projects", "contact", "gallery"].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => setPage(item)}
                      className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors
                        ${page === item
                          ? "bg-green-300 text-slate-700"
                          : "text-slate-600 hover:bg-green-200"
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
                    // <motion.div
                    //   key="about"
                    //   variants={variants}
                    //   initial="hidden"
                    //   animate="visible"
                    //   exit="exit"
                    //   className="space-y-6 text-lg"
                    // >
                    //   <p className="text-xl font-semibold text-slate-800">
                    //     Hey there, I am{" "}
                    //     <span className="text-green-600 font-bold">Yasar Arafath</span> 👋
                    //   </p>

                    //   <p className="text-slate-600 leading-relaxed">
                    //     Welcome to my portfolio! I’m a passionate software engineer with a drive for solving real-world problems through elegant code. I specialize in full-stack web development, and I love creating seamless user experiences that are both functional and beautiful.
                    //   </p>

                    //   <p className="text-slate-600 leading-relaxed">
                    //     With over <span className="text-green-600 font-semibold">1 year of experience</span> working with cutting-edge technologies like <span className="text-blue-600">React</span>, <span className="text-blue-600">Next.js</span>, and <span className="text-yellow-600">Node.js</span>, I have honed my skills in building scalable, efficient, and user-friendly web applications.
                    //   </p>

                    //   <div className="flex items-center space-x-3">
                    //     <span className="font-medium text-slate-700">📍</span>
                    //     <p className="text-slate-600">Currently based in <span className="font-semibold text-green-600">India</span>.</p>
                    //   </div>

                    //   <div className="mt-6">
                    //     <p className="text-lg font-semibold text-slate-800">Technologies I Work With:</p>
                    //     <div className="flex flex-wrap gap-3 mt-2">
                    //       <span className="px-4 py-2 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">React</span>
                    //       <span className="px-4 py-2 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">Next.js</span>
                    //       <span className="px-4 py-2 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">Node.js</span>
                    //       <span className="px-4 py-2 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">Tailwind CSS</span>
                    //       <span className="px-4 py-2 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">AWS</span>
                    //       <span className="px-4 py-2 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">MongoDB</span>
                    //     </div>
                    //   </div>

                    //   <div className="mt-6">
                    //     <p className="text-lg font-semibold text-slate-800">What Drives Me:</p>
                    //     <p className="text-slate-600 leading-relaxed">
                    //       I am deeply motivated by the impact that technology can have on peoples lives. Whether its optimizing a process, improving user experience, or building something entirely new, Im driven to create innovative solutions that leave a lasting impact.
                    //     </p>
                    //   </div>
                    // </motion.div>
                    <AboutScreen/>
                  )}
                  {page === "contact" && (
                    //   <motion.div
                    //   key="contact"
                    //   variants={variants}
                    //   initial="hidden"
                    //   animate="visible"
                    //   exit="exit"
                    //   className="space-y-6"
                    // >
                    //   <h2 className="text-2xl font-semibold">
                    //     Get in Touch <span className="text-green-600">with Me</span>
                    //   </h2>
                  
                    //   {/* Contact Form */}
                    //   <div className="bg-slate-50 p-6 rounded-lg shadow-md">
                    //     <p className="text-lg text-slate-600">
                    //       Have a question or want to work together? Drop me a message and I get back to you as soon as possible.
                    //     </p>
                  
                    //     <form action="https://formspree.io/f/maykbjwb" method="POST" className="mt-6 space-y-4">
                    //       <div className="flex flex-col">
                    //         <label htmlFor="name" className="text-sm font-medium text-slate-700">Your Name</label>
                    //         <input
                    //           type="text"
                    //           id="name"
                    //           name="name"
                    //           className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    //           placeholder="John Doe"
                    //           required
                    //         />
                    //       </div>
                  
                    //       <div className="flex flex-col">
                    //         <label htmlFor="email" className="text-sm font-medium text-slate-700">Your Email</label>
                    //         <input
                    //           type="email"
                    //           id="email"
                    //           name="email"
                    //           className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    //           placeholder="yourname@example.com"
                    //           required
                    //         />
                    //       </div>
                  
                    //       <div className="flex flex-col">
                    //         <label htmlFor="message" className="text-sm font-medium text-slate-700">Your Message</label>
                    //         <textarea
                    //           id="message"
                    //           name="message"
                    //           className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    //           placeholder="Write your message here..."
                    //           required
                    //         ></textarea>
                    //       </div>
                  
                    //       <button
                    //         type="submit"
                    //         className="w-full py-2 mt-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                    //       >
                    //         Send Message
                    //       </button>
                    //     </form>
                    //   </div>
                    // </motion.div>
                    <ContactScreen/>
                  )}
                  {page === "blog" && (
                    // <motion.div
                    //   key="blog"
                    //   initial={{ opacity: 0, y: -50 }}
                    //   animate={{ opacity: 1, y: 0 }}
                    //   exit={{ opacity: 0, y: 50 }}
                    //   className="space-y-6"
                    // >
                    //   <h2 className="text-2xl font-semibold">
                    //     Latest <span className="text-green-600">Blog Posts</span>
                    //   </h2>

                    //   <motion.div
                    //     variants={timelineVariants}
                    //     initial="hidden"
                    //     animate="visible"
                    //     className="relative pl-8 border-l-2 border-slate-300"
                    //   >
                    //     {blogs.map((post: {node: {
                    //       tags: Array<{
                    //         name: string
                    //       }>,
                    //       brief: string,
                    //       title: string,
                    //       url: string,
                    //       publishedAt: string,
                    //       readTimeInMinutes: string
                    //     }}, index:number) => (
                    //       <motion.div
                    //         key={index}
                    //         custom={index}
                    //         variants={itemVariants}
                    //         initial="hidden"
                    //         animate="visible"
                    //         className="mb-8 relative"
                    //       >
                    //         {/* Timeline dot */}
                    //         <div className="absolute -left-[33px] w-4 h-4 bg-slate-300 rounded-full">
                    //           <div className="absolute inset-1 bg-white rounded-full" />
                    //         </div>

                    //         {/* Content */}
                    //         <a
                    //           href={post.node.url}
                    //           target="_blank"
                    //           rel="noopener noreferrer"
                    //           className="block bg-slate-50 rounded-lg p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
                    //         >
                    //           <div className="flex justify-between items-start">
                    //             <span className="text-sm font-medium text-slate-500">{post.node.publishedAt}</span>
                    //             <span className="text-sm text-slate-400">{post.node.readTimeInMinutes} Minutes read</span>
                    //           </div>
                    //           <h3 className="text-lg font-semibold text-slate-800 mt-1">{post.node.title}</h3>
                    //           <p className="text-slate-600 mt-2">{post.node.brief}</p>
                    //           <div className="flex flex-wrap gap-2 mt-3">
                    //             {post.node.tags.map((tag: {name: string}, tagIndex: number) => (
                    //               <span
                    //                 key={tagIndex}
                    //                 className="px-2 py-1 text-xs font-medium bg-slate-200 text-slate-700 rounded-full"
                    //               >
                    //                 {tag.name}
                    //               </span>
                    //             ))}
                    //           </div>
                    //         </a>
                    //       </motion.div>
                    //     ))}
                    //   </motion.div>

                    //   <div className="text-center mt-8">
                    //     <a
                    //       href="https://blogs.yasararafath.in/"
                    //       target="_blank"
                    //       rel="noopener noreferrer"
                    //       className="inline-flex items-center justify-center px-4 py-2 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition-colors font-medium text-sm"
                    //     >
                    //       View all posts on Hashnode →
                    //     </a>
                    //   </div>
                    // </motion.div>
                    <BlogScreen blogs={blogs}/>
                  )}
                  {page === "gallery" && (
                    // <motion.div
                    //   key="gallery"
                    //   variants={variants}
                    //   initial="hidden"
                    //   animate="visible"
                    //   exit="exit"
                    //   className="space-y-6"
                    // >
                    //   <h2 className="text-2xl font-semibold">
                    //     My <span className="text-green-600">Gallery</span>
                    //   </h2>

                    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    //     {[
                    //       "https://images.pexels.com/photos/28617424/pexels-photo-28617424/free-photo-of-cozy-indoor-scene-with-turkish-tea.jpeg",
                    //       "https://images.pexels.com/photos/30368522/pexels-photo-30368522/free-photo-of-autumn-at-museum-island-berlin-germany.jpeg"
                    //     ].map((item, index) => (
                    //       <motion.div
                    //         key={item}
                    //         className="relative bg-slate-50 rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition-all"
                    //       >
                    //         <div className="relative w-full h-48">
                    //           <Image
                    //             src={item}
                    //             alt={`Gallery Image ${index + 1}`}
                    //             fill
                    //             className="object-cover"
                    //             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    //           />
                    //         </div>
                    //         <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    //           <p className="text-white text-lg font-semibold">Image {index + 1}</p>
                    //         </div>
                    //       </motion.div>
                    //     ))}
                    //   </div>
                    // </motion.div>
                    <GalleryScreen/>
                  )}
                  {page === "career" && (
                    // <motion.div
                    //   key="career"
                    //   variants={variants}
                    //   initial="hidden"
                    //   animate="visible"
                    //   exit="exit"
                    //   className="space-y-6"
                    // >
                    //   <h2 className="text-2xl font-semibold">
                    //     Career <span className="text-green-600">Journey</span>
                    //   </h2>

                    //   <motion.div
                    //     variants={timelineVariants}
                    //     initial="hidden"
                    //     animate="visible"
                    //     className="relative pl-8 border-l-2 border-slate-300"
                    //   >
                    //     {careerHistory.map((item, index) => (
                    //       <motion.div
                    //         key={index}
                    //         custom={index}
                    //         variants={itemVariants}
                    //         initial="hidden"
                    //         animate="visible"
                    //         className="mb-8 relative"
                    //       >
                    //         {/* Timeline dot */}
                    //         <div className="absolute -left-[33px] w-4 h-4 bg-slate-300 rounded-full">
                    //           <div className="absolute inset-1 bg-white rounded-full" />
                    //         </div>

                    //         {/* Content */}
                    //         <div className="bg-slate-50 rounded-lg p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                    //           <span className="text-sm font-medium text-slate-500">{item.period}</span>
                    //           <h3 className="text-lg font-semibold text-slate-800 mt-1">{item.role}</h3>
                    //           <p className="text-green-600 font-medium">{item.company}</p>
                    //           <p className="text-slate-600 mt-2">{item.description}</p>
                    //           <div className="flex flex-wrap gap-2 mt-3">
                    //             {item.tech.map((tech, techIndex) => (
                    //               <span
                    //                 key={techIndex}
                    //                 className="px-2 py-1 text-xs font-medium bg-slate-200 text-slate-700 rounded-full"
                    //               >
                    //                 {tech}
                    //               </span>
                    //             ))}
                    //           </div>
                    //         </div>
                    //       </motion.div>
                    //     ))}
                    //   </motion.div>
                    // </motion.div>
                    <CareerScreen/>
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
      <div className="absolute right-10 bottom-10 w-1/4">
        <ChatWidget/>
      </div>
    </div>
  );
}
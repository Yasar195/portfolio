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

interface CareerHistoryItem {
  period: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}


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

  const careerHistory: CareerHistoryItem[] = [
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
                    <AboutScreen/>
                  )}
                  {page === "contact" && (
                    <ContactScreen/>
                  )}
                  {page === "blog" && (
                    <BlogScreen blogs={blogs}/>
                  )}
                  {page === "gallery" && (
                    <GalleryScreen/>
                  )}
                  {page === "career" && (
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
    </div>
  );
}
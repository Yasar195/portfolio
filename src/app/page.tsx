"use client";

import Image from "next/image";
import photo from "../../public/yasar.png";
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

  return (
    <div className="relative h-screen bg-slate-100 p-4 sm:p-6 md:p-8">
      <main className="mx-auto max-w-8xl">
        <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:gap-8 h-full">
            {/* Left Section - Navigation & Content */}
            <div className="w-full md:w-1/2 flex flex-col h-[calc(100vh-12rem)]">
              {/* Navigation - Fixed */}
              <nav className="bg-sky-100 rounded-full p-4 mb-8 sticky top-0 z-10">
                <div className="flex flex-wrap md:flex-nowrap justify-center gap-3">
                  {["about", "blog", "career", "projects", "contact", "gallery"].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => setPage(item)}
                      className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors
                        ${page === item
                          ? "bg-sky-300 text-slate-700"
                          : "text-slate-600 hover:bg-sky-200"
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
          &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-600">Yasar Arafath</span>. All rights reserved.
        </p>
      </div>
      <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-50 bg-sky-600 rounded-full">
        <ChatWidget/>
      </div>
    </div>
  );
}
import { motion } from "framer-motion";
import Image from "next/image";

const GalleryScreen = () => {
  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  const images: string[] = [];

  return (
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
        {images.map((item, index) => (
          <motion.div
            key={item}
            className="relative bg-slate-50 rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition-all"
          >
            <div className="relative w-full h-48">
              <Image
                src={item}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white text-lg font-semibold">Image {index + 1}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GalleryScreen;
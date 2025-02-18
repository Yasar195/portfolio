import { motion } from "framer-motion";

const AboutScreen = () => {
  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  return (
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
        Welcome to my portfolio! I'm a passionate software engineer with a drive for solving real-world problems through elegant code. I specialize in full-stack web development, and I love creating seamless user experiences that are both functional and beautiful.
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
          I am deeply motivated by the impact that technology can have on peoples lives. Whether its optimizing a process, improving user experience, or building something entirely new, Im driven to create innovative solutions that leave a lasting impact.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutScreen;
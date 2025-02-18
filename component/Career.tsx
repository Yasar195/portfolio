import { motion } from "framer-motion";

interface CareerHistoryItem {
  period: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

const CareerScreen = () => {
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
            <div className="absolute -left-[33px] w-4 h-4 bg-slate-300 rounded-full">
              <div className="absolute inset-1 bg-white rounded-full" />
            </div>

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
  );
};

export default CareerScreen;
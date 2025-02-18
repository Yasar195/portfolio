import { motion } from "framer-motion";

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

interface BlogScreenProps {
  blogs: BlogPost[];
}

const BlogScreen = ({ blogs }: BlogScreenProps) => {
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

  return (
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
        {blogs.map((post, index) => (
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

            <a
              href={post.node.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-slate-50 rounded-lg p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-slate-500">
                  {post.node.publishedAt}
                </span>
                <span className="text-sm text-slate-400">
                  {post.node.readTimeInMinutes} Minutes read
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mt-1">
                {post.node.title}
              </h3>
              <p className="text-slate-600 mt-2">{post.node.brief}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {post.node.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs font-medium bg-slate-200 text-slate-700 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-8">
        <a
          href="https://blogs.yasararafath.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition-colors font-medium text-sm"
        >
          View all posts on Hashnode →
        </a>
      </div>
    </motion.div>
  );
};

export default BlogScreen;
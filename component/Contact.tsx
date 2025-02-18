import { motion } from "framer-motion";

const ContactScreen = () => {
  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      key="contact"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold">
        Get in Touch <span className="text-green-600">with Me</span>
      </h2>

      <div className="bg-slate-50 p-6 rounded-lg shadow-md">
        <p className="text-lg text-slate-600">
          Have a question or want to work together? Drop me a message and I get back to you as soon as possible.
        </p>

        <form action="https://formspree.io/f/maykbjwb" method="POST" className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="yourname@example.com"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm font-medium text-slate-700">Your Message</label>
            <textarea
              id="message"
              name="message"
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactScreen;
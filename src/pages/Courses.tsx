// file: src/pages/Courses.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { popularCourses } from "@/mocks/data";

function Courses() {
  return (
    <div className="min-h-screen bg-[var(--color-rice-paper)]">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 md:pt-28 pb-16">
        <div className="bg-white rounded-2xl shadow-md card-shadow p-6 md:p-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">传统小课</h1>
              <p className="text-slate-600 mt-2">系统化学习传统文化的精要与实践</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.map((course, i) => (
              <motion.div
                key={course.id}
                className="rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all bg-white"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link to={`/courses/${course.id}`}>
                  <div className="h-40 overflow-hidden">
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-1">{course.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>{course.chapters} 课时</span>
                      <span>{course.enrolled.toLocaleString()} 人已学习</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Courses;
import { motion } from "framer-motion";
import { Course } from "@/mocks/data";
import { Link } from "react-router-dom";

interface ThematicCoursesProps {
  courses: Course[];
}

export default function ThematicCourses({ courses }: ThematicCoursesProps) {
  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-md card-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">主题小课</h2>
          <Link to="/courses" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            <span>查看全部</span>
            <i className="fas fa-chevron-right ml-1 text-sm"></i>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              className="rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.random() * 0.2 }}
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
    </motion.div>
  );
}
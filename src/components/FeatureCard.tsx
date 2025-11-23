import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

export default function FeatureCard({
  id,
  title,
  description,
  icon,
  color,
  link,
}: FeatureCardProps) {
  return (
    <motion.div
      id={id}
      className="bg-white rounded-2xl overflow-hidden shadow-md card-shadow"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={link} className="block p-6 h-full flex flex-col">
        <div className={`${color} w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl mb-5`}>
          <i className={icon}></i>
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-800">{title}</h3>
        <p className="text-slate-600 mb-4 flex-grow">{description}</p>
        <div className="flex items-center text-slate-700 font-medium">
          <span>了解更多</span>
          <i className="fas fa-arrow-right ml-2 text-sm"></i>
        </div>
      </Link>
    </motion.div>
  );
}
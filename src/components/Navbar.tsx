import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { featureModules } from "@/mocks/data";

export default function Navbar() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white text-xl font-bold mr-2">
                <i className="fas fa-book"></i>
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-700 to-blue-700 bg-clip-text text-transparent">
                文化传承
              </span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {featureModules.slice(0, 5).map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Link
                  to={module.link}
                  className="text-slate-700 hover:text-blue-700 font-medium transition-colors flex items-center"
                >
                  <span className="mr-1 text-sm">{module.title}</span>
                </Link>
              </motion.div>
            ))}
            
            {/* 用户区域 */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                aria-label={theme === "light" ? "切换到暗色模式" : "切换到亮色模式"}
              >
                {theme === "light" ? (
                  <i className="fas fa-moon"></i>
                ) : (
                  <i className="fas fa-sun"></i>
                )}
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/profile"
                  className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors relative"
                >
                  <i className="fas fa-user"></i>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </Link>
              </motion.div>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
            >
              <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white border-t border-slate-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              {featureModules.map((module) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={module.link}
                    className="flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={`w-8 h-8 rounded-lg ${module.color.replace('bg-', 'bg-opacity-20 text-')} flex items-center justify-center mr-3`}>
                      <i className={module.icon}></i>
                    </span>
                    <span className="text-slate-700">{module.title}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* 主题切换和用户区域 */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
              <button
                onClick={toggleTheme}
                className="flex items-center p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <i className={`mr-2 ${theme === "light" ? "fas fa-moon" : "fas fa-sun"}`}></i>
                <span>{theme === "light" ? "暗色模式" : "亮色模式"}</span>
              </button>
              
              <Link
                to="/profile"
                className="flex items-center p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <i className="fas fa-user mr-2"></i>
                <span>个人中心</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
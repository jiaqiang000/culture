import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CarouselItem } from "@/mocks/data";
import { Link } from "react-router-dom";

interface HeroCarouselProps {
  items: CarouselItem[];
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [items.length]);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };
  
  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
      <div className="relative h-[400px] md:h-[500px]">
        {/* 轮播内容 */}
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative h-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-10">
                <motion.h2
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  className="text-white/90 text-lg md:text-xl mb-6 max-w-2xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {item.description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Link to={item.link}>
                    <button className="traditional-btn px-6 py-3 rounded-lg font-medium text-lg hover:shadow-lg transition-all">
                      立即查看
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* 导航按钮 */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 transition-all"
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 transition-all"
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        
        {/* 指示器 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-10"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
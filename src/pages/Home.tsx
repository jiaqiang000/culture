import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import FeatureCard from "@/components/FeatureCard";
import DailyContent from "@/components/DailyContent";
import QnAEncyclopedia from "@/components/QnAEncyclopedia";
import ThematicCourses from "@/components/ThematicCourses";
import { 
  carouselItems, 
  featureModules, 
  dailyContent as dailyContentData, 
  encyclopediaEntries,
  popularCourses
} from "@/mocks/data";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 监听滚动事件，用于导航栏样式变化
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-[var(--color-rice-paper)]">
      {/* 导航栏 */}
      <Navbar />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 pt-24 md:pt-28 pb-16">
        {/* 轮播 */}
        <section className="mb-16">
          <HeroCarousel items={carouselItems} />
        </section>
        
        {/* 功能卡片 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">传统文化学习中心</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureModules.map((module, index) => (
              <FeatureCard
                key={module.id}
                id={module.id}
                title={module.title}
                description={module.description}
                icon={module.icon}
                color={module.color}
                link={module.link}
              />
            ))}
          </div>
        </section>
        
        {/* 每日内容 */}
        <section className="mb-16">
          <DailyContent content={dailyContentData} />
        </section>
        

        
        {/* 学习数据统计 */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-md card-shadow">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">学习数据一览</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700 mb-2">3,500+</div>
              <div className="text-slate-600">文化词条</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-700 mb-2">120+</div>
              <div className="text-slate-600">精品课程</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">50,000+</div>
              <div className="text-slate-600">注册用户</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">98%</div>
              <div className="text-slate-600">用户好评</div>
            </div>
          </div>
        </section>
      </main>
      
      {/* 页脚 */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white text-xl font-bold mr-2">
                  <i className="fas fa-book"></i>
                </div>
                <span className="text-xl font-bold">文化传承</span>
              </div>
              <p className="text-slate-300 text-sm">
                传承中华文化，弘扬传统美德，让传统文化走进现代生活。
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {featureModules.slice(0, 5).map((module) => (
                  <li key={module.id}>
                    <a href={module.link} className="hover:text-white transition-colors">
                      {module.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">资源中心</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">经典文献</a></li>
                <li><a href="#" className="hover:text-white transition-colors">节日习俗</a></li>
                <li><a href="#" className="hover:text-white transition-colors">传统艺术</a></li>
                <li><a href="#" className="hover:text-white transition-colors">历史人物</a></li>
                <li><a href="#" className="hover:text-white transition-colors">学术研究</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">联系我们</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2"></i>
                  <span>contact@wenhuachuan.com</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone mr-2"></i>
                  <span>400-123-4567</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>北京市海淀区中关村大街1号</span>
                </li>
              </ul>
              
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-white hover:text-red-400 transition-colors">
                  <i className="fab fa-weixin text-xl"></i>
                </a>
                <a href="#" className="text-white hover:text-red-400 transition-colors">
                  <i className="fab fa-weibo text-xl"></i>
                </a>
                <a href="#" className="text-white hover:text-red-400 transition-colors">
                  <i className="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 文化传承 · 传统文化学习助手. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
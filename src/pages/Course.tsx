import Navbar from "@/components/Navbar"; // 假设导航栏组件在这里
// 如果没有 Footer 组件，可以删除下面这行和底部的 <footer> 标签
import { useState, useEffect } from "react";

export default function Courses() {
  // 简单的滚动监听，为了让 Navbar 样式保持一致（可选）
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-rice-paper)]">
      {/* 1. 复用顶部导航栏 (通常导航栏里点击 Logo 就能回首页) */}
      <Navbar />

      <main className="container mx-auto px-4 pt-24 md:pt-32 pb-16">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">主题小课</h1>
          <p className="text-slate-600">系统化学习传统文化知识，精选课程等你来学</p>
        </div>

        {/* 2. 静态展示内容 (不含任何功能逻辑，纯展示) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* 假卡片 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="h-40 bg-blue-100 rounded-lg mb-4 flex items-center justify-center text-blue-500">
              <i className="fas fa-book-reader text-4xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">论语导读</h3>
            <p className="text-slate-500 text-sm">深入浅出解读儒家经典，领悟圣人智慧。</p>
          </div>

          {/* 假卡片 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="h-40 bg-red-100 rounded-lg mb-4 flex items-center justify-center text-red-500">
              <i className="fas fa-paint-brush text-4xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">书法入门</h3>
            <p className="text-slate-500 text-sm">从执笔到运笔，零基础掌握汉字书写之美。</p>
          </div>

          {/* 假卡片 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="h-40 bg-green-100 rounded-lg mb-4 flex items-center justify-center text-green-500">
              <i className="fas fa-tea text-4xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">茶道文化</h3>
            <p className="text-slate-500 text-sm">识茶、泡茶、品茶，在茶香中修身养性。</p>
          </div>
        </div>

        {/* 3. 返回首页的大按钮 */}
        <div className="text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-8 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors font-medium"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            返回首页
          </a>
        </div>
      </main>

      {/* 简单的页脚 */}
      <footer className="bg-slate-800 text-white py-8 text-center text-sm text-slate-400">
        <p>© 2025 文化传承 · 传统文化学习助手</p>
      </footer>
    </div>
  );
}
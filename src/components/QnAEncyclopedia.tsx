import { useState } from "react";
import { motion } from "framer-motion";
import { EncyclopediaEntry } from "@/mocks/data";
import { toast } from "sonner";

interface QnAEncyclopediaProps {
  entries: EncyclopediaEntry[];
}

export default function QnAEncyclopedia({ entries }: QnAEncyclopediaProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [searchResults, setSearchResults] = useState<EncyclopediaEntry[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast("请输入搜索内容");
      return;
    }
    
    // 模拟搜索逻辑
    let results = entries.filter(entry => 
      entry.title.includes(searchTerm) || 
      entry.definition.includes(searchTerm) || 
      entry.originalText.includes(searchTerm)
    );
    
    // 根据选择的级别筛选
    if (selectedLevel !== "all") {
      results = results.filter(entry => entry.level === selectedLevel);
    }
    
    setSearchResults(results);
    setShowResults(true);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  
  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-md card-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">问答百科</h2>
        
        {/* 搜索框 */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索传统文化知识，例如：中秋节、见素抱朴..."
              className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              onClick={handleSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="搜索"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
          
          {/* 难度级别选择 */}
          <div className="flex space-x-2 mt-3">
            <button 
              onClick={() => setSelectedLevel("all")}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                selectedLevel === "all" 
                  ? "bg-blue-600 text-white" 
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              全部
            </button>
            <button 
              onClick={() => setSelectedLevel("primary")}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                selectedLevel === "primary" 
                  ? "bg-blue-600 text-white" 
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              小学
            </button>
            <button 
              onClick={() => setSelectedLevel("secondary")}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                selectedLevel === "secondary" 
                  ? "bg-blue-600 text-white" 
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              初高中
            </button>
            <button 
              onClick={() => setSelectedLevel("adult")}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                selectedLevel === "adult" 
                  ? "bg-blue-600 text-white" 
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              成人
            </button>
          </div>
        </div>
        
        {/* 搜索结果 */}
        {showResults && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">
              搜索结果 ({searchResults.length})
            </h3>
            
            {searchResults.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <i className="fas fa-search fa-3x mb-3"></i>
                <p>没有找到相关内容，请尝试其他关键词</p>
              </div>
            ) : (
              <div className="space-y-6">
                {searchResults.map((entry) => (
                  <motion.div 
                    key={entry.id}
                    className="p-4 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-lg font-bold text-slate-800 mb-2">{entry.title}</h4>
                    <p className="text-slate-700 mb-3">{entry.definition}</p>
                    
                    <div className="space-y-3 mt-4">
                      <div>
                        <h5 className="text-sm font-semibold text-slate-600">原文</h5>
                        <p className="text-slate-700 italic">{entry.originalText}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-semibold text-slate-600">注释</h5>
                        <p className="text-slate-700">{entry.annotations}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-semibold text-slate-600">应用场景</h5>
                        <p className="text-slate-700">{entry.application}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        entry.level === "primary" ? "bg-green-100 text-green-800" :
                        entry.level === "secondary" ? "bg-blue-100 text-blue-800" :
                        "bg-purple-100 text-purple-800"
                      }`}>
                        {entry.level === "primary" ? "小学" : 
                         entry.level === "secondary" ? "初高中" : "成人"}
                      </span>
                      
                      <div className="flex space-x-2">
                        <button className="text-slate-500 hover:text-blue-600 transition-colors">
                          <i className="far fa-bookmark"></i>
                        </button>
                        <button className="text-slate-500 hover:text-blue-600 transition-colors">
                          <i className="far fa-share-square"></i>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
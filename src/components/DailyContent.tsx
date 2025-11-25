import { useState } from "react";
import { motion } from "framer-motion";
import { DailyContent as DailyContentType } from "@/mocks/data";
import { toast } from "sonner";

interface DailyContentProps {
  content: DailyContentType;
}

export default function DailyContent({ content }: DailyContentProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  
  const handleCheckIn = () => {
    setIsCheckedIn(true);
    toast("签到成功！继续保持学习哦~");
  };
  
  // 复制文案到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("文案已复制到剪贴板");
  };
  
  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-md card-shadow"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-slate-800">今日学习</h2>
          <button 
            onClick={handleCheckIn}
            disabled={isCheckedIn}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isCheckedIn 
                ? "bg-green-100 text-green-700 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isCheckedIn ? "已签到" : "签到打卡"}
          </button>
        </div>
        
        {/* 每日内容 */}
        <div className="mb-6">
          {/* 每日一句 */}
          {content.type === "quote" && (
            <>
              <div className="text-xl md:text-2xl font-serif text-slate-800 mb-4 italic">
                "{content.content}"
              </div>
              <div className="text-sm text-slate-500 mb-4">
                —— {content.source}
              </div>
              <div className="text-slate-700 mb-4">
                <p className="mb-2"><strong>释义：</strong>{content.explanation}</p>
                {content.examples && (
                  <p><strong>现代应用：</strong>{content.examples}</p>
                )}
              </div>
              
              {/* 文案建议 */}
              {content.文案Suggestion && (
                <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-slate-700 mb-2"><strong>朋友圈文案建议：</strong></p>
                  <div className="flex items-center justify-between">
                    <p className="text-slate-800">{content.文案Suggestion}</p>
                    <button 
                      onClick={() => copyToClipboard(content.文案Suggestion || "")}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      aria-label="复制文案"
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* 每日一问 */}
          {content.type === "question" && (
            <>
              <div className="text-lg md:text-xl font-medium text-slate-800 mb-4">
                {content.content}
              </div>
              {content.options && content.options.map((option, index) => (
                <div key={index} className="mb-2">
                  <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center">
                    <span className="w-6 h-6 rounded-full border border-slate-300 mr-3 flex-shrink-0"></span>
                    <span>{option}</span>
                  </button>
                </div>
              ))}
              <button className="w-full mt-4 traditional-btn py-3 rounded-lg font-medium">
                提交答案
              </button>
            </>
          )}
        </div>
        
        {/* 操作按钮 */}
        <div className="flex justify-between pt-4 border-t border-slate-100">
          <button className="text-slate-600 hover:text-slate-900 transition-colors flex items-center">
            <i className="far fa-heart mr-1"></i>
            <span>收藏</span>
          </button>
          <button className="text-slate-600 hover:text-slate-900 transition-colors flex items-center">
            <i className="far fa-comment mr-1"></i>
            <span>评论</span>
          </button>
          <button className="text-slate-600 hover:text-slate-900 transition-colors flex items-center">
            <i className="fas fa-share-alt mr-1"></i>
            <span>分享</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
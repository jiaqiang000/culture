import React, { useEffect, useState, useRef } from 'react';
// 官方 SDK
import { CozeAPI } from '@coze/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

interface LearningContent {
  displayTitle: string; // 图片上显示的标题（保留原有逻辑）
  headline: string;     // 新增：来自 JSON 的 headline，显示在正文上方
  body: string;
  imageUrl: string;
  bvid?: string;
  videoUrl?: string;
}

const DailyLearning: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<LearningContent | null>(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("🚀 [1. 初始化] 开始请求 Coze API...");

        const apiClient = new CozeAPI({
          // 你的 Token
          token: 'pat_KU9MFW9eh3zsRrSI4AoqmsgyjC3KzlFB7HEH6yC7oEfBfUSrYapE3yfCHLUUnRHF', 
          baseURL: '/coze-api', 
          allowPersonalAccessTokenInBrowser: true
        });

        const stream = await apiClient.workflows.runs.stream({
          workflow_id: '7576610907926528046',
          parameters: {
            "input": ""
          },
        });

        console.log("✅ [2. 连接] 成功建立连接，等待 AI 生成...");

        for await (const part of stream) {
          const data = part.data;
              
          if (data && data.content) {
            try {
              if (data.content === '{}') continue;

              const parsedContent = JSON.parse(data.content);
              
              // 1. 获取文字内容
              const outputText = parsedContent.output || "";

              // 2. 获取 headline
              const headlineText = parsedContent.headline || "";
              console.log("📰 [获取到标题 Headline]:", headlineText);

              // 3. 新增：获取 Coze 自带的 imageUrl
              const cozeImageUrl: string | undefined = parsedContent.imageUrl;
              console.log("🖼 [获取到 Coze imageUrl]:", cozeImageUrl);

              // 4. 获取视频列表
              const videoList = parsedContent.videoOutput;

              let bvid = "";
              // 先默认用 Coze 的 imageUrl，如果没有再用兜底图
              let coverImage =
                cozeImageUrl && cozeImageUrl.trim().length > 0
                  ? cozeImageUrl
                  : "https://images.unsplash.com/photo-1578458804373-c6463943f671?q=80&w=2070&auto=format&fit=crop";

              console.log("🎬 [原始 videoOutput 数据]:", videoList);

              if (Array.isArray(videoList) && videoList.length > 0) {
                const firstVideo = videoList[0];

                if (firstVideo.bvid) {
                  bvid = firstVideo.bvid;
                  console.log("🆔 [成功提取 BVID]:", bvid);
                }

                // ⚠️ 只有当上面没有从 Coze 拿到 imageUrl 时，才用 B 站封面兜底
                if ((!cozeImageUrl || cozeImageUrl.trim().length === 0) && firstVideo.pic) {
                  if (firstVideo.pic.startsWith('//')) {
                    coverImage = `https:${firstVideo.pic}`;
                  } else {
                    coverImage = firstVideo.pic;
                  }
                }
              }

              if (!outputText) continue;

              // 生成 displayTitle（保持你原来的逻辑）
              const lines = outputText.split('\n');
              let generatedTitle = "每日学习";

              if (lines.length > 0) {
                const firstLine = lines[0].trim();
                if (firstLine.includes('#')) {
                  generatedTitle = firstLine.replace(/[#\s]/g, '');
                } else if (firstLine.length > 0 && firstLine.length < 20) {
                  generatedTitle = firstLine;
                }
              }

              setContent({
                displayTitle: generatedTitle, // 顶部图片上的字
                headline: headlineText,       // 正文上方大标题
                body: outputText,
                imageUrl: coverImage,         // ✅ 现在优先用 Coze 的 imageUrl
                bvid: bvid,
              });

              setLoading(false);

            } catch (e) {
              console.warn("⚠️ 解析出错", e);
              if (data.content.length > 5) {
                setContent({
                  displayTitle: "每日文化",
                  headline: "今日分享",
                  body: data.content,
                  imageUrl: "https://images.unsplash.com/photo-1578458804373-c6463943f671?q=80&w=2070&auto=format&fit=crop",
                });
                setLoading(false);
              }
            }
          }
        }

      } catch (error) {
        console.error("❌ API 请求失败:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfbf6] text-[#4a4a4a] font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center text-sm text-gray-500 cursor-pointer hover:text-[#b43c34]" onClick={() => navigate('/')}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          返回首页
        </div>

        {loading ? (
          <div className="animate-pulse flex flex-col items-center mt-20">
            <div className="h-64 w-full bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-8 w-1/2 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
            <p className="mt-4 text-gray-400">正在生成今日传统文化内容</p>
          </div>
        ) : content ? (
          <div className="bg-white rounded-xl shadow-sm border border-[#eaddcf] overflow-hidden">
            {/* 顶部图片区域 */}
            <div className="w-full h-80 relative bg-gray-100">
               <img src={content.imageUrl} alt={content.displayTitle} className="w-full h-full object-cover"/>
               <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
               <h1 className="absolute bottom-6 left-6 text-3xl font-bold text-white tracking-wide shadow-sm">
                 {content.displayTitle}
               </h1>
            </div>

            <div className="p-8">
              {/* --- 新增：主标题 Headline --- */}
              {content.headline && (
                <h2 className="text-2xl font-bold text-[#2c2c2c] mb-6 leading-tight border-b border-[#f0ece3] pb-4">
                  {content.headline}
                </h2>
              )}

              {/* 正文 Output */}
              <div className="prose prose-stone max-w-none leading-relaxed text-lg text-gray-700 whitespace-pre-wrap">
                {content.body}
              </div>

              {/* 视频区域 */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-[#b43c34] mb-4 border-l-4 border-[#b43c34] pl-3">
                    相关视频
                </h3>
                <div className="w-full rounded-lg overflow-hidden border border-[#eaddcf] bg-black aspect-video">
                  {content.bvid ? (
                     <iframe 
                        src={`//player.bilibili.com/player.html?bvid=${content.bvid}&page=1&high_quality=1&danmaku=0`} 
                        allowFullScreen
                        className="w-full h-full"
                        scrolling="no" 
                        frameBorder="0" 
                        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
                     ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <p>暂无视频资源</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p>未能获取内容。</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DailyLearning;
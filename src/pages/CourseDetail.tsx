// file: src/pages/CourseDetail.tsx
import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { courseDetails, popularCourses } from "@/mocks/data";

export default function CourseDetail() {
  const { id } = useParams();
  const detail = useMemo(() => (id ? courseDetails[id] : undefined), [id]);
  const [activeTab, setActiveTab] = useState<"overview" | "notes">("overview");
  const [chapterIndex, setChapterIndex] = useState(0);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;
    const saved = localStorage.getItem(`course_note_${id}`) || "";
    if (saved) {
      try {
        // 尝试解析为数组，兼容旧版本纯字符串
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSavedNotes(parsed);
        } else {
          setSavedNotes([saved]);
        }
      } catch (e) {
        setSavedNotes([saved]);
      }
    } else {
      setSavedNotes([]);
    }
    setChapterIndex(0);
    setActiveTab("overview");
  }, [id]);

  const handleSaveNote = () => {
    if (!id || !note.trim()) return;
    const newNotes = [note, ...savedNotes];
    setSavedNotes(newNotes);
    localStorage.setItem(`course_note_${id}`, JSON.stringify(newNotes));
    setNote("");
  };

  const handleDeleteNote = (index: number) => {
    if (!id) return;
    const newNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(newNotes);
    localStorage.setItem(`course_note_${id}`, JSON.stringify(newNotes));
  };

  if (!detail) {
    return (
      <div className="min-h-screen bg-[var(--color-rice-paper)]">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 md:pt-28 pb-16">
          <div className="bg-white rounded-2xl shadow-md card-shadow p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">课程不存在</h2>
            <p className="text-slate-600 mb-6">请返回课程列表重新选择</p>
            <Link to="/courses" className="text-blue-600 hover:text-blue-800 font-medium">返回课程列表</Link>
          </div>
        </main>
      </div>
    );
  }

  const current = detail.chapters[chapterIndex];

  return (
    <div className="min-h-screen bg-[var(--color-rice-paper)]">
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section className="relative z-0">
          <div className="-mt-8 h-40 md:h-56 w-full">
            <img src={detail.coverImage} alt={detail.title} className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 -mt-10">
            <motion.div
              className="bg-white rounded-2xl shadow-md card-shadow p-6 md:p-8 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-slate-800">{detail.title}</h1>
              <p className="text-slate-600 mt-2">{detail.intro}</p>
              <div className="mt-4 text-slate-500 text-sm">
                <span>共 {detail.chapters.length} 课时</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2 bg-white rounded-2xl shadow-md card-shadow p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">{current.title}</h2>
            </div>
            {current.type === "video" && current.videoUrl ? (
              current.videoUrl.includes("player.bilibili.com") ? (
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    key={current.id}
                    src={current.videoUrl}
                    title={current.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups"
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <video src={current.videoUrl} controls className="w-full rounded-xl shadow-sm bg-black h-64 md:h-80" />
              )
            ) : (
              <div>
                <p className="text-slate-700 leading-7">{current.content}</p>
              </div>
            )}
          </motion.div>

          <motion.aside
            className="bg-white rounded-2xl shadow-md card-shadow p-6 flex flex-col"
            style={{ maxHeight: 'calc(100vh - 100px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex-shrink-0">章节目录</h3>
            <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-grow">
              {detail.chapters.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setChapterIndex(idx)}
                  className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                    idx === chapterIndex
                      ? "border-blue-600 bg-blue-50 text-blue-800"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="text-sm">{c.title}</div>
                  <div className="text-xs text-slate-500">{c.type === "video" ? "视频" : "图文"}</div>
                </button>
              ))}
            </div>
          </motion.aside>
        </section>

        <section className="container mx-auto px-4 mt-6">
          <div className="bg-white rounded-2xl shadow-md card-shadow">
            <div className="flex border-b border-slate-200 px-6">
              {[
                { key: "overview", label: "课程详情" },
                { key: "notes", label: "学习笔记" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key as any)}
                  className={`py-3 mr-4 text-sm font-medium ${
                    activeTab === t.key ? "text-blue-700 border-b-2 border-blue-700" : "text-slate-600"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="p-6">
              {activeTab === "overview" && (
                <div className="text-slate-700 leading-7">{detail.intro}</div>
              )}
              {activeTab === "notes" && (
                <div>
                  {/* 笔记列表 */}
                  {savedNotes.length > 0 && (
                    <div className="mb-6 space-y-4">
                      <h4 className="font-medium text-slate-700">我的笔记</h4>
                      {savedNotes.map((savedNote, index) => (
                        <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative group">
                          <p className="text-slate-700 whitespace-pre-wrap">{savedNote}</p>
                          <div className="text-xs text-slate-400 mt-2 text-right">
                            {new Date().toLocaleDateString()}
                          </div>
                          <button
                            onClick={() => handleDeleteNote(index)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="删除笔记"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* 输入区域 */}
                  <div className="relative">
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full h-32 rounded-lg border border-slate-300 p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                      placeholder="记录你的学习感悟与要点..."
                    />
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={handleSaveNote}
                        disabled={!note.trim()}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          note.trim() 
                            ? "bg-blue-600 text-white hover:bg-blue-700" 
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        添加笔记
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

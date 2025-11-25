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

  useEffect(() => {
    if (!id) return;
    const saved = localStorage.getItem(`course_note_${id}`) || "";
    setNote(saved);
    setChapterIndex(0);
    setActiveTab("overview");
  }, [id]);

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
        <section className="relative">
          <div className="h-56 md:h-72 w-full">
            <img src={detail.coverImage} alt={detail.title} className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 -mt-10">
            <motion.div
              className="bg-white rounded-2xl shadow-md card-shadow p-6 md:p-8"
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
                    src={current.videoUrl}
                    title={current.title}
                    allow="fullscreen"
                    allowFullScreen
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
            className="bg-white rounded-2xl shadow-md card-shadow p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4">章节目录</h3>
            <div className="space-y-2">
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
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full h-32 rounded-lg border border-slate-300 p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="记录你的学习感悟与要点"
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => id && localStorage.setItem(`course_note_${id}`, note)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      保存笔记
                    </button>
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

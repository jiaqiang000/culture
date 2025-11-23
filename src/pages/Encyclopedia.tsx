// src/pages/Encyclopedia.tsx
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    CozeWebSDK?: {
      WebChatClient: new (options: any) => any;
    };
  }
}

export default function Encyclopedia() {
  // 要嵌入聊天框的容器
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let client: any | undefined;
    let destroyed = false;
    let script: HTMLScriptElement | null = null;
    let onLoad: (() => void) | null = null;

    const initCoze = () => {
      if (destroyed) return;
      if (!window.CozeWebSDK) return;
      if (!chatContainerRef.current) return;

      // 每次进入页面都新建一个客户端，挂到当前容器上
      client = new window.CozeWebSDK.WebChatClient({
        config: {
          type: "bot",
          bot_id: "7575011934677499967", // 你的 bot_id
          isIframe: false,
        },
        componentProps: {
          title: "传统文化助手",
        },
        auth: {
          type: "token",
          token: "pat_h4Pf5PwqhlKBsixxAWCzPIqCUUqs9k20iqL41r4sSdzlWXbYwWn9VsQXqWH6e3lK",
          onRefreshToken: async () => "pat_h4Pf5PwqhlKBsixxAWCzPIqCUUqs9k20iqL41r4sSdzlWXbYwWn9VsQXqWH6e3lK",
        },
        ui: {
          base: {
            layout: "pc",
            lang: "zh-CN",
            zIndex: 1000,
          },
          // 关闭右下角悬浮球
          asstBtn: {
            isNeed: false,
          },
          // 把聊天框挂到当前页面的容器上，实现“嵌入”
          chatBot: {
            title: "传统文化助手",
            width: 460,
            el: chatContainerRef.current,
          },
        },
      });

      try {
        client.showChatBot();
      } catch (e) {
        console.error("调用 showChatBot 出错：", e);
      }
    };

    if (window.CozeWebSDK) {
      // SDK 已经加载
      initCoze();
    } else {
      // SDK 还在加载，从 index.html 里的 <script> 上监听 load
      script = document.querySelector<HTMLScriptElement>(
        'script[src*="chat-app-sdk"]'
      );
      if (script) {
        onLoad = () => initCoze();
        script.addEventListener("load", onLoad);
      } else {
        console.error(
          "找不到 Coze Chat SDK 的 <script> 标签，请确认 index.html 已正确引入。"
        );
      }
    }

    // 组件卸载时：移除监听 + 销毁客户端
    return () => {
      destroyed = true;
      if (onLoad && script) {
        script.removeEventListener("load", onLoad);
      }
      if (client && typeof client.destroy === "function") {
        client.destroy();
      }
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">问答百科</h1>
      <p className="text-slate-600 mb-4">
        本页面已嵌入 Coze「传统文化助手」，下面的区域就是聊天框。
      </p>

      {/*  聊天框要嵌入的容器 */}
      <div
        id="coze-chat-container"
        ref={chatContainerRef}
        style={{
          width: "100%",
          height: "600px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
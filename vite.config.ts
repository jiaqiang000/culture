/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
// 虽然有上面的警告，但为了解决 API 跨域问题，我们需要添加 server.proxy 配置

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function getPlugins() {
  const plugins = [react(), tsconfigPaths()];
  return plugins;
}

export default defineConfig({
  plugins: getPlugins(),
  // --- 新增的部分开始 ---
  server: {
    host: '0.0.0.0', 
    proxy: {
      // 代理配置：让本地服务器转发 /coze-api 开头的请求到 Coze 官网
      '/coze-api': {
        target: 'https://api.coze.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/coze-api/, ''),
        secure: false,
      },
    },
  },
  // --- 新增的部分结束 ---
});
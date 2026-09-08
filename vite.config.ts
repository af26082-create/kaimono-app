import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // このアプリ専用のポートに固定する。
    // strictPort: true にすると、空いていないときに別番号へずれず、エラーで止まる。
    port: 5180,
    strictPort: true,
    watch: {
      // OSからの変更通知が届かない環境向けに、Vite自身が定期的に
      // ファイルを見に行く方式（ポーリング）へ切り替える。
      usePolling: true,
      // 見に行く間隔（ミリ秒）。短くすると反映が速いがCPUを使う。
      interval: 300,
    },
  },
})

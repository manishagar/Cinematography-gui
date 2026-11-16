import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'


export default defineConfig(({ mode }) => {
  // Vite does NOT put .env values on process.env, so read them explicitly.
  // '' as the third arg loads every key, not just the VITE_ prefixed ones.
  const env = loadEnv(mode, process.cwd(), '')

  const certFile = env.SSL_CRT_FILE || 'D:/dev/cinematography-config/cert.pem'
  const keyFile = env.SSL_KEY_FILE || 'D:/dev/cinematography-config/key.pem'


  let https
  try {
    https = {
      cert: fs.readFileSync(certFile),
      key: fs.readFileSync(keyFile),
    }
  } catch (err) {
    console.warn(`[vite.config] ${err.message}; falling back to HTTP`)
  }

  return {
    plugins: [react()],

    server: {
      // Port 3000 is load-bearing: the registered OAuth redirect URI encodes
      // it. strictPort makes a busy port fail loudly instead of drifting to
      // 3001 and silently breaking /authcallback.
      port: 3000,
      strictPort: true,
      host : env.HOST || 'desktop-s31r7k7',
      allowedHosts: [env.HOST || 'desktop-s31r7k7', 'localhost', '127.0.0.1'],
      https,
    },

    build: {
      // outDir stays 'build' so deploy.ps1 and the Azure pipeline are
      // unchanged. assetsDir is Vite's default 'assets', which is what
      // nginx.conf's `location /assets/` block is written for.
      outDir: 'build',
      assetsDir: 'assets',
      target: ['es2020', 'chrome87', 'edge88', 'firefox78', 'safari14'],
      sourcemap: false,
      // exceljs ships as one prebuilt ~940 kB file that cannot be split. It is
      // loaded with import() only when a user exports to Excel, never on page
      // load, so the limit is raised just enough to cover it. Every other
      // chunk is well under 500 kB.
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Split large libraries out of the app bundle so each stays under
          // the 500 kB warning limit and browsers cache them across releases.
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            // CSS must stay in import order: the app's sidebar/header styles
            // load before bootstrap.min.css, and the UI depends on Bootstrap
            // winning. Chunking library CSS would reorder it.
            if (id.endsWith('.css')) return
            // Left to Rollup so it gets its own chunk, loaded only on export.
            if (/[\\/]node_modules[\\/]exceljs[\\/]/.test(id)) return
            if (/[\\/]node_modules[\\/](@mui|@emotion)[\\/]/.test(id)) return 'mui'
            if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react'
            if (/[\\/]node_modules[\\/](bootstrap|react-bootstrap|@restart|@popperjs)[\\/]/.test(id)) return 'bootstrap'
            return 'vendor'
          },
        },
      },
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
      css: true,
    },
  }
})

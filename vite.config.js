import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist'         
  },

  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  extensions: ['.js', '.jsx', '.ts', '.tsx']
})

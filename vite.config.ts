import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { defineConfig } from 'vite'

// `--mode preview` emits one self-contained HTML file (assets inlined) for
// sharing a clickable preview; the default build is the normal multi-file site.
export default defineConfig(({ mode }) => {
  const isPreview = mode === 'preview'
  return {
    plugins: [react(), tailwindcss(), ...(isPreview ? [viteSingleFile()] : [])],
    build: {
      outDir: isPreview ? 'dist-preview' : 'dist',
      assetsInlineLimit: isPreview ? 5_000_000 : 4096,
    },
  }
})

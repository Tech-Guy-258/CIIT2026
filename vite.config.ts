import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

// Plugin to ensure 404.html and .nojekyll exist in dist for SPA routing and GitHub Pages fallback
function spaFallbackPlugin(): Plugin {
  return {
    name: 'spa-fallback',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(outDir, 'index.html');
      const fourOhFourPath = path.join(outDir, '404.html');
      const noJekyllPath = path.join(outDir, '.nojekyll');

      if (fs.existsSync(indexPath)) {
        if (!fs.existsSync(fourOhFourPath)) {
          fs.copyFileSync(indexPath, fourOhFourPath);
        }
        if (!fs.existsSync(noJekyllPath)) {
          fs.writeFileSync(noJekyllPath, '');
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), spaFallbackPlugin()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

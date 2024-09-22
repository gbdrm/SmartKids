import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // This specifies the root of your project
  build: {
    outDir: 'dist', // Output built files to a build folder inside public
    emptyOutDir: true, // Clear the output directory on each build
    rollupOptions: {
      input: {
        main: 'index.html',
        quest: 'quest.html'
      }
    },
  },
  publicDir: 'public', // Treats 'public' as the place for static assets
  server: {
    open: true // Automatically open the app in the browser when starting the dev server
  }
});

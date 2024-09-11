import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig(
//   {
//   plugins: [react()],
// }
// )


// export default defineConfig({
//   plugins: [react()], // You don't need to add 'swiper' here
//   optimizeDeps: {
//     include: ['swiper'], // Optimize Swiper dependencies for Vite
//   },
// });


// export default {
//   optimizeDeps: {
//     include: ['swiper'],
//   }
// }

export default defineConfig({
  plugins: [react()], // You don't need to add 'swiper' here
  optimizeDeps: {
    include: ['swiper'], // Optimize Swiper dependencies for Vite
  },
  server: {
    hmr: {
      overlay: false, // Disable Vite's error overlay
    },
  },
});

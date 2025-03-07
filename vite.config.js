import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import {
    defineConfig
} from 'vite';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    base: '/build/',  // Make sure it matches your Laravel public path
    build: {
        outDir: '../build', // Ensure the output directory is correct
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }), 
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },

    // vite.config.js

    server: {
        host: '127.0.0.1',
        port: 5173
    }
  
    // server: {
    //     host: '192.168.10.179',
    //     port: 5173,
    //     cors: {
    //       origin: 'http://192.168.10.179', // Allow requests from this origin
    //       methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //       allowedHeaders: ['Content-Type', 'Authorization'],
    //     },
    // }
});  
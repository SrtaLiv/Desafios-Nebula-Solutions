import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';


/*
    get the local ip address of the machine
    to use it in the cors and hmr (hot module replacement) settings
    
    this is useful to access the dev server from other devices in the same network
    (e.g., a mobile phone, tablet, etc.) for better testing.
    without having to compile the app every time.
*/
import os from 'os';
function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return '127.0.0.1';
}
const localIp = getLocalIp()

export default defineConfig({

    /*
        access the dev server from other devices in the same network.
        you can add a custom domain in your etc/hosts file pointing to 127.0.0.1
        to isolate the site from other projects, and not have localStorage/cookies conflicts.
    */
    server: {
        host: '0.0.0.0',
        port: 5173,
        cors: {
            origin: [
                `http://${localIp}:8000`,
                'http://localhost:8000',
                'http://127.0.1:8000',
                // 'http://laravel.local' // add your custom domain here
            ],
        },
        hmr: {
            host: localIp,
        },
        // fs: {
        //   allow: ['..']
        // }
    },

    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        
        /* wayfinder breaks docker build */
        // wayfinder({
        //     formVariants: true,
        // }),

    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            // 'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    // assetsInclude: ['**/*.wasm']
});

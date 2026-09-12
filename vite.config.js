import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.js',
        include: [
            'src/**/*.test.{js,jsx,ts,tsx}',
            'backend/src/**/*.test.{js,jsx,ts,tsx}',
        ],
        exclude: [
            'node_modules/**',
            'backend/node_modules/**',
            'dist/**',
            'tests/**',
        ],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            thresholds: {
                lines: 60,
                functions: 60,
                branches: 50,
                statements: 60,
            },
        },
    },
})
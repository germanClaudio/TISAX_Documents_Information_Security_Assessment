/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./**/*.html",           // Escanea TODOS los HTML
        "./src/**/*.js",         // Escanea TODOS los JS en src/
        "./js/**/*.js",
        "./views/**/*.html",     // Escanea views y subcarpetas
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                //serif: ['Merriweather', 'Georgia', 'serif'], // ✅ Para texto largo
            },
            colors: {
                // Paleta primaria mejorada
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                // Paleta secundaria/acento
                secondary: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                },
                // Colores semánticos para UI
                success: {
                    50: '#f0fdf4',
                    500: '#22c55e',
                    700: '#15803d',
                },
                warning: {
                    50: '#fffbeb',
                    500: '#f59e0b',
                    700: '#b45309',
                },
                error: {
                    50: '#fef2f2',
                    500: '#ef4444',
                    700: '#b91c1c',
                }
            },
            // Mejoras de tipografía
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.75rem' }], // ✅ Mejor interlineado
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
            },
            // Espaciado mejorado para lectura
            spacing: {
                'prose': '65ch', // Ancho óptimo para texto
            }
        },
    },
    plugins: [
        // require('@tailwindcss/typography'), // ✅ PLUGIN RECOMENDADO
    ],
};
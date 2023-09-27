/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter'],
            },
            colors: {
                'azul': {
                    400: '#5EE0F1',
                    DEFAULT: '#5EE0F1',
                    800: '#1C274C',
                },
                'roxo': '#D05BFA',
                'vermelho':{
                    500: '#E51110',
                    DEFAULT: '#E51110',
                    700: '#B00F0F',
                },
                'preto': '#181818',
                'branco': '#FBFBFB',
                'cinza': {
                    100: '#ECECEC',
                    300: '#D9D9D9',
                    500: '#797979',
                    DEFAULT: '#797979',
                    700: '#363636',
                    
                    
                    
                },
            },
            borderRadius: {
                '10': '10px',
                '17': '17px',
                '19': '19px',
            },
            dropShadow: {
                'modal': '0 2px 1px rgba(0, 0, 0, 0.8)'
            },
        },
    },
    plugins: [],
}


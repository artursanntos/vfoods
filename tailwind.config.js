/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter'],
            },
            fontSize: {
                '32': '2rem',
            },
            colors: {
                'azul': {
                    300: '#26F2F1',
                    400: '#5EE0F1',
                    DEFAULT: '#5EE0F1',
                    800: '#1C274C',
                },
                'roxo': {
                    400: '#9978F7',
                    DEFAULT: '#D05BFA',
                },
                'vermelho':{
                    400: '#EC5366',
                    500: '#E51110',
                    DEFAULT: '#E51110',
                    700: '#B00F0F',
                },
                'preto': '#181818',
                'branco': '#FBFBFB',
                'cinza': {
                    100: '#ECECEC',
                    200: '#F6F6F6',
                    300: '#D9D9D9',
                    400: '#9E9E9E',
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
            backgroundImage: {
                'loginBG': 'url(/src/assets/bg2.png)',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
}


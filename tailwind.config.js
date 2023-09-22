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
                'vermelho': '#E51110',
                'preto': '#181818',
                'branco': '#FBFBFB',
                'cinza': {
                    100: 'ECECEC',
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
            }
        },
    },
    plugins: [],
}


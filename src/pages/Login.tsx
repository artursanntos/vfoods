import { Link } from "react-router-dom"
import Button from "../componets/Atomos/Button"

export default function Login() {


    return (

        <>
            <div className='w-full h-screen'>
                <div className='w-screen px-20 py-7'>
                    <img src="/src\componets\SideBar\assets\logo.png" alt="Vfoods" />
                </div>
                <div className='h-[calc(100vh-5.2rem)] max-h-[calc(100vh-5.2rem)] bg-loginBG bg-cover bg-no-repeat bg-center bg-lightgray flex justify-center items-center gap-60'>
                    <div className="text-white flex flex-col gap-[1.76rem] max-w-[36rem]">
                        <h1 className="text-[3.785rem] [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] font-bold leading-tight">Mais de 30 milhões de parceiros cadastrados</h1>
                        <p className="text-[1.3rem] font-medium">Esse é o alcance das lojas parceiras do V-foods.<br/>Faça sua parte e alavanque vendas</p>
                    </div>

                    <div className="w-[34.5rem] h-[39.7rem] pl-10 py-16 rounded-3xl bg-white text-preto leading-tight">
                        <h1 className="font-bold text-4xl">Entrar como Gestor</h1>
                        <p className="font-extralight text-xl">Gerencie sua loja de forma fácil e rápida.</p>
                        <Link to="/">
                            <Button label="Avançar" color="vermelho"/>
                        </Link>
                    </div>
                </div>
            </div>
            
        </>


    )
}

import { Link, Navigate, useNavigate } from "react-router-dom"
import Button from "../componets/Atomos/Button"
import Api from "../Api";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log(email, password);
        try {

            const headers = {
                'Content-Type': 'application/json'
            }
            const url = 'gestor/login/'
            //console.log(url);
            
            await Api.post(url, { email: email, senha: password }, { headers }).then(res => {
                const aux = res.data;
                //console.log(aux);
                auth.login(aux.access_token);
            })            

            navigate('/');

        } catch (error) {
            console.log(error); 
        }
    }

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
                        <form action="" className="flex flex-col pr-[2.5rem] mt-16" onSubmit={handleLogin}>
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input type="email" name="email" id="email" className="w-full h-16 rounded-lg border border-cinza-400 text-xl mb-16 p-4" onChange={e => setEmail(e.target.value)}/>
                            <label htmlFor="password" className="mb-2">Senha</label>
                            <input type="password" name="password" id="password" className="w-full h-16 rounded-lg border border-cinza-400 text-xl mb-16 p-4" onChange={e => setPassword(e.target.value)}/>

                            <button className="w-[12rem] h-[4.2rem] `px-12 py-3 rounded-17 text-white bg-vermelho hover:bg-vermelho-700 self-center" type="submit">
                                Avançar
                            </button>
                        </form>
                            
                    </div> 
                </div>
            </div>
        </>


    )
}
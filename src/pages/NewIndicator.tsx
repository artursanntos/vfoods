import { Header } from "../componets/Header/Header"
import { SideBar } from "../componets/SideBar/SideBar"
import Button from "../componets/Atomos/Button"
import { Link } from "react-router-dom"

export default function NewIndicator() {
    return (
        <>
            <div className='flex'>
                    
                <SideBar/>
                
                <div className='flex flex-col items-center pt-12 ml-[15rem] w-full'>
                    
                    <div className='flex flex-col items-center pb-16'>

                        <Header/>

                    </div>

                    <div className="flex justify-center items-center bg-white rounded-17">
                        
                        <div className="flex flex-col justify-center items-center border rounded-17 border-cinza-300 gap-4 w-[34rem] h-[26.5rem]">
                            <img className="ml-4" src="https://cdn.discordapp.com/attachments/1130244004710195333/1157410547474632744/indicadornovo.png?ex=65188212&is=65173092&hm=0bf52d75be02f5fb12ae781ebee69b357443876afa795638742ff3d334653699&" alt="concluido" />
                            <h1 className="font-bold text-2xl"> Seu indicador foi criado com sucesso! </h1>
                            <Link to="/indicators">
                                <Button label='Ver indicadores' color='vermelho'/>
                            </Link>

                        </div>
                        
                    </div>

                </div>
            </div>
        </>
    )
}
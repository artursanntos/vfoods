import { Header } from "../componets/Header/Header"
import { SideBar } from "../componets/SideBar/SideBar"

export default function NewCollaborator() {

    
    return (

        <>
            <div className='flex'>
                
                <SideBar/>
                
                <div className='flex flex-col items-center pt-12 ml-[15rem] w-full'>
                    
                    <div className='flex flex-col items-center pb-16'>

                        <Header pathUserImg={'src/componets/Header/assets/userImg.png'} userName={'Carlos Eduardo L.'} />

                    </div>

                    <div className='flex flex-col gap-9 border rounded-[5.5rem] border-cinza-300 bg-cinza-200 h-[47rem] w-[43.25rem] ml-24 mb-8'>

                        <div className="flex ml-[4rem] pt-[5.75rem] gap-12">

                            <button className="flex flex-col items-center h-[7rem] hover:scale-105 duration-300 ease-in-out">

                                <img className="h-[6rem] mb-3" src="src/assets/person.png" alt="person_icon" />
                                <h1 className="text-sm text-gray-400"> Editar foto </h1>

                            </button>
                            
                            <div className="flex flex-col">                                
                                <h1 className="text-32 font-bold"> Adicionar um novo perfil </h1>
                                <div className="text-xl w-[19.5rem]"> Faça o cadastro de um novo colaborador </div>
                            </div>

                        </div>

                        <div className="border ml-[4rem] border-vermelho rounded-19 h-[3.5rem] w-[34rem]">
                            <input type="text" className="float-left bg-transparent pl-[2.25rem] pt-4 mr-[3rem] italic text-lg border-none w-[30rem] placeholder:text-cinza-400 focus:shadow-none outline-none" placeholder="Nome Completo"/>
                        </div>

                        <div className="flex ml-[4rem] gap-[4.5rem]">

                            <div className="border border-vermelho rounded-19 h-[3.5rem] w-[16.5rem]">
                                <input type="text" className="float-left bg-transparent pl-[2.25rem] pt-4 mr-[3rem] italic text-lg border-none w-[14rem] placeholder:text-cinza-400 focus:shadow-none outline-none" placeholder="Endereço"/>
                            </div>

                            <div className="border border-vermelho rounded-19 h-[3.5rem] w-[13.5rem]">
                                <input type="text" className="float-left bg-transparent pl-[2.25rem] pt-4 mr-[3rem] italic text-lg border-none w-[11rem] placeholder:text-cinza-400 focus:shadow-none outline-none" placeholder="Cargo"/>
                            </div>

                        </div>

                        <div className="border ml-[4rem] border-vermelho rounded-19 h-[3.5rem] w-[24.5rem]">
                            <input type="text" className="float-left bg-transparent pl-[2.25rem] pt-4 mr-[3rem] italic text-lg border-none w-[21rem] placeholder:text-cinza-400 focus:shadow-none outline-none" placeholder="Email"/>
                        </div>

                        <div className="border ml-[4rem] border-vermelho rounded-19 h-[3.5rem] w-[24.5rem]">
                            <input type="text" className="float-left bg-transparent pl-[2.25rem] pt-4 mr-[3rem] italic text-lg border-none w-[21rem] placeholder:text-cinza-400 focus:shadow-none outline-none" placeholder="Senha"/>
                        </div>

                        <div className="border ml-[4rem] border-vermelho rounded-19 h-[3.5rem] w-[14rem]">
                            <input type="text" className="float-left bg-transparent pl-[2.25rem] pt-4 mr-[3rem] italic text-lg border-none w-[11.5rem] placeholder:text-cinza-400 focus:shadow-none outline-none" placeholder="Telefone"/>
                        </div>



                    </div>

                </div>
            </div>
        </>
    )

}
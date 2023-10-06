import { useContext } from "react"
import ButtonAddColab from "../componets/Atomos/ButtonAddColab"
import ButtonAddInd from "../componets/Atomos/ButtonAddInd"
import GestorCard from "../componets/Gestor/GestorCard"
import { Header } from "../componets/Header/Header"
import { SideBar } from "../componets/SideBar/SideBar"
import { VfoodsContext } from "../contexts/VfoodsContext"
import CardPizza from "../componets/Gestor/CardPizza"
import InfoCard from "../componets/Gestor/InfoCard"


export default function Profile() {

    const { manager } = useContext(VfoodsContext);

    return (
        <>
            <div className='flex'>

                <SideBar />

                <div className='flex flex-col pt-12 ml-[15rem] w-full'>

                    <div className='flex flex-col items-center pb-16'>

                        <Header />

                    </div>

                    <div className='flex flex-col justify-center'>
                        <div className='flex flex-row justify-center space-x-14'>
                            <div>
                                <GestorCard nome={manager.nome} area={manager.area} imagem={manager.imagem} email={manager.email} />
                            </div>

                            <div className='flex space-x-5'>
                                <ButtonAddInd label1={'Criar Indicador'} label2={'Crie um novo indicador para seus colaboradores!'} pagina={'perfilGestor'} />

                                <ButtonAddColab label1={'Adicionar Colaborador'} label2={'Adicione um novo colaborador a sua equipe!'} />
                            </div>
                        </div>

                        <div className='flex flex-row justify-center mt-4 space-x-14'>
                            <InfoCard />
                            <CardPizza />
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
//import Button from '../componets/Atomos/Button'
import ButtonAddColab from '../componets/Atomos/ButtonAddColab'
import ButtonAddInd from '../componets/Atomos/ButtonAddInd'
import { Header } from '../componets/Header/Header'
import { SideBar } from '../componets/SideBar/SideBar'
import { VfoodsContext } from '../contexts/VfoodsContext'
import { useContext, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {

    const {addModal, setAddModal} = useContext(VfoodsContext)

    const newCollabAdd = () => {
        toast.success('Colaborador adicionado com sucesso!', {
            position: "top-right",
            theme: "light",
        });
        setAddModal(false)
        
    }

    useEffect (() => {
        if (addModal) {
            newCollabAdd()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addModal])

    return (

        <>

            <ToastContainer
            position="top-right"
            autoClose={1000}
            closeOnClick
            theme="light"
            />

            <div className='flex w-full'>
                
                <SideBar/>
                
                <div className='flex flex-col pt-12 ml-[15rem] w-full'>
                    
                    <div className='flex flex-col items-center pb-16'>

                        <Header/>
                        
                    </div>

                    <div>
                        <ButtonAddInd label1={'Criar Indicador'} label2={'Crie um novo indicador para seus colaboradores!'} pagina={'perfilGestor'} />

                        <ButtonAddColab label1={'Adicionar Colaborador'} label2={'Adicione um novo colaborador a sua equipe!'} />
                        
                    </div>

                </div>
                
   
            </div>
        </>


    )
}

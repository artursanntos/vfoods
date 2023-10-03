import Button from '../componets/Atomos/Button'
import ButtonAddColab from '../componets/Atomos/ButtonAddColab'
import ButtonAddInd from '../componets/Atomos/ButtonAddInd'
import { Header } from '../componets/Header/Header'
import { SideBar } from '../componets/SideBar/SideBar'

export default function Home() {
  

    return (

        <>
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

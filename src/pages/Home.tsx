import { Link } from 'react-router-dom'
import Button from '../componets/Atomos/Button'
import { Header } from '../componets/Header/Header'
import { SideBar } from '../componets/SideBar/SideBar'


export default function Home() {

    return (

        <>
            <div className='flex'>
                
                <SideBar/>
                
                <div className='flex flex-col pt-12 ml-[15rem] w-full'>
                    
                    <div className='flex flex-col items-center pb-16'>

                        <Header/>

                    </div>

                    <Link to='/collaborators/12b7e207-3917-4f5a-95c9-c5f8318fe91a'>
                        <Button label='Página de um colaborador' color='vermelho'/>
                    </Link>

                </div>
                
   
            </div>
        </>


    )
}

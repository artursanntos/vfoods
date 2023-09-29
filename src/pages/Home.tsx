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

                </div>
                
   
            </div>
        </>


    )
}

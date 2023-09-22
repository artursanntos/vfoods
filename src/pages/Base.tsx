import { Header } from '../componets/Header/Header'
import { SideBar } from '../componets/SideBar/SideBar'

function Base() {
  

    return (

        <>
            <div className='flex'>
                
                <SideBar/>
                <div className='flex flex-col items-center pt-12 ml-[15rem] w-full'>

                    <Header pathUserImg={'src/componets/Header/assets/userImg.png'} userName={'Carlos Eduardo L.'} />

                </div>
   
            </div>
        </>


    )
}

export default Base

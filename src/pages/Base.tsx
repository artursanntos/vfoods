import { Header } from '../componets/Header/Header'
import { SideBar } from '../componets/SideBar/SideBar'

function Base() {
  

    return (

        <>
            <div className='flex'>
                
                <SideBar/>
                <div className='pt-12'>

                    <Header pathUserImg={'src/componets/Header/assets/userImg.png'} userName={'Carlos Eduardo L.'} />

                </div>
   
            </div>
        </>


    )
}

export default Base

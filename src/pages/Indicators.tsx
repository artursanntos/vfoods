import { Header } from '../componets/Header/Header'
import { SideBar } from '../componets/SideBar/SideBar'

function Indicators() {
  

    return (

        <>
            <div className='flex'>
                
                <SideBar/>
                
                <div className='flex flex-col pt-12 ml-[15rem] w-full'>
                    
                    <div className='flex flex-col items-center pb-16'>

                        <Header pathUserImg={'src/componets/Header/assets/userImg.png'} userName={'Carlos Eduardo L.'} />

                    </div>

                    <div className='flex flex-col items-center justify-center border rounded-10 border-cinza-100 gap-8 h-[23.125rem] w-[29.75rem] ml-24'>
                        
                        <img src="src\assets\add.png" alt="add_button" />

                        <h4 className=''> 
                            Criar um novo Indicador 
                        </h4>

                    </div>

                </div>
                
   
            </div>
        </>


    )
}

export default Indicators
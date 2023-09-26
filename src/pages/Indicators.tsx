import { useState } from 'react';
import { Header } from '../componets/Header/Header'
import { SideBar } from '../componets/SideBar/SideBar'
import Modal from 'react-modal';
import { EditIndicator } from '../componets/Indicator/EditIndicator';

const customStyles = {
    content: {
        width: "43.75rem",
        height: "61rem",
        top: "30.5rem",
        left: "74rem",
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
  };

export default function Indicators() {
  
    const [indicatorModalIsOpen, setIndicatorModalIsOpen] = useState(false);

    function openIndicatorModal() {
        setIndicatorModalIsOpen(true);
    }

    function closeModal() {
        setIndicatorModalIsOpen(false);
    }

    return (        
        <>
            <div className='flex'>
                
                <SideBar/>
                
                <div className='flex flex-col pt-12 ml-[15rem] w-full'>
                    
                    <div className='flex flex-col items-center pb-16'>

                        <Header pathUserImg={'src/componets/Header/assets/userImg.png'} userName={'Carlos Eduardo L.'} />

                    </div>

                    <button onClick={openIndicatorModal} className='flex flex-col items-center justify-center border rounded-10 border-cinza-100 gap-8 h-[23.125rem] w-[29.75rem] ml-24'>
                        
                        <img src="src\assets\add.png" alt="add_button" />

                        <h4 className=''> 
                            Criar um novo Indicador 
                        </h4>

                    </button>

                </div>
            </div>
            
            
            <Modal
            isOpen={indicatorModalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
                <div className='flex flex-col gap-12 pt-6 pl-6'>

                    <button onClick={closeModal}><img src="/src/assets/back-arrow.svg" alt="Voltar" /></button>
                    <div className='flex justify-around w-[35rem] text-3xl ml-8'>   
                        <p>Dados</p>
                        <p>Colaboradores</p>
                        <p>Meta</p>
                    </div>

                    <EditIndicator colaborador={{ nome: 'Ana Mendes Alves', email: 'Amale@gmail.com', foto: 'https://img.freepik.com/fotos-premium/imagem-de-closeup-de-coelho-fofo_691560-332.jpg' }} />
                    <EditIndicator colaborador={{ nome: 'Luis Otavio Freitas', email: 'lof@hotmail.com', foto: 'https://img.freepik.com/fotos-gratis/coelhinho-de-desenho-animado-gerado-por-ai_23-2150288874.jpg' }} />
                    <EditIndicator colaborador={{ nome: 'João Pedro Silva', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' }} />
                </div>
                
            </Modal>

            

        </>


    )
}
import { MouseEventHandler, useState } from 'react';
import { Header } from '../componets/Header/Header'
import { SideBar } from '../componets/SideBar/SideBar'
import Textbox from '../componets/Atomos/Textbox';
import Modal from 'react-modal';
import { EditIndicator } from '../componets/Indicator/EditIndicator';
import Button from '../componets/Atomos/Button';
import { Link, redirect } from 'react-router-dom';
import NewIndicator from './NewIndicator';


export default function Indicators() {
  
    const [indicatorModalIsOpen, setIndicatorModalIsOpen] = useState(false);
    const [modalPage, setModalPage] = useState(0); // 0 = Dados, 1 = Colaboradores, 2 = Meta

    function openIndicatorModal() {
        setIndicatorModalIsOpen(true);
    }

    function closeModal() {
        setIndicatorModalIsOpen(false);
    }

    // Função que muda a página do modal
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, page: number) => {
        event.preventDefault();

        setModalPage(page);
    }

    // Função que muda a página do modal para a próxima
    const handleNextPage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setModalPage(modalPage + 1);
    }

    // Função que muda a página do modal para a anterior
    const handlePreviousPage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setModalPage(modalPage - 1);
    }

    // Páginas do modal abaixo:

    function dadosPage() {
        return (
            <div className='flex flex-col mt-6 gap-7 w-full'>
                <Textbox label="Nome do indicador" type="text"/>
                <div className='grid grid-cols-7 gap-3'>
                    <div className="col-span-4">
                        <Textbox label="Data" type="date"/>
                    </div>
                    <div className="col-span-3">
                        <Textbox label="Unidade de medida" type="number"/>
                    </div>
                </div>
                <Textbox label='Descrição do indicador' type='descricao'/>
            </div>
        )
    }

    function colaboraPage() {
        return (
            <div className='flex mt-6 gap-2 w-full'>
                <Textbox label="Pesquisar" type="search"/>
            </div>
        )
    }

    function metasPage() {
        return (
            <div className='flex flex-col gap-3'>
                <EditIndicator colaborador={{ nome: 'Ana Mendes Alves', email: 'Amale@gmail.com', foto: 'https://img.freepik.com/fotos-premium/imagem-de-closeup-de-coelho-fofo_691560-332.jpg' }} />
                <EditIndicator colaborador={{ nome: 'Luis Otavio Freitas', email: 'lof@hotmail.com', foto: 'https://img.freepik.com/fotos-gratis/coelhinho-de-desenho-animado-gerado-por-ai_23-2150288874.jpg' }} />
                <EditIndicator colaborador={{ nome: 'João Pedro Silva', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' }} />
            </div>
        )
    }

    // Função que define qual o botão de ação do modal se é "Próxima" ou "Criar"
    function nextButton() {

        if (modalPage < 2) {
            return (
                <div className='fixed bottom-14 right-[5.5rem]'>
                    <button onClick={ handleNextPage }>
                        <Button label='Próxima' color='vermelho'/>
                    </button>
                    </div>
            )
        }

        return (
            <div className='fixed bottom-14 right-[5.5rem]'>
                        <Link to="/indicators/new_indicator">
                            <Button label='Criar' color='vermelho'/>
                        </Link>
                    </div>
        )
    }

    return (        
        <>
            <div className='flex w-screen'>
                
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
            className="fixed top-0 right-0 bottom-0 w-[43.75rem] bg-white p-8 rounded-[25px] drop-shadow-modal"
            contentLabel="Criar indicador"
            >
                <div className='flex flex-col gap-12'>

                    <button onClick={closeModal}><img src="/src/assets/back-arrow.svg" alt="Voltar" /></button>
                    <div className='flex justify-around text-3xl border-b-2 mt-8 w-full font-bold static'>   
                        
                        <button onClick={(event) => handleChangePage(event, 0)}>
                            <p className={modalPage == 0 ? 'border-b-2 border-vermelho pb-2 absolute top-[5.9rem] left-20' : 'text-cinza-300 pb-2 absolute top-[5.9rem] left-20'}>
                                Dados
                            </p>
                        </button>
                        
                        <button onClick={(event) => handleChangePage(event, 1)}>
                            <p className={modalPage == 1 ? 'border-b-2 border-vermelho pb-2 absolute top-[5.9rem] left-[15.62rem]' : 'text-cinza-300 pb-2 absolute top-[5.9rem] left-[15.62rem]'}>
                                Colaboradores
                            </p>
                        </button>
                        
                        <button onClick={(event) => handleChangePage(event, 2)}>
                            <p className={modalPage == 2 ? 'border-b-2 border-vermelho pb-2 absolute top-[5.9rem] right-20' : 'text-cinza-300 pb-2 absolute top-[5.9rem] right-20'}>
                                Meta
                            </p>
                        </button>
                        
                    </div>
                    
                    <div className='px-14'>
                        {modalPage == 0 && dadosPage()}
                        {modalPage == 1 && colaboraPage()}
                        {modalPage == 2 && metasPage()}
                    </div>                    
                </div>
                
                {nextButton()}
                
                {modalPage > 0 && 
                    <div className='fixed bottom-14 left-[5.5rem]'>
                        <button onClick={handlePreviousPage}>
                            <Button label='Voltar' color='vermelho'/>
                        </button>
                    </div>
                }
                
            </Modal>

            

        </>


    )
}
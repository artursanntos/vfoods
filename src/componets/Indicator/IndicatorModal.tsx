import Modal from 'react-modal';
import Button from '../Atomos/Button';
import DadosPage from '../Indicator/DadosPage';
import ColaboradoresPage from '../Indicator/ColaboradoresPage';
import MetasPage from '../Indicator/MetasPage';
import { VfoodsContext } from '../../contexts/VfoodsContext';
import { IndicatorContext } from '../../contexts/IndicatorContext';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { indicatorType } from '../../types';

export default function IndicatorModal() {

    const { openModal, setOpenModal } = useContext(IndicatorContext);
    const [indicatorModalIsOpen, setIndicatorModalIsOpen] = useState(false);
    const [modalPage, setModalPage] = useState(0); // 0 = Dados, 1 = Colaboradores, 2 = Meta
    const { createIndicator, updateIndicator, setAllColabInd, setCollab, createEdit, setCreateEdit, setIndicator } = useContext(IndicatorContext);
    const { allIndicators } = useContext(VfoodsContext);

    function openIndicatorModal() {
        setIndicatorModalIsOpen(true);
        console.log(allIndicators)
    }

    function closeModal() {
        setIndicatorModalIsOpen(false);
        setOpenModal(false);
        setIndicator({} as indicatorType)
        setCreateEdit('')
        setAllColabInd([])
        setCollab([])
        setModalPage(0)
    }

    function create() {  
        createIndicator();
        setCreateEdit('')
        setIndicatorModalIsOpen(false);
        setOpenModal(false);
        setModalPage(0);
    }

    function update() {
        updateIndicator(createEdit)
        setIndicatorModalIsOpen(false);
        setOpenModal(false);
        setCreateEdit('')
        setModalPage(0);
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

    // Função que define qual o botão de ação do modal se é "Próxima" ou "Criar"
    function nextButton() {

        if (modalPage < 2) {
            return (
                <div className='mr-3 w-full flex justify-end'>
                    <button onClick={handleNextPage}>
                        <Button label='Próxima' color='vermelho' />
                    </button>
                </div>
            )
        } else if (createEdit == 'Criar') {
            return (

                <div className='mr-3'>
                    <Link onClick={create} to="/new_indicator">
                        <Button label='Criar' color='vermelho' />
                    </Link>
                    
                </div>
            )
        } else {
            return (
                <div className='mr-3'>
                    <Link onClick={update} to="/new_indicator">
                        <Button label='Editar' color='vermelho' />
                    </Link>
                    
                </div>
            )
        }
        
        
    }

    useEffect ( () => {
        if (openModal){
            //console.log(openModal)
            openIndicatorModal()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openModal])

    return (
        <>
        
            <Modal
                isOpen={indicatorModalIsOpen}
                onRequestClose={closeModal}
                className="fixed top-0 right-0 bottom-0 w-[43.75rem] bg-white p-8 rounded-[25px] drop-shadow-modal overflow-auto"
                contentLabel="Criar indicador"
            >
                <div className='flex flex-col min-h-full'>
                    <div className='flex-grow'>
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
                                {modalPage == 0 && < DadosPage />}
                                {modalPage == 1 && < ColaboradoresPage />}
                                {modalPage == 2 && < MetasPage />}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row justify-between items-center my-10 min-w-full'>
                        {modalPage > 0 && (
                            <div className='ml-3'>
                                <button onClick={handlePreviousPage}>
                                    <Button label='Voltar' color='vermelho' />
                                </button>
                            </div>
                        )}

                        {nextButton()}
                    </div>
                </div>

            </Modal>

        </>
    );
}
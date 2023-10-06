import { useState, useContext } from 'react';
import { Header } from '../componets/Header/Header'
import { SideBar } from '../componets/SideBar/SideBar'
import { Link } from 'react-router-dom';
import { CollaboratorContext } from '../contexts/ColaboratorContext';
import { VfoodsContext } from '../contexts/VfoodsContext';
import Modal from 'react-modal';
import Textbox from "../componets/Atomos/Textbox"

export default function NewCollaborator() {

    const [indicatorModalIsOpen, setIndicatorModalIsOpen] = useState(false);
    const [imagemAdicionada, setimagemAdicionada] = useState(false);
    const {collaborator, setCollab} = useContext(CollaboratorContext)
    const {createCollab} = useContext(CollaboratorContext)
    const { setAddModal, setAllCollab, allCollaborators } = useContext(VfoodsContext)

    const handleNome = (childData: string) => {
        setCollab({...collaborator, nome: childData})
    }

    const handleImage = (childData: string) => {
        setCollab({...collaborator, imagem: childData})
    }

    const handleEmail = (childData: string) => {
        setCollab({...collaborator, email: childData})
    }

    const handleSenha = (childData: string) => {
        setCollab({...collaborator, senha: childData})
    }

    const handleCargo = (childData: string) => {
        setCollab({...collaborator, cargo: childData})
    }

    const handleTelefone = (childData: string) => {
        setCollab({...collaborator, telefone: childData})
    }

    function checadorImagem() {
        if (!imagemAdicionada) {
            return(<img className="h-[6rem] mb-3" src="src/assets/person.png" alt="person_icon" />)
        } else {
            return(<img className="h-[6rem] mb-3" src={collaborator.imagem} alt="person_icon" />)
        }
    }

    function create() {
        const admissionDate = new Date();
        setCollab({...collaborator, data_admissao: admissionDate})
        console.log('chegou no log')
        createCollab()
        setAllCollab([...allCollaborators, collaborator])
        setAddModal(true)
        setimagemAdicionada(false)
    }

    function openIndicatorModal() {
        setIndicatorModalIsOpen(true);
    }

    function closeModal() {
        setIndicatorModalIsOpen(false)
        setimagemAdicionada(true)
        checadorImagem()
    }

    return (
        <>

            <div className='flex'>
                
                <SideBar/>
                
                <div className='flex flex-col items-center pt-12 ml-[15rem] w-full'>
                    
                    <div className='flex flex-col items-center pb-16'>

                        <Header/>

                    </div>

                    <div className='flex flex-col gap-9 border rounded-[5.5rem] border-cinza-300 bg-cinza-200 h-[42rem] w-[43.25rem] ml-24 mb-8'>

                        <div className="flex ml-[4rem] pt-[5.75rem] gap-12">

                            <button onClick={openIndicatorModal} className="flex flex-col items-center h-[7rem] hover:scale-105 duration-300 ease-in-out">

                                {checadorImagem()}
                                <h1 className="text-sm text-gray-400"> Editar foto </h1>

                            </button>
                            
                            <div className="flex flex-col">                                
                                <h1 className="text-32 font-bold"> Adicionar um novo perfil </h1>
                                <div className="text-xl w-[19.5rem]"> Faça o cadastro de um novo colaborador </div>
                            </div>

                        </div>

                        <div className="ml-[4rem] h-[3.5rem] w-[34rem]">
                            <Textbox label="Nome Completo" type="nome" parentCallback={handleNome} />
                        </div>

                        <div className="flex ml-[4rem] gap-[4.5rem]">

                            <div className="h-[3.5rem] w-[16.5rem]">
                                <Textbox label="Telefone" type="cel" parentCallback={handleTelefone} />
                            </div>

                            <div className="h-[3.5rem] w-[13.5rem]">
                                <Textbox label="Cargo" type="cargo" parentCallback={handleCargo} />
                            </div>

                        </div>

                        <div className="ml-[4rem] h-[3.5rem] w-[24.5rem]">
                            <Textbox label="Email" type="email" parentCallback={handleEmail} />
                        </div>

                        <div className="ml-[4rem] h-[3.5rem] w-[24.5rem]">
                            <Textbox label="Senha" type="password" parentCallback={handleSenha} /> 
                        </div>

                        <div className='flex justify-end w-[38rem] pb-6'>

                            <Link onClick={create} to="/">
                                <button className="w-[8rem] h-[2.75rem] border rounded-17 text-white bg-black">
                                    Criar
                                </button>
                            </Link>
                            

                        </div>
                        
                    </div>
                </div>
            </div>

            <Modal
                isOpen={indicatorModalIsOpen}
                onRequestClose={closeModal}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[40rem] bg-white p-8 rounded-[25px] drop-shadow-modal overflow-auto"
                contentLabel="Imagem Colaborador"
            >
                <div className='flex flex-col min-h-full'>
                    <div className='flex-grow'>
                        <div className='flex flex-col gap-12'>
                            
                            <button onClick={closeModal}><img src="/src/assets/back-arrow.svg" alt="Voltar" /></button>
                            <div className='flex justify-around text-3xl border-b-2 mt-8 w-full font-bold static'></div>
                        </div>

                        <h4 className='text-xl font-bold pt-6 pb-6'> Insira o link para Adicionar uma Imagem ao colaborador:</h4>
                        <Textbox label="imagem" type="imagem" parentCallback={handleImage} />
                        <div className='flex justify-end pr-12 pt-6'>
                            <button onClick={closeModal} className="w-[8rem] h-[2.75rem] border rounded-17 text-white bg-black">
                                Adicionar
                            </button>

                        </div>
                    </div>
                </div>

            </Modal>
        </>
    )

}
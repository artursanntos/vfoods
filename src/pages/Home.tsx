import { Header } from '../componets/Header/Header'
import { SideBar } from '../componets/SideBar/SideBar'
import { VfoodsContext } from '../contexts/VfoodsContext'
import { useContext, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import HomePageCardGraph from '../componets/HomePageGraph'
import BlackButton from '../componets/Atomos/BlackButton'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom'
import { IndicatorContext } from '../contexts/IndicatorContext';
import IndicatorModal from '../componets/Indicator/IndicatorModal';
import CollabTable from '../componets/Homepage/CollabTable';


export default function Home() {

    const {addModal, setAddModal, manager } = useContext(VfoodsContext)
    const { setOpenModal } = useContext(IndicatorContext);
    // const redirectTo = useNavigate();

    const getFirstName = () => {
        if (manager && manager.nome) {
            const name:string = manager.nome;
            const firstName = name.split(' ')[0];
            return firstName;
        }
        return '';
    }

    const getProgressCircle = () => {
        return (
            <div className="w-[10rem]">
                <CircularProgressbar value={20}
                styles={buildStyles({
                    trailColor: 'transparent',
                    pathColor: '#5EE0F1',
                    textColor: '#FBFBFB',
                })}
                
                text="20%"
                strokeWidth={18}
                />
            </div>
        )
    }

    const getIconElement = () => {
        return (
            <img src="/src/assets/addRed.svg" alt="Adicionar" className="w-20 h-20" />
        )
    }

    const newCollabAdd = () => {
        toast.success('Colaborador adicionado com sucesso!', {
            position: "top-right",
            theme: "light",
        });
        setAddModal(false)
        
    }
    
    const openIndicatorCreation = () => {
        
        setOpenModal(true)
        //redirectTo('/indicators');
    }

    useEffect (() => {
        if (addModal) {
            newCollabAdd()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addModal])

    return (

        <>

            <ToastContainer
            position="top-right"
            autoClose={1000}
            closeOnClick
            theme="light"
            />

            <div className='flex w-full'>
                
                <SideBar/>
                
                <div className='flex flex-col pt-12 ml-[15rem] w-full'>
                    
                    <div className='flex justify-center pb-16'>
                        <div className='2xl:fixed 2xl:left-[19rem]'>
                            <p className='font-bold text-2xl'>Olá, {getFirstName()}!</p>
                            <p className='font-medium text-base text-cinza-400'>Seja bem vindo de volta!</p>
                        </div>
                        <Header/>
                        
                    </div>
                    <div className="w-full h-[calc(100vh-14.25rem)] max-h-[calc(100vh-14.25rem)]">
                        <div className='flex gap-32 justify-center mb-11'>
                            <HomePageCardGraph collab={manager}/>
                            <div className='flex flex-col items-center justify-center gap-20'>
                                <Link to="/collaborators">
                                    <BlackButton title='Atenção!' helpText='Sua equipe está abaixo da média este mês,clique aqui para saber mais' icon={getProgressCircle()}/>
                                </Link>
                                <BlackButton title='Criar um indicador a partir de um template' helpText='Agora ficou mais fácil criar o indicador! Clique aqui para saber mais' icon={getIconElement()} onClickFunc={() => openIndicatorCreation()}/>                        
                            </div>
                        </div>
                        <div className='flex flex-col gap-5 items-center'>
                            <p className='font-bold text-xl self-start ml-44'>Visto recentemente</p>
                            <CollabTable/>
                        </div>
                        
                    </div>
                    

                </div>
                
                <IndicatorModal/>
            </div>
        </>


    )
}

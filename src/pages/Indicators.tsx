import { useContext } from 'react';
import { Header } from '../componets/Header/Header'
import { SideBar } from '../componets/SideBar/SideBar'
import IndicatorModal from '../componets/Indicator/IndicatorModal';
import IndicadorCardGraph from '../componets/IndicadorCardGraph';
import { VfoodsContext } from '../contexts/VfoodsContext';
import { indicatorType } from '../types';
import { IndicatorContext } from '../contexts/IndicatorContext';


export default function Indicators() {

    const { setOpenModal, setCreateEdit, setIndicator } = useContext(IndicatorContext);
    const { allIndicators } = useContext(VfoodsContext);

    function open() {
        setCreateEdit('Criar')
        setIndicator({} as indicatorType)
        setOpenModal(true)
        console.log('chegou open')

    }

    return (
        <>
            
            <div className='flex w-full'>

                <SideBar />

                <div className='flex flex-col pt-12 ml-[15rem] w-full'>

                    <div className='flex flex-col items-center pb-16'>

                        <Header/>

                    </div>

                    <div className='grid grid-cols-2 gap-[3rem] ml-[10.25rem] items-center'>
                        <button onClick={open} className='border rounded-10 border-cinza-100 h-[23.125rem] w-[29.75rem] hover:border-[#7D55EF] hover:border-2'>
                            
                            <div className='flex flex-col items-center justify-center h-[23.125rem] gap-2'>
                                <img src="src\assets\add.png" alt="add_button" />
                                <h4 className=''>
                                    Criar um novo Indicador
                                </h4>
                            </div>

                        </button>

                        {allIndicators.map((indicator) => (
                            
                            <IndicadorCardGraph indicador={indicator}/>
                        ))}


                    </div>

                </div>
            </div>

            <IndicatorModal/>
            
        </>
    )
}
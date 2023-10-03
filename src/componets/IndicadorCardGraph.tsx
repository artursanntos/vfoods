import LineGraph from "./LineGraph";
import { IndicatorContext } from '../contexts/IndicatorContext';
import { useContext, useEffect } from 'react';
//import { indicatorType } from "../types";


type IndicadorCardGraphProps = {
    indicador: {
        id: string
        nome: string
        unidade_medida: string
        descricao: string
        data_deadline: Date
        idGestor: string
    }
}


export default function IndicadorCardGraph({ indicador }: IndicadorCardGraphProps) {
    
    
    const { updateIndicator, setAllowUpdate, setOpenModal, setCreateEdit, allowUpdate } = useContext(IndicatorContext);

    function open() {
        setCreateEdit(indicador.nome)
        setOpenModal(true)
        console.log('chegou open')

    }

    function update() {
        updateIndicator(indicador.nome)
        setAllowUpdate(false)
    }

    useEffect (() => {
        if (allowUpdate) {
            update()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[allowUpdate])

    return (
        <>
            <button
                onClick={() => { console.log('clicou') }}
                className='border rounded-10 bg-white border-cinza-100 h-[23.125rem] w-[29.75rem]  hover:border-[#7D55EF] hover:border-2'>

                <div className='flex flex-col'>
                    <div className="flex justify-between">
                        <h4 className='text-2xl font-bold mt-4 ml-[1.75rem]'>
                            {indicador.nome}
                        </h4>

                        <button onClick={open} className="border border-cinza-400 rounded-10 h-[1.5rem] w-[5.75rem] mt-4 mr-[1.75rem] hover:border-[#7D55EF] hover:border-2">
                            Editar
                        </button>

                    </div>
                    
                    <div className='mb-4'>
                        <LineGraph indicador={indicador} />
                    </div>
                </div>
            </button>

        </>
    );
}

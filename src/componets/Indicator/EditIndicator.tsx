import { colaboradorIndicadorType, collaboratorType } from '../../types';
import editIconB from './assets/edit-b.svg'
import editIconW from './assets/edit-w.svg'
import { useState, useEffect } from 'react';

type EditIndicatorProps = {
    colaborador: collaboratorType;
    colab_ind: colaboradorIndicadorType;
}

export function EditIndicator({ colaborador, colab_ind }: EditIndicatorProps) {
    const indicador = { meta: 0, supermeta: 0, desafio: 0, peso: 1 }
    const [valoresIndicador, setValoresIndicador] = useState(indicador);
    const [editIsOpen, setEditIsOpen] = useState(false);

    function handleMetaChanges(value: string) {
        const newValue = parseInt(value);
        setValoresIndicador({ ...valoresIndicador, meta: newValue });
        colab_ind.meta = newValue;
    }

    function handleSupermetaChanges(value: string) {
        const newValue = parseInt(value);
        setValoresIndicador({ ...valoresIndicador, supermeta: newValue });
        colab_ind.superMeta = newValue;
    }

    function handleDesafioChanges(value: string) {
        const newValue = parseInt(value);
        setValoresIndicador({ ...valoresIndicador, desafio: newValue });
        colab_ind.desafio = newValue;
    }

    function handlePesoChanges(value: string) {
        const newValue = parseInt(value);
        setValoresIndicador({ ...valoresIndicador, peso: newValue });
        colab_ind.peso = newValue;
    }

    function openCloseEdit() {
        setEditIsOpen(!editIsOpen);
    }

    useEffect(() => {
        //setando valores padrão, para caso o user não faça alterações não seja mandado -1 nas mestas
        colab_ind.meta= 0;
        colab_ind.superMeta= 0;
        colab_ind.desafio= 0;
        colab_ind.peso= 1;
        //Dados mockados:
        colab_ind.mes_ano = '2023-10-01T00:00:00.000Z'; 
        //é preciso colocar o mes e ano atual, neste formato
    }, [editIsOpen])

    return (
        <li className="py-3 sm:py-4">
            <div className='flex flex-col min-h-max'>
                <div className='flex flex-row justify-between items-center space-x-4'>
                    <div className="flex-shrink-0">
                        <img className="w-14 h-14 rounded-full" src={colaborador.imagem} alt="Foto do colaborador" />
                    </div>
                    <div className='flex-1 flex-col'>
                        <p className='font-bold'>
                            {colaborador.nome}
                        </p>
                        <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                            {colaborador.email}
                        </p>
                    </div>

                    <button onClick={openCloseEdit} className={`flex justify-center ${editIsOpen ? "bg-[#6DF7F6]" : "bg-[#232222]"} font-bold py-2 px-4 rounded items-center w-[3.4rem] h-[1.8rem]`}>
                        <img
                            width={24}
                            height={24}
                            src={editIsOpen ? editIconB : editIconW}
                            alt="Edit icon"
                        />
                    </button>
                </div>

                {editIsOpen ? (
                    <div className='flex flex-col justify-around shadow-md bg-[#DAF0F3] rounded-2xl gap-3 min-h-max w-full my-10 mx-25'>

                        <p className="text-xl font-bold mt-6 mx-8">
                            Vamos editar o indicador:
                        </p>

                        <p className="text-left text-sm font-thin my-0.5 mx-8">
                            Preencha os dados para criar uma nova atividade para {colaborador.nome.split(' ')[0]}!
                        </p>

                        <div className='flex flex-row justify-around'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>
                                    Meta
                                </label>
                                <input className='border rounded-md h-[1.5rem] w-[4rem] text-center' type='number' defaultValue={valoresIndicador.meta} onChange={(e) => handleMetaChanges(e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>
                                    Supermeta
                                </label>
                                <input className='border rounded-md h-[1.5rem] w-[4rem] text-center' type='number' defaultValue={valoresIndicador.supermeta} onChange={(e) => handleSupermetaChanges(e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>
                                    Desafio
                                </label>
                                <input className='border rounded-md h-[1.5rem] w-[4rem] text-center' type='number' defaultValue={valoresIndicador.desafio} onChange={(e) => handleDesafioChanges(e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>
                                    Peso
                                </label>
                                <input className='border rounded-md h-[1.5rem] w-[4rem] text-center' type='number' defaultValue={valoresIndicador.peso} onChange={(e) => handlePesoChanges(e.target.value)}  />
                            </div>
                        </div>

                        <div className='mx-8 my-4 bg-[#6DF7F6] rounded-lg w-[90%] h-[0.813rem]' />

                    </div>) : null}
            </div>
        </li>
    )
}
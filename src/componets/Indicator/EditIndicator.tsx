import { colaboratorIndicatorType, collaboratorType } from '../../types';
import editIconB from './assets/edit-b.svg'
import editIconW from './assets/edit-w.svg'
import { useState } from 'react';

type EditIndicatorProps = {
    colaborador: collaboratorType;
    colabInd: colaboratorIndicatorType;
}

export function EditIndicator({ colaborador, colabInd }: EditIndicatorProps) {
    const [editIsOpen, setEditIsOpen] = useState(false);

    function handleMetaChanges(value: string) {
        const newValue = parseInt(value);
        colabInd.meta = newValue;
    }

    function handleSupermetaChanges(value: string) {
        const newValue = parseInt(value);
        colabInd.superMeta = newValue;
    }

    function handleDesafioChanges(value: string) {
        const newValue = parseInt(value);
        colabInd.desafio = newValue;
    }

    function handlePesoChanges(value: string) {
        const newValue = parseInt(value);
        colabInd.peso = newValue;
    }

    function openCloseEdit() {
        setEditIsOpen(!editIsOpen);
    }

    return (
        <li className="py-3 sm:py-4">
            <div className='flex flex-col min-h-max'>
                <div className='flex flex-row justify-between items-center space-x-4'>
                    <div className="flex-shrink-0">
                        <img className="w-14 h-14 rounded-full object-cover" src={colaborador.imagem} alt="Foto do colaborador" />
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
                                <input className='border rounded-md h-[1.5rem] w-[4rem] text-center' type='number' defaultValue={colabInd.meta} onChange={(e) => handleMetaChanges(e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>
                                    Supermeta
                                </label>
                                <input className='border rounded-md h-[1.5rem] w-[4rem] text-center' type='number' defaultValue={colabInd.superMeta} onChange={(e) => handleSupermetaChanges(e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>
                                    Desafio
                                </label>
                                <input className='border rounded-md h-[1.5rem] w-[4rem] text-center' type='number' defaultValue={colabInd.desafio} onChange={(e) => handleDesafioChanges(e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>
                                    Peso
                                </label>
                                <input className='border rounded-md h-[1.5rem] w-[4rem] text-center' type='number' defaultValue={colabInd.peso} onChange={(e) => handlePesoChanges(e.target.value)}  />
                            </div>
                        </div>

                        <div className='mx-8 my-4 bg-[#6DF7F6] rounded-lg w-[90%] h-[0.813rem]' />

                    </div>) : null}
            </div>
        </li>
    )
}
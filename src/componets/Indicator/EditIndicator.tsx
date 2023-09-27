import editIconB from './assets/edit-b.svg'
import editIconW from './assets/edit-w.svg'
import { useState, useEffect } from 'react';

type EditIndicatorProps = {
    colaborador: { nome: string, email: string, foto: string };
}

export function EditIndicator({ colaborador }: EditIndicatorProps) {
    const indicador = { meta: 100, supermeta: 300, desafio: 400, peso: 0.6 }
    const [editIsOpen, setEditIsOpen] = useState(false);

    function openCloseEdit() {
        setEditIsOpen(!editIsOpen);
    }

    useEffect(() => {
        console.log(editIsOpen)
    }, [editIsOpen])

    return (
        <div className='flex flex-col min-h-max my-5'>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row'>
                    <img width={50} height={50} src={colaborador.foto} alt="Foto do colaborador" className='rounded-full mr-2' />

                    <div className='flex flex-col'>
                        <p className='font-bold'>
                            {colaborador.nome}
                        </p>
                        <p className='text-sm font-thin text-slate-700'>
                            {colaborador.email}
                        </p>
                    </div>
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
                            <input className='border rounded-md h-[1.5rem] w-[4rem] text-center' type='number' defaultValue={indicador.meta} onChange={(e) => console.log(e.target.value)} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-bold'>
                                Supermeta
                            </label>
                            <input className='border rounded-md h-[1.5rem] w-[4rem] text-center' type='number' defaultValue={indicador.supermeta} onChange={(e) => console.log(e.target.value)} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-bold'>
                                Desafio
                            </label>
                            <input className='border rounded-md h-[1.5rem] w-[4rem] text-center' type='number' defaultValue={indicador.desafio} onChange={(e) => console.log(e.target.value)} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-bold'>
                                Peso
                            </label>
                            <input className='border rounded-md h-[1.5rem] w-[4rem] text-center' type='number' defaultValue={indicador.peso} onChange={(e) => console.log(e.target.value)} />
                        </div>
                    </div>

                    <div className='mx-8 my-4 bg-[#6DF7F6] rounded-lg w-[90%] h-[0.813rem]' />

                </div>) : null}
        </div>
    )
}
type EditIndicatorProps = {
    colaborador: string;
}

export function EditIndicator({ colaborador }: EditIndicatorProps) {
    const indicador = { meta: 100, supermeta: 300, desafio: 400, peso: 0.6 }

    return (
        <div className='flex flex-col justify-around shadow-md bg-[#DAF0F3] rounded-2xl gap-3 min-h-max w-[90%] my-10 mx-25'>

            <p className="text-xl font-bold mt-6 mx-8">
                Vamos editar o indicador:
            </p>

            <p className="text-left text-sm font-thin my-0.5 mx-8">
                Preencha os dados para criar uma nova atividade para {colaborador}!
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

            <div className='mx-8 my-4 bg-[#6DF7F6] rounded-lg w-[90%] h-[0.813rem]' ></div>

        </div>
    )
}
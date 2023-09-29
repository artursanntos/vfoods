import LineGraph from "./LineGraph";

type IndicadorCardGraphProps = {
    indicador: {
        nome: string,
        meses: string[],
        meta: number[],
        supermeta: number[],
        desafio: number[]
    }
}

export default function IndicadorCardGraph({ indicador }: IndicadorCardGraphProps) {
    return (
        <button
            onClick={() => { console.log('clicou') }}
            className='border rounded-10 bg-white border-cinza-100 h-[23.125rem] w-[29.75rem] mb-10 hover:border-[#7D55EF] hover:border-2'>

            <div className='flex flex-col justify-center items-center'>
                <h4 className='text-2xl font-bold mt-4'>
                    {indicador.nome}
                </h4>
                <div className='mb-4'>
                    <LineGraph indicador={indicador} />
                </div>
            </div>
        </button>
    );
}

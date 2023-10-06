import Api from "../../Api";
import IndicadorPageLineGraph from "./IndicadorPageLineGraph";
import { useEffect, useState } from 'react';



type IndicadorPageGraphProps = {
    indicador: {
        id: string
        nome: string
        unidade_medida: string
        descricao: string
        data_deadline: Date
        idGestor: string
    }
}


export default function IndicadorPageGraph({ indicador }: IndicadorPageGraphProps) {
    
    const [cat, setCat] = useState<[][]>([]);

    
    useEffect(() => {
        
        try{
            Api.get('metas-mes-indicador/'+indicador.id).then(res =>{
                const aux = res.data;
                setCat(aux); 
                
            })
        } catch (error) {
            console.log(error)
        }
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <>
            <button
                onClick={() => { console.log('clicou') }}
                className='border rounded-10 bg-white border-cinza-100 h-[23.125rem] w-[29.75rem]'>

                <div className='flex flex-col'>
                    <div className="flex justify-between">
                        <h4 className='text-2xl font-bold mt-4 ml-[1.75rem]'>
                            Histórico
                        </h4>

                    </div>
                    
                    <div className='mb-4'>
                        <IndicadorPageLineGraph mmsdInd={cat} />
                    </div>

                </div>
            </button>

        </>
    );
}

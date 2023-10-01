import Api from "../Api";
import LineGraph from "./LineGraph";
import { useEffect, useState } from 'react';

type IndicadorCardGraphProps = {
    indicador: {
        id: string,
        nome: string,
        //eh recebido todas informacoes de indicador
        //mas so essas sao usada
    }
}

//o tipo recebido é esse:
/*
export interface indicatorType {
    id: string
    nome: string
    unidade_medida: string
    descricao: string
    data_deadline: Date
    idGestor: string
  }
*/

export default function IndicadorCardGraph({ indicador }: IndicadorCardGraphProps) {
    
    const [cat, setCat] = useState<[][]>([]);

    useEffect(() => {
        Api.get('metas-mes-indicador/'+indicador.id).then(res =>{
            const aux = res.data;
            setCat(aux); 
            
        })
      }, [])
    
   
        
    
    

    return (
        
        <button
            onClick={() => { console.log('clicou') }}
            className='border rounded-10 bg-white border-cinza-100 h-[23.125rem] w-[29.75rem]  hover:border-[#7D55EF] hover:border-2'>

            <div className='flex flex-col justify-center items-center'>
                <h4 className='text-2xl font-bold mt-4'>
                    {indicador.nome}
                </h4>
                <div className='mb-4'>
                    <LineGraph mmsdInd={cat} />
                </div>
            </div>
        </button>
    );
}

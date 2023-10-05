import Api from "../Api";
import LineGraph from "./LineGraph";
import { useEffect, useState } from 'react';

type CollabCardGraphProps = {
    collab: {
        id: string,
        nome: string,
        //eh recebido todas informacoes de collab
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

export default function CollabCardGraph({ collab }: CollabCardGraphProps) {
    
    const [cat, setCat] = useState<[][]>([]);

    /*useEffect(() => {
        
        try{
            Api.get('metas-mes-collab/'+collab.id).then(res =>{
                const aux = res.data;
                setCat(aux); 
                
            })
        } catch (error) {
            console.log(error)
        }
        
      }, [])*/
    
   
        
    
    

    return (
        
        <button
            onClick={() => { console.log('clicou') }}
            className='border rounded-10 bg-white border-cinza-300 h-[23.125rem] max-w-[33.875rem] w-[33.875rem] hover:border-[#7D55EF] hover:border-2'>

            <div className='flex flex-col justify-center items-center'>
                <h4 className='text-2xl font-bold mt-4'>
                    Indicadores
                </h4>
                <div className='mb-4'>
                    <LineGraph mmsdInd={cat} />
                </div>
            </div>
        </button>
    );
}

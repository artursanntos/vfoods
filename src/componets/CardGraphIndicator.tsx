import Api from "../Api";
import LineGraph from "./LineGraph";
import { useEffect, useState } from 'react';


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


export default function CardGraphIndicator({ indicador }: IndicadorCardGraphProps) {
    
    
    
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
                              
            <div className='border rounded-10 bg-white border-cinza-100 h-[23.125rem] w-[29.75rem]  hover:border-[#7D55EF] hover:border-2'>

                <div className='flex flex-col'>
                    <div className="flex justify-between">
                        <div className='text-2xl font-bold mt-4 ml-[1.75rem]'>
                            {indicador.nome}
                        </div>

                    </div>
                    
                    <div className='mb-4'>
                        <LineGraph mmsdInd={cat} />
                    </div>

                </div>
            </div>
            
        </>
    );
}

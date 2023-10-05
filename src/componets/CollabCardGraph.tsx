import Api from "../Api";
import CollabLineGraph from "./CollabLineGraph";
import { useEffect, useState, useContext } from 'react';
import { CollaboratorContext } from "../contexts/ColaboratorContext";

type CollabCardGraphProps = {
    id: string;
}

export default function CollabCardGraph({ id }: CollabCardGraphProps) {
    
    const [data, setData] = useState<[][]>([]);
    const { setLoadGraph } = useContext(CollaboratorContext);

    useEffect(() => {
        
        try{
            const year = new Date().getFullYear();
            const month = new Date().getMonth() + 1;

            const url = `colaborador-indicador/getPercentualDeMetasBatidasLastXMonths/` + id + `/` + year + '-' + month + `-01T00:00:00.000Z`
            Api.get(url).then(res =>{
                const aux = res.data;
                setData(aux); 
                setLoadGraph(true);
                //console.log(res.data);
                
                
            })
        } catch (error) {
            console.log(error)
        }
      }, [])
    
    
    return (
        
        <button
            onClick={() => { console.log('clicou') }}
            className='border rounded-10 bg-white border-cinza-300 h-[23.125rem] max-w-[33.875rem] w-[33.875rem] hover:border-[#7D55EF] hover:border-2'>

            <div className='flex flex-col justify-center items-center'>
                <h4 className='text-2xl font-bold mt-4'>
                    Indicadores
                </h4>
                <div className='mb-4'>
                    <CollabLineGraph msdamInd={data} />
                </div>
            </div>
        </button>
    );
}

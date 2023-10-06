import Api from "../Api";
import { CollaboratorContext } from "../contexts/ColaboratorContext";
import HomePageLineGraph from "./HomePageLineGraph";
import LineGraph from "./LineGraph";
import { useContext, useEffect, useState } from 'react';

type HomePageCardGraphProps = {
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

export default function HomePageCardGraph({ collab }: HomePageCardGraphProps) {
    
    const [data, setData] = useState<[][]>([]);
    const { loadGraph, setLoadGraph } = useContext(CollaboratorContext);

    const loadData = async () => {
        try{
            const year = new Date().getFullYear();
            const month = new Date().getMonth() + 1;
            const monthString = month < 10 ? `0${month}` : `${month}`;
            const fullDate = year + '-' + monthString + `-01T00:00:00.000Z`;
            console.log(fullDate);
            

            const url = `/metas-mes-indicador/auxGraph/byInterval/` + fullDate + `/` + 6
            await Api.get(url).then(res =>{
                const aux = res.data;
                setData(aux);
                console.log(res.data);
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const waitLoad = async () => {
            await loadData();
        }
        
        waitLoad();
        setLoadGraph(false);
        
      }, [])
      

    useEffect(() => {
    console.log(data);
    
    }, [loadGraph])
        
    
    

    return (
        
        <button
            //onClick={() => { console.log('clicou') }}
            className='border rounded-10 bg-white border-cinza-300 h-[25.125rem] max-w-[35.875rem] w-[35.875rem] hover:border-[#7D55EF] hover:border-2'>

            <div className='flex flex-col justify-center items-center'>
                <h4 className='text-2xl font-bold mt-4'>
                    Desempenho geral
                </h4>
                <div className='mb-4'>
                    {data.length > 0 ? <HomePageLineGraph msdamInd={data} /> : <h1>Carregando</h1>}
                </div>
            </div>
        </button>
    );
}

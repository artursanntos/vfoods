import { SideBar } from "../componets/SideBar/SideBar";
import { Header } from "../componets/Header/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { indicatorType } from "../types";
import Api from "../Api";
import IndicadorCardGraph from "../componets/Indicator/IndicadorCardGraph";
import IndicadorPageCardGraph from "../componets/Indicator/IndicadorPageCardGraph";
import IndicadorCardPizza from "../componets/Indicator/IndicadorCardPizza";


export default function IndicatorPage2() {

    const [Page, setPage] = useState(0)
    const { id } = useParams<{ id: string }>();
    const [indicator, setIndicator] = useState<indicatorType>({} as indicatorType);
    const [hasGraphData, setHasGraphData] = useState(false);

    const handleSwitchPage = (e: React.MouseEvent<HTMLButtonElement>, page: number) => {
        e.preventDefault();
        setPage(page)
    }

    const handleGetIndicator = async () => {
        const url = '/indicador/info/byId/' + id;
        const response = await Api.get(url);
        setIndicator(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        handleGetIndicator();
    }, [])

    useEffect(() => {
        if (indicator.id) {
            setHasGraphData(true);
        }
    }, [indicator])

    // aqui vai o grafico normal e o de pizza
    const mediaGeral = () => {
        return (
            <>
                {hasGraphData ? 
                <div className="flex flew-row gap-8">
                    <IndicadorCardPizza indicador={indicator}/>
                    <IndicadorPageCardGraph indicador={indicator}/>

                </div>
                
                
                : <div>Carregando...</div>}
            </>
            
        )
    }

    return (
        <>
            <div className='flex h-full'>
                
                <SideBar/>
                
                <div className='flex flex-col pt-12 ml-[15rem] gap-16 w-full h-full'>
                    
                    <div className='flex flex-col items-center pb-16'>

                        <Header/>

                    </div>

                    <div className="flex flex-col ml-[15rem] gap-8">

                        <div className=" font-semibold text-2xl">
                            {indicator.nome}
                            
                        </div>

                        <div className="flex flex-row gap-8 text-xl">

                            <button onClick={(event) => handleSwitchPage(event, 0)}>
                                <div className={Page == 0 ? 'border-b-2 border-vermelho pb-2' : 'text-cinza-300 pb-2'}>
                                    Média Geral
                                </div>
                            </button>

                            <button onClick={(event) => handleSwitchPage(event, 1)}>
                                <div className={Page == 1 ? 'border-b-2 border-vermelho pb-2' : 'text-cinza-300 pb-2'}>
                                    Colaboradores
                                </div>
                            </button>
                        </div>

                        <div className='px-8'>
                                {Page == 0 && mediaGeral()}
                                {Page == 1 /*&& colaboradores()*/}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}
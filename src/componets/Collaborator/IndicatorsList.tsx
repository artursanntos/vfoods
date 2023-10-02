import { useEffect, useState } from "react";
import Api from "../../Api"
import { colaboratorIndicatorType } from "../../types"
import IndicatorItem from "./IndicatorItem";

interface IndicatorListProps {
    id: string | undefined ;
}

export default function IndicatorsList({id}: IndicatorListProps)  {
    
    const [indicatorList, setIndicatorList] = useState<colaboratorIndicatorType[]>([] as colaboratorIndicatorType[]);

    const indicatorsThisMont = () => {
        const url = `/colaborador-indicador/findAllOfColaboratorByMonth/` + id + `/2023-09-01T00:00:00.000Z`
        //console.log(url);
        
        Api.get(url).then((response) => {
            console.log(response.data.colaboradorIndicadores)
            setIndicatorList(response.data.colaboradorIndicadores);
        })
    }

    useEffect(() => {
        indicatorsThisMont();
    },[]);

    return (
        <section className="min-h-max max-h-full min-w-[30.625rem] px-8 py-[2.125rem] bg-white border border-cinza-300 rounded-17">
            <p className="font-semibold text-xl">Resultados de Setembro</p>
            <p className="text-cinza text-base pb-4 border-b border-cinza-300">Selecione um para saber mais</p>
            <div className="container flex flex-col divide-y divide-cinza-300 border-b border-cinza-300">
                {indicatorList.map((item, index) => (
                    <IndicatorItem key={index} indicator={item} />
                ))}
            </div>
            
        </section>
    )
}
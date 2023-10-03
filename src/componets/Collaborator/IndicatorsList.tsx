import { useEffect, useState } from "react";
import Api from "../../Api"
import { colaboratorIndicatorType } from "../../types"
import IndicatorItem from "./IndicatorItem";
import IndicatorCardInfo from "./IndicatorCardInfo";

interface IndicatorListProps {
    id: string | undefined ;
}

export default function IndicatorsList({id}: IndicatorListProps)  {
    
    const [indicatorList, setIndicatorList] = useState<colaboratorIndicatorType[]>([] as colaboratorIndicatorType[]);
    const [styleIndex, setStyleIndex] = useState<number[]>([] as number[]);

    const handleToggleIndicator = (newIndex: number) => {
        if (styleIndex.includes(newIndex)) {
            setStyleIndex(styleIndex.filter((idx) => idx !== newIndex));
            return;
        }
        setStyleIndex([...styleIndex, newIndex]);
    }

    const indicatorsThisMont = () => {
        const month = new Date().getMonth() + 1;
        //console.log(month);
        const monthString = month < 10 ? `0${month}` : `${month}`;
        const url = `/colaborador-indicador/findAllOfColaboratorByMonth/` + id + `/2023-` + monthString + `-01T00:00:00.000Z`
        //console.log(url);
        
        Api.get(url).then((response) => {
            console.log(response.data.colaboradorIndicadores)
            setIndicatorList(response.data.colaboradorIndicadores);
        })
    }

    const getMonthName = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        return month.charAt(0).toUpperCase() + month.slice(1);
    }

    useEffect(() => {
        indicatorsThisMont();
    },[]);

    return (
        <section className="min-h-full max-h-full min-w-[30.625rem] px-8 py-[2.125rem] bg-white border border-cinza-300 rounded-17">
            <p className="font-semibold text-xl">Resultados de {getMonthName()}</p>
            <p className="text-cinza text-base pb-4 border-b border-cinza-300">Selecione um para saber mais</p>
            <div className="divide-y divide-cinza-300 border-b border-cinza-300 max-h-[38.28rem] overflow-y-auto">
                {indicatorList.map((item, index) => (
                    <div onClick={() => handleToggleIndicator(index)}>
                        <IndicatorItem key={index} indicator={item} />
                        <div className= {styleIndex.includes(index) ? "duration-300 ease-in-out z-0" : "hidden -top-8"}>
                            <IndicatorCardInfo indicatorInfo={item}/>
                        </div>
                    </div>
                ))}
            </div>
            
        </section>
    )
}
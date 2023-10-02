import { useState } from "react";
import { colaboratorIndicatorType } from "../../types";
import Api from "../../Api";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface IndicatorItemProps {
    indicator: colaboratorIndicatorType;
}

export default function IndicatorItem({indicator}: IndicatorItemProps) {

    const [indicatorName, setIndicatorName] = useState<string>('');

    const getIndicatorName = () => {
        const url = `/indicador/${indicator.idIndicador}`
        Api.get(url).then((response) => {
            console.log(response.data)
            setIndicatorName(response.data.nome);
        })
    }

    const getProgressValue = () => {
        const resultado = indicator.resultado;
        const total = indicator.desafio;
        const progresso = (resultado / total)*100;
        console.log(progresso);
        return progresso;
    }

    const getProgressColor = () => {
        const resultado = indicator.resultado;
        if (resultado < indicator.meta) {
            return '#26F2F1'
        } else if (resultado < indicator.superMeta) {
            return '#9978F7'
        } else {
            return '#EC5366'
        }
    }

    return (
        <div className="flex justify-between items-center px-2 py-1 cursor-pointer">
            <p className="font-semibold text-xl text-cinza">Indicador X</p>
            <div className="w-[2.625rem] h-[2.625rem]">
                <CircularProgressbar value={getProgressValue()}
                styles={buildStyles({
                    trailColor: '#D9D9D9',
                    pathColor: getProgressColor(),
                })}
                strokeWidth={17}
                />
            </div>
            
        </div>
    )
}
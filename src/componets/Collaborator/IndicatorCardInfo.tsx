import { useEffect, useState } from "react";
import { colaboratorIndicatorType } from "../../types";
import Api from "../../Api";

interface IndicatorCardInfoProps {
    indicatorInfo: colaboratorIndicatorType;
}

export default function IndicatorCardInfo({ indicatorInfo }: IndicatorCardInfoProps) {

    const [indicatorUnit, setIndicatorUnit] = useState<string>('');
    const [colaboratorName, setColaboratorName] = useState<string>('');

    const getIndicatorUnit = () => {
        const url = `/indicador/info/byId/${indicatorInfo.idIndicador}`
        Api.get(url).then((response) => {
            setIndicatorUnit(response.data.unidade_medida);
        })
    }


    const getColaboratorName = () => {
        const url = `/colaborador/${indicatorInfo.idColaborador}`
        Api.get(url).then((response) => {
            console.log(response.data)
            setColaboratorName(response.data.nome);
        })
    }

    const getProgressValue = () => {
        const resultado = indicatorInfo.resultado;
        const total = indicatorInfo.desafio;
        const progresso = (resultado / total) * 100;
        //console.log(progresso);
        return progresso;
    }

    useEffect(() => {
        getIndicatorUnit();
        getColaboratorName();
    }, [])

    return (
        <section className="max-w-fit min-w-[325px]
        bg-slate-50
         rounded-17 drop-shadow-md
         align-middle">
            <div className="px-7 py-5" >
                <p className="font-semibold text-xl text-cinza-400">Meta</p>
                <p className="text-cinza-400"> &gt;unidade de medida: {indicatorUnit} </p>
                <p className="text-cinza-700"> {colaboratorName} atingiu...</p>
                <div className="flex flex-row justify-evenly py-4 ">
                    <div className="flex flex-col flex-1 w-1/3 items-center">
                        <label className="font-semibold">
                            Resultado
                        </label>
                        <input className="w-9 bg-slate-300" type='text'></input>
                    </div>

                    <div className="flex-1 w-1/3 text-center">
                        <label className="font-semibold">
                            Peso
                        </label>
                        <p className="font-light">{indicatorInfo.peso}</p>
                    </div>

                    <div className="flex-1 w-1/3 text-center">
                        <label className="font-semibold">
                            Nota
                        </label>
                        <p>--</p>
                    </div>
                </div>
                <progress></progress>
            </div>
        </section>
    )
}
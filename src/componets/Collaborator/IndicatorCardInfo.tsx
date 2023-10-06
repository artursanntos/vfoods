import { useContext, useEffect, useState } from "react";
import { colaboratorIndicatorType } from "../../types";
import { CustomFlowbiteTheme, Flowbite, Progress } from 'flowbite-react';
import Api from "../../Api";
import { IndicatorContext } from "../../contexts/IndicatorContext";
import ButtonAttResult from "../Atomos/ButtonAttResult";

interface IndicatorCardInfoProps {
    indicatorInfo: colaboratorIndicatorType;
}

export default function IndicatorCardInfo({ indicatorInfo }: IndicatorCardInfoProps) {

    const [indicatorUnit, setIndicatorUnit] = useState<string>('');
    const [colaboratorName, setColaboratorName] = useState<string>('');
    const [progressState, setProgressState] = useState<string>('');
    const [progressText, setProgressText] = useState<string>('');

    const indicador = { meta: 0, supermeta: 0, desafio: 0, peso: 1 }
    const [valorResultado, setValorResultado] = useState(indicador);

    const { updateColaboratorIndicatorResult } = useContext(IndicatorContext);

    const getProgressColor = () => {
        const resultado = indicatorInfo.resultado;
        if (resultado < indicatorInfo.meta) {
            return 'ciano'
        } else if (resultado < indicatorInfo.superMeta) {
            return 'roxo'
        } else {
            return 'vermelho'
        }
    }

    const getProgressStyle = () => {
        const resultado = indicatorInfo.resultado;
        if (resultado < indicatorInfo.meta) {
            setProgressState('Meta')
            setProgressText(' está a caminho da meta!')
        } else if (resultado < indicatorInfo.superMeta) {
            setProgressState('Meta')
            setProgressText(' atingiu a meta e foi um sucesso!')
        } else if (resultado < indicatorInfo.desafio) {
            setProgressState('Supermeta')
            setProgressText(' atingiu a supermeta e foi um sucesso!')
        } else {
            setProgressState('Desafio')
            setProgressText(' atingiu o desafio e foi um sucesso!')
        }
    }

    const customTheme: CustomFlowbiteTheme = {
        progress: {
            color: {
                vermelho: 'bg-vermelho-400',
                ciano: 'bg-azul-300',
                roxo: 'bg-roxo-400'
            },
            bar: 'text-white text-sm flex items-center justify-center'
        },
    };

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
        const progressoFormatado = parseFloat(progresso.toFixed(2))
        if (progresso > 100) {
            return 100
        } else {
            return progressoFormatado;
        }
    }

    function handleResultChanges(value: string) {
        const newValue = parseInt(value);
        setValorResultado({ ...valorResultado, meta: newValue });
        indicatorInfo.resultado = newValue;
        updateResult()
    }

    function updateResult() {
        updateColaboratorIndicatorResult(indicatorInfo.id);
    }

    useEffect(() => {
        getIndicatorUnit();
        getColaboratorName();
        getProgressStyle();
    }, [])

    if (indicatorInfo.resultado == -1) {
        return (
            <div className="flex flex-col gap-5 align-middle">
                <section className="w-[325px]
            bg-slate-50
            rounded-17 drop-shadow-md
            align-middle">
                    <div className="px-7 py-5" >
                        <p className="font-semibold text-xl text-cinza-400">Meta</p>
                        <p className="text-cinza-400"> &gt;unidade de medida: {indicatorUnit} </p>
                        <p className="text-cinza-700"> {colaboratorName} atingiu...</p>
                        <div className="flex flex-row justify-evenly py-4">
                            <div className="flex flex-col flex-1 w-1/3 items-center">
                                <label className="font-semibold">
                                    Resultado
                                </label>
                                <input className="w-2/3 h-1/2 bg-slate-200" type='text' width={10} onChange={(e) => handleResultChanges(e.target.value)}></input>
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
                        <Flowbite theme={{ theme: customTheme }} >
                            <Progress labelProgress size="lg" progress={getProgressValue()} color={getProgressColor()} />
                        </Flowbite>
                    </div>
                </section>
                <button onClick={updateResult}>
                    <ButtonAttResult label="Atualizar resultado" />
                </button>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col gap-5 align-middle">
                <section className="w-[325px]
            bg-slate-50
            rounded-17 drop-shadow-md
            align-middle">
                    <div className="px-7 py-5" >
                        <p className="font-semibold text-xl">{progressState}</p>
                        <p className="text-cinza-400"> &gt;unidade de medida: {indicatorUnit} </p>
                        <p className="text-cinza-700"> {colaboratorName} {progressText}</p>
                        <div className="flex flex-row justify-evenly py-4">
                            <div className="flex flex-col flex-1 w-1/3 items-center">
                                <label className="font-semibold">
                                    Resultado
                                </label>
                                <input className="w-2/3 h-1/2 bg-slate-200" type='text' width={10} defaultValue={indicatorInfo.resultado} onChange={(e) => handleResultChanges(e.target.value)}></input>
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
                                <p>{indicatorInfo.notaIndicador}</p>
                            </div>
                        </div>
                        <Flowbite theme={{ theme: customTheme }} >
                            <Progress labelProgress size="lg" progress={getProgressValue()} color={getProgressColor()} />
                        </Flowbite>
                    </div>
                </section>
                <button onClick={updateResult}>
                    <ButtonAttResult label="Atualizar resultado" />
                </button>
            </div>
        )
    }
}
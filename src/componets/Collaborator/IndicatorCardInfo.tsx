import { useState } from "react";
import { colaboratorIndicatorType } from "../../types";

interface IndicatorCardInfoProps {
    indicatorInfo: colaboratorIndicatorType;
}

export default function IndicatorCardInfo({ indicatorInfo }: IndicatorCardInfoProps) {

    const [editIsOpen, setEditIsOpen] = useState(false);

    return (
        <section className="max-w-fit min-w-[300px]
        bg-slate-50
         rounded-17 drop-shadow-md
         align-middle">
            <div className="px-7 py-5" >
                <p className="font-semibold text-xl text-cinza-400">Meta</p>
                <p className="text-cinza-400"> &gt;unidade de medida: </p>
                <p className="text-cinza-700"> "Fulano" atingiu...</p>
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
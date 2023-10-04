import { useState } from "react";
import { colaboratorIndicatorType, indicatorType } from "../../types";

interface IndicatorCardInfoProps {
    indicatorInfo: colaboratorIndicatorType;
}

export default function IndicatorCardInfo({ indicatorInfo }: IndicatorCardInfoProps) {

    const [editIsOpen, setEditIsOpen] = useState(false);

    return (
        <section className="max-w-fit min-w-fit
        bg-slate-50
         rounded-17 drop-shadow-md
         align-middle">
            <div className="px-7 py-7" >
                <p className="font-semibold text-xl">Supermeta</p>
                <p className="text-cinza"> "Fulano" atingiu "a status" e foi um <br /> sucesso!</p>
                <div className="flex flex-row justify-evenly py-3 bg-yellow-200">
                    <div className="flex flex-col flex-1 w-1/3 bg-red-200 items-center">
                        <label className="font-semibold">
                            Resultado
                        </label>
                        <input className="w-9 bg-slate-300" type='text'></input>
                    </div>

                    <div className=" bg-green-200 flex-1 w-1/3 text-center">
                        <label className="font-semibold">
                            Peso
                        </label>
                        <p>{indicatorInfo.peso}</p>
                    </div>

                    <div className="bg-blue-100 flex-1 w-1/3 text-center">
                        <label className="font-semibold">
                            Nota
                        </label>
                        <p>--</p>
                    </div>
                </div>
            </div>

        </section>
    )
}
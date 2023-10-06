import { useEffect, useState, useContext } from "react"
import PizzaGraph from "../PizzaGraph"
import { VfoodsContext } from "../../contexts/VfoodsContext"
import Api from "../../Api"
import { indicatorType } from "../../types"

type PizzaGraphProps = {
    indicador: indicatorType;
}

export default function IndicadorCardPizza({ indicador }: PizzaGraphProps) {
    const [meta, setMeta] = useState(0)
    const [supermeta, setSupermeta] = useState(0)
    const [desafio, setDesafio] = useState(0)
    const [total, setTotal] = useState(0)

    const getMMI = (id: string, month: string, year: number) => {
        try {
            Api.get(`metas-mes-indicador/${id}/${month}/${year}`).then((response) => {
                const data = response.data
                setMeta(prev => prev + data.totalColabBateramMeta)
                setSupermeta(prev => prev + data.totalColabBateramSuperMeta)
                setDesafio(prev => prev + data.totalColabBateramDesafio)
                setTotal(prev => prev + data.totalColab)
            })
        }
        catch (error) {
            console.error(`Ocorreu um erro ao carregar o MMI para o indicador ${id}`);
        }
    }

    function calcData() {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const monthString = month < 10 ? `0${month}` : `${month}`;
        const year = currentDate.getFullYear();

        console.log(indicador.id, monthString, year)
        getMMI(indicador.id, monthString, year);
    }

    useEffect(() => {
        calcData();
    }, [])

    return (
        <div className='bg-white border rounded-10 border-cinza-100 h-min w-[42rem] p-2'>
            <div className='mt-8 mx-8'>
                <div className='flex flex-col'>
                    <p className="text-2xl font-bold">Status de metas desse mês</p>
                    <p className="mt-1 text-gray-500">Todos os colaboradores</p>
                </div>
                <div className='flex flex-row items-center justify-around'>
                    <PizzaGraph meta={meta - supermeta} supermeta={supermeta - desafio} desafio={desafio} naoAtingiu={(total - meta) > 0 ? (total - meta) : 0} />

                    <p className='text-gray-500 text-center'>
                        Aqui você pode acompanhar o desenvolvimento dos seus colaboradores, bem como o percentual atingido de desafio, supermeta e meta do indicador
                        "<span className='font-bold'>{indicador.nome}</span>"
                    </p>
                </div>
            </div>
        </div>
    )
}
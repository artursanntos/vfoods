import { useEffect, useState, useContext } from "react"
import PizzaGraph from "../PizzaGraph"
import { VfoodsContext } from "../../contexts/VfoodsContext"
import Api from "../../Api"

export default function CardPizza() {
    const [meta, setMeta] = useState(0)
    const [supermeta, setSupermeta] = useState(0)
    const [desafio, setDesafio] = useState(0)
    const [total, setTotal] = useState(0)
    const { allIndicators } = useContext(VfoodsContext)

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

        for (let i = 0; i < allIndicators.length; i++) {
            getMMI(allIndicators[i].id, monthString, year);
        }
    }

    useEffect(() => {
        calcData();
    }, [])

    return (
        <div className='bg-white border rounded-10 border-cinza-100 h-min w-[39rem] p-2'>
            <div className='mt-8 ml-8'>
                <div className='flex flex-col'>
                    <p className="text-2xl font-bold">Status de metas</p>
                    <p className="mt-1 text-gray-500">Status de diferentes indicadores e de todos os colaboradores</p>
                </div>
                <div className='flex justify-center items-center'>
                    <PizzaGraph meta={meta - supermeta} supermeta={supermeta - desafio} desafio={desafio} naoAtingiu={(total - meta) > 0 ? (total - meta) : 0} />
                </div>
            </div>
        </div>
    )
}
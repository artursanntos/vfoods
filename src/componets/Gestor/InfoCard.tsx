import { useContext, useEffect, useState } from 'react'
import { VfoodsContext } from '../../contexts/VfoodsContext'
import Api from '../../Api'

export default function InfoCard() {
    const [totalPercent, setTotalPercent] = useState(0)
    const [relativePercent, setRelativePercent] = useState(0)
    const { allIndicators } = useContext(VfoodsContext)
    let currMetaValue = 0;
    let currTotalValue = 0;
    let prevMetaValue = 0;
    let prevTotalValue = 0;

    async function getMMI(id: string, month: number, year: number) {
        const monthString = month < 10 ? `0${month}` : `${month}`;
        const prevMonth = month === 1 ? 12 : month - 1;
        const prevYear = month === 1 ? year - 1 : year;
        const prevMonthString = prevMonth < 10 ? `0${prevMonth}` : `${prevMonth}`;

        try {
            const prevResponse = await Api.get(`metas-mes-indicador/${id}/${prevMonthString}/${prevYear}`);
            const prevData = prevResponse.data;

            prevMetaValue += prevData.totalColabBateramMeta;
            prevTotalValue += prevData.totalColab;
        } catch (error) {
            console.error(`Ocorreu um erro ao carregar o MMI para o indicador ${id}`);
        }

        try {
            const currResponse = await Api.get(`metas-mes-indicador/${id}/${monthString}/${year}`);
            const currData = currResponse.data;

            currMetaValue += currData.totalColabBateramMeta;
            currTotalValue += currData.totalColab;
        } catch (error) {
            console.error(`Ocorreu um erro ao carregar o MMI para o indicador ${id}`);
        }
    }

    async function calcData() {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const promises = allIndicators.map((indicator) => {
            return getMMI(indicator.id, month, year);
        });

        await Promise.all(promises);

        setTotalPercent(((currMetaValue / currTotalValue) * 100));
        setRelativePercent(((currMetaValue / currTotalValue) - (prevMetaValue / prevTotalValue)) * 100);
    }

    useEffect(() => {
        calcData();
    }, [])

    return (
        <div className='bg-white border rounded-10 border-cinza-100 h-min w-[33.875rem] p-2'>
            <div className='m-8'>
                <div className='flex flex-col'>
                    <p className="text-2xl font-bold">Metas concluídas desse mês</p>
                    <div className='flex flex-row justify-center items-center'>
                        <div className='flex flex-col'>
                            <p className="text-4xl font-bold mt-4">{totalPercent.toFixed(1)}%</p>
                            <p className="text-lg mt-1 text-gray-500">concluídas</p>
                        </div>
                        <div className='ml-4 px-4 py-1 bg-azul rounded-md items-center'>
                            <p className="mt-1 text-gray-500">
                                <span className="font-bold">{relativePercent.toFixed(1)}%</span>{" "}
                                em relação ao mês anterior
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useContext, useEffect } from "react";
import Textbox from "../Atomos/Textbox";
import DropdownList from "../Atomos/DropdownList";
import { IndicatorContext } from "../../contexts/IndicatorContext";
import { VfoodsContext } from "../../contexts/VfoodsContext";
import Api from "../../Api";
import { indicatorType } from "../../types";

export default function DadosPage() {

    const measureOptions = ["Número", "Percentual", "Financeiro"];
    const { indicator, setIndicator, createEdit } = useContext(IndicatorContext);
    const {manager} = useContext(VfoodsContext)

    function dateToString() {
        
        const date = new Date(indicator.data_deadline);

        if (date === undefined) {
            return '';
        }
        const day = String(date.getDate() + 1).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const resultDate = `${year}-${month}-${day}`;
        //console.log(resultDate);
        return resultDate;
        
        
    }

    function clearIndicator() {
        setIndicator({} as indicatorType)
    }

    function getIndicator(){
        try {
            const url = 'indicador/' + manager.id + '/' + createEdit

            // console.log(manager.id);

            Api.get(url).then(response => {
                const indicador = response.data
                setIndicator({...indicator, nome: indicador.nome, data_deadline: indicador.data_deadline, unidade_medida: indicador.unidade_medida, descricao: indicador.descricao})
                //console.log(indicador)
              })

        } catch (error) {
            console.log(error)
        }
    }

    const handleDateCallback = (childData: string) => {
        const deadlineDate = new Date(childData);
        setIndicator({ ...indicator, data_deadline: deadlineDate })
    }

    const handleNameCallback = (childData: string) => {
        setIndicator({ ...indicator, nome: childData })
    }

    const handleMeasureCallback = (childData: string) => {
        setIndicator({ ...indicator, unidade_medida: childData })
    }

    const handleDescriptionCallback = (childData: string) => {
        setIndicator({ ...indicator, descricao: childData })
    }

    useEffect (() => {
        if (createEdit != 'Criar') {
            getIndicator()
        } else {
            clearIndicator()
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createEdit])


    return (
        <div className='flex flex-col mt-6 gap-7 w-full'>
            <Textbox label="Nome do indicador" type="text" parentCallback={handleNameCallback} currentValue={indicator.nome}/>
            <div className='grid grid-cols-2 gap-3'>
                <div className="col-span-1">
                    <Textbox label="Data" type="date" parentCallback={handleDateCallback} currentValue={dateToString()}/>
                </div>
                <div className="col-span-1 self-center">
                    <DropdownList label="Unidade de medida" options={measureOptions} parentCallback={handleMeasureCallback} defaultValue={indicator.unidade_medida}/>
                </div>
            </div>
            <Textbox label='Descrição do indicador' type='descricao' parentCallback={handleDescriptionCallback} currentValue={indicator.descricao}/>
        </div>
    )
}
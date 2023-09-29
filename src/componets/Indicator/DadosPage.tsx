import { useEffect, useState, useContext } from "react";
import Textbox from "../Atomos/Textbox";
import DropdownList from "../Atomos/DropdownList";
import { IndicatorContext } from "../../contexts/IndicatorContext";

export default function DadosPage() {

    const measureOptions = ["Número", "Percentual", "Financeiro"];
    const { indicator, setIndicator } = useContext(IndicatorContext);

    const handleNameCallback = (childData: string) => {
        setIndicator({ ...indicator, name: childData })
    }

    function dateToString() {
        const date = indicator.deadline;
        const day = String(date.getDate() + 1).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const resultDate = `${year}-${month}-${day}`;
        //console.log(resultDate);
        return resultDate;
        
    }

    const handleDateCallback = (childData: string) => {
        const deadlineDate = new Date(childData);
        setIndicator({ ...indicator, deadline: deadlineDate })
    }

    const handleMeasureCallback = (childData: string) => {
        setIndicator({ ...indicator, measure: childData })
    }

    const handleDescriptionCallback = (childData: string) => {
        setIndicator({ ...indicator, description: childData })
    }


    return (
        <div className='flex flex-col mt-6 gap-7 w-full'>
            <Textbox label="Nome do indicador" type="text" parentCallback={handleNameCallback} currentValue={indicator.name}/>
            <div className='grid grid-cols-2 gap-3'>
                <div className="col-span-1">
                    <Textbox label="Data" type="date" parentCallback={handleDateCallback} currentValue={dateToString()}/>
                </div>
                <div className="col-span-1 self-center">
                    <DropdownList label="Unidade de medida" options={measureOptions} parentCallback={handleMeasureCallback} defaultValue={indicator.measure}/>
                </div>
            </div>
            <Textbox label='Descrição do indicador' type='descricao' parentCallback={handleDescriptionCallback} currentValue={indicator.description}/>
        </div>
    )
}
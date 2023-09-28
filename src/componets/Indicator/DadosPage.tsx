import Textbox from "../Atomos/Textbox";

export default function DadosPage() {
    return (
        <div className='flex flex-col mt-6 gap-7 w-full'>
            <Textbox label="Nome do indicador" type="text" />
            <div className='grid grid-cols-7 gap-3'>
                <div className="col-span-4">
                    <Textbox label="Data" type="date" />
                </div>
                <div className="col-span-3">
                    <Textbox label="Unidade de medida" type="number" />
                </div>
            </div>
            <Textbox label='Descrição do indicador' type='descricao' />
        </div>
    )
}
import Textbox from "../Atomos/Textbox";

export default function DadosPage() {
    const handleCallback = (childData: string) => { }

    return (
        <div className='flex flex-col mt-6 gap-7 w-full'>
            <Textbox label="Nome do indicador" type="text" parentCallback={handleCallback} />
            <div className='grid grid-cols-7 gap-3'>
                <div className="col-span-4">
                    <Textbox label="Data" type="date" parentCallback={handleCallback} />
                </div>
                <div className="col-span-3">
                    <Textbox label="Unidade de medida" type="number" parentCallback={handleCallback} />
                </div>
            </div>
            <Textbox label='Descrição do indicador' type='descricao' parentCallback={handleCallback} />
        </div>
    )
}
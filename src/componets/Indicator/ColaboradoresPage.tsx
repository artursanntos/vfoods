import Textbox from "../Atomos/Textbox";
import { useContext, useEffect, useState } from "react";
import { IndicatorContext } from "../../contexts/IndicatorContext";
import { VfoodsContext } from "../../contexts/VfoodsContext";

export default function ColaboradoresPage() {
    //const { allCollaborators, setAllCollab } = useContext(VfoodsContext);
    const [allCollaborators, setAllCollab] = useState([
        { name: 'Ana Mendes Alves', email: 'Amale@gmail.com', foto: 'https://img.freepik.com/fotos-premium/imagem-de-closeup-de-coelho-fofo_691560-332.jpg' },
        { name: 'Luis Otavio Freitas', email: 'lof@hotmail.com', foto: 'https://img.freepik.com/fotos-gratis/coelhinho-de-desenho-animado-gerado-por-ai_23-2150288874.jpg' },
        { name: 'João Pedro Silva', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' },
        { name: 'Laura Pedro Silva', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' },
        { name: 'João JJJJJ Silva', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' },
        { name: 'Camila Pedro Silva', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' },
        { name: 'João Pedro Campelo', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' },
        { name: 'Ricardo Pedro AAAA', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' },
        { name: 'João BBB Silva', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' },
        { name: 'João Pedro Silva', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' },
        { name: 'Jorge Carlos Alves', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' },
        { name: 'Jorge Carlos Alves', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' },
        { name: 'Jorge Carlos Alves', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' },
        { name: 'Jorge Carlos Alves', email: 'joaojoao@yahoo.com.br', foto: 'https://i.pinimg.com/1200x/39/d6/14/39d614acff25d8b7fedbea20e37be942.jpg' },
    ]);

    const [filteredCollab, setFilteredCollab] = useState(allCollaborators);
    //const { collaborator, setCollab } = useContext(IndicatorContext);

    function handleAddCollab() {
        //setCollab([...collaborator, { name: 'teste' }])
    }

    const handleCallback = (childData: string) => {
        //filtro de pesquisa usando o childData e alterando a var colaboradores
        setFilteredCollab(allCollaborators.filter((collab) => {
            if (collab.name.toLowerCase().includes(childData.toLowerCase())) {
                return collab;
            }
        }))
    }

    useEffect(() => {
        console.log(filteredCollab)
    }, [filteredCollab])

    return (
        <div className='flex flex-col mt-6 gap-2 w-full'>
            <div className='min-w-full mb-4'>
                <Textbox label="Pesquisar" type="search" parentCallback={handleCallback} />
            </div>

            <ul className='flex flex-col gap-4 divide-y divide-gray-200 dark:divide-gray-700'>
                {filteredCollab.map((colaborador) => (
                    <li className="py-3 sm:py-4">
                        <div className="flex flex-row items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-14 h-14 rounded-full" src={colaborador.foto} alt="Foto do colaborador" />
                            </div>
                            <div className='flex-1 flex-col'>
                                <p className='font-bold'>
                                    {colaborador.name}
                                </p>
                                <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                                    {colaborador.email}
                                </p>
                            </div>

                            <button className='rounded-full p-2 hover:bg-vermelho hover:bg-opacity-10' onClick={handleAddCollab}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-vermelho" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}
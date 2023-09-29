import Textbox from "../Atomos/Textbox";
import { useContext, useEffect, useState } from "react";
import { IndicatorContext } from "../../contexts/IndicatorContext";
import { VfoodsContext } from "../../contexts/VfoodsContext";

export default function ColaboradoresPage() {
    const { allCollaborators, setAllCollab } = useContext(VfoodsContext);
    const { collaborator, setCollab } = useContext(IndicatorContext);
    const [filteredCollab, setFilteredCollab] = useState(allCollaborators);
    const iconStyles = ["h-6 w-6 text-vermelho", "h-6 w-6 text-vermelho rotate-[-45deg] ease-in-out duration-500"];


    const isCollabAdded = (email: string) => {
        // Verifica se o colaborador já foi adicionado no contexto do indicador
        if (collaborator.filter((collab) => collab.email === email).length === 0) {
            return false;
        }
        return true;
    }

    const handleAddCollab = (email: string) => {
        // Pega os dados do colaborador a ser adicionado no contexto geral
        const collabToBeAdded = allCollaborators.filter((collab) => {
            if (collab.email.toLowerCase().includes(email.toLowerCase())) {
                return collab;
            }
        })

        // Verifica se o colaborador já foi adicionado no contexto do indicador
        if (collaborator.filter((collab) => collab.email === collabToBeAdded[0].email).length === 0) {
            setCollab([...collaborator, collabToBeAdded[0]]);
            alert("Colaborador adicionado com sucesso!");
        }

        // Se já foi adicionado, remove do contexto do indicador
        else {
            setCollab(collaborator.filter((collab) => collab.email !== collabToBeAdded[0].email));
            alert("Colaborador removido com sucesso!");
        }
    }

    const handleCallback = (childData: string) => {
        // Filtro de pesquisa de colaboradores de acordo com o que foi digitado
        setFilteredCollab(allCollaborators.filter((collab) => {
            if (collab.nome.toLowerCase().includes(childData.toLowerCase()) ||
                (collab.email.toLowerCase().includes(childData.toLowerCase()))) {
                return collab;
            }
        }))
    }

    useEffect(() => {

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
                                <img className="w-14 h-14 rounded-full" src={colaborador.imagem} alt="Foto do colaborador" />
                            </div>
                            <div className='flex-1 flex-col'>
                                <p className='font-bold'>
                                    {colaborador.nome}
                                </p>
                                <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                                    {colaborador.email}
                                </p>
                            </div>

                            <button className='rounded-full p-2 hover:bg-vermelho hover:bg-opacity-10' onClick={() => handleAddCollab(colaborador.email)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={ isCollabAdded(colaborador.email) ? iconStyles[1] : iconStyles[0] } fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
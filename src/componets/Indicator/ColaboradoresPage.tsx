import Textbox from "../Atomos/Textbox";
import { useContext, useEffect, useState } from "react";
import { IndicatorContext } from "../../contexts/IndicatorContext";
import { VfoodsContext } from "../../contexts/VfoodsContext";
import { colaboratorIndicatorType } from "../../types";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function ColaboradoresPage() {
    
    const { allCollaborators } = useContext(VfoodsContext);
    const { collaborator, setCollab, allCollabInd, setAllColabInd } = useContext(IndicatorContext);
    const [filteredCollab, setFilteredCollab] = useState(allCollaborators);
    const iconStyles = ["h-6 w-6 text-vermelho", "h-6 w-6 text-vermelho rotate-[-45deg] ease-in-out duration-500"];

    const collabAdd = () => {
        toast.success('Colaborador adicionado com sucesso!', {
            position: "top-right",
            theme: "light",
        });
    }
  
    const collabRemove = () => {
        toast.success('Colaborador removido com sucesso!', {
            position: "top-right",
            theme: "light",
        });
    }

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

        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const monthString = month < 10 ? `0${month}` : `${month}`;

        //Cria um colab-indic padrão
        const colabInd: colaboratorIndicatorType = {
            mes_ano: year + '-' + monthString + '-01T00:00:00.000Z',
            meta: 0,
            superMeta: 0,
            desafio: 0,
            peso: 1,
            resultado: -1,
            notaIndicador: -1,
            idColaborador: collabToBeAdded[0].id,
            idIndicador: "default"
        }

        // Verifica se o colaborador já foi adicionado no contexto do indicador
        if (collaborator.filter((collab) => collab.email === collabToBeAdded[0].email).length === 0) {
            setCollab([...collaborator, collabToBeAdded[0]]);
            collabAdd()
            setAllColabInd([...allCollabInd, colabInd]);
          
        }

        // Se já foi adicionado, remove do contexto do indicador
        else {
            setCollab(collaborator.filter((collab) => collab.email !== collabToBeAdded[0].email));
            collabRemove()
            setAllColabInd(allCollabInd.filter((colInd) => colInd.idColaborador !== colabInd.idColaborador))
           
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

            <ToastContainer
            position="top-right"
            autoClose={1000}
            closeOnClick
            theme="light"
            />

            <div className='min-w-full mb-4'>
                <Textbox label="Pesquisar" type="search" parentCallback={handleCallback} />
            </div>

            <ul className='flex flex-col gap-4 divide-y divide-gray-200 dark:divide-gray-700'>
                {filteredCollab.map((colaborador) => (
                    <li className="py-3 sm:py-4">
                        <div className="flex flex-row items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-14 h-14 rounded-full object-cover" src={colaborador.imagem} alt="Foto do colaborador" />
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
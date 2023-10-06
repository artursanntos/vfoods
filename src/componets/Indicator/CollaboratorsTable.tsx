import { collaboratorType, indicatorType, colaboratorIndicatorType } from "../../types"
import { useContext, useEffect, useState } from "react";
import { VfoodsContext } from "../../contexts/VfoodsContext";
import { Link } from "react-router-dom";
import Api from "../../Api";

type CollaboratorsTableProps = {
    indicador: indicatorType;
}

export default function CollaboratorsTable({ indicador }: CollaboratorsTableProps) {
    const { allCollaborators } = useContext(VfoodsContext);
    let auxColab = [] as collaboratorType[];

    const [tableData, setTableData] = useState([] as { colaborador: collaboratorType, membro: string }[]);

    const loadTableData = () => {
        let newData = auxColab.map((collaborator) => {
            const year = new Date(collaborator.data_admissao).getFullYear();
            return {
                colaborador: collaborator,
                membro: `desde ${year}`,
            };
        });

        newData = newData.filter((value, index, self) => {
            return self.findIndex((v) => v.colaborador.id === value.colaborador.id) === index;
        });

        setTableData(newData);
    };


    useEffect(() => {
        const url = 'colaborador-indicador/findAllOfIndicator/' + indicador.id;

        const loadData = async () => {
            try {
                const response = await Api.get(url);
                const indCol = response.data.colaboradorIndicadores;

                console.log(indCol);
                console.log(allCollaborators);

                for (let x = 0; x < allCollaborators.length; x++) {
                    for (let i = 0; i < indCol.length; i++) {
                        if (allCollaborators[x].id === indCol[i].idColaborador) {
                            auxColab.push(allCollaborators[x]);
                            console.log('Cheguei aqui');
                        }
                    }
                }

                loadTableData();
            } catch (error) {
                console.error(error);
            }
        };

        loadData();
    }, []);


    return (
        <>
            <div className='flex flex-col pt-10 w-full h-full'>
                <div className='flex flex-col justify-center items-center w-[85%] h-full mx-10'>

                    <div className='bg-vermelho w-full h-[2.75rem] flex flex-row items-center justify-around rounded-xl'>
                        <p className='text-white font-bold w-[25%] text-center'>Colaborador</p>
                        <p className='text-white font-bold w-[25%] text-center'>Colocação</p>
                        <p className='text-white font-bold w-[25%] text-center'>Membro</p>
                        <div className='w-[25%] items-center' />
                    </div>

                    {tableData.length > 0 ? (
                        <ul className='w-full flex flex-col divide-y divide-gray-200 h-[90%] rounded-xl overflow-y-scroll'>
                            {tableData.map((colaborador, index) => (
                                <li key={index} className='flex flex-row items-center justify-around w-full h-min my-2'>
                                    <div className='flex flex-row items-center mt-2 ml-2 w-[25%]'>
                                        <img src={colaborador.colaborador.imagem} alt="Foto do colaborador" className='w-[2.5rem] h-[2.5rem] rounded-full mr-2 object-cover' />
                                        <div className='flex flex-col items-start justify-center'>
                                            <p className='font-bold'>{colaborador.colaborador.nome}</p>
                                            <p className='text-sm text-gray-500'>{colaborador.colaborador.email}</p>
                                        </div>
                                    </div>

                                    <p className='text-gray-500 w-[25%] text-center'>#{index + 1}</p>
                                    <p className='text-gray-500 w-[25%] text-center'>{colaborador.membro}</p>

                                    <Link to={`/collaborators/${colaborador.colaborador.id}`} className="flex justify-end pr-[5%] items-center w-[23%]">
                                        <button className='text-vermelho text-sm border-2 border-vermelho rounded-xl px-4 py-1 hover:bg-vermelho hover:text-white transition duration-300 ease-in-out'>
                                            Ver Perfil
                                        </button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='my-2 text-gray-500 text-2xl text-center'>Sem dados para exibir.</p>
                    )}
                </div>
            </div>
        </>
    )
}
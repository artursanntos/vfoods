import { Header } from "../componets/Header/Header"
import { SideBar } from "../componets/SideBar/SideBar"
import { VfoodsContext } from "../contexts/VfoodsContext"
import { collaboratorType } from "../types"
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../Api";


export default function Collaborators() {
    const { allCollaborators } = useContext(VfoodsContext);
    const [tableData, setTableData] = useState([] as { colaborador: collaboratorType, membro: string, status: number }[]);
    let arrayNotas = [] as { colaborador: collaboratorType, nota: number }[];

    const loadTableData = () => {
        let newData = allCollaborators.map((collaborator) => {
            const year = new Date(collaborator.data_admissao).getFullYear();
            console.log(collaborator)
            return {
                colaborador: collaborator,
                membro: `desde ${year}`,
                status: arrayNotas.find((nota) => nota.colaborador.id === collaborator.id)?.nota || 0,
            };
        });

        newData.sort((a, b) => b.status - a.status);

        setTableData(newData);
    };

    async function loadNota(colaboradores: collaboratorType[]): Promise<any> {
        for (let i = 0; i < colaboradores.length; i++) {
            const currMonth = new Date().getMonth() + 1;
            const currYear = new Date().getFullYear();
            const url = `nota-mensal/${colaboradores[i].id}/${currMonth}/${currYear}`;

            try {
                const response = await Api.get(url);
                const data = response.data;

                arrayNotas.push({ colaborador: colaboradores[i], nota: data.notaMensal });
            } catch (error) {
                console.error(`Ocorreu um erro ao carregar a nota para o colaborador ${colaboradores[i].id}`);
            }
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await loadNota(allCollaborators);
            loadTableData();
        }

        loadData();
    }, []);

    return (
        <>
            <div className='flex w-full h-full'>
                <SideBar />

                <div className='flex flex-col pt-12 ml-[15rem] w-full h-full'>
                    <div className='flex flex-col items-center pb-16'>
                        <Header />
                    </div>

                    <div className='flex flex-col items-center w-[85%] mx-10'>

                        <div className='bg-vermelho w-full h-[2.75rem] flex items-center justify-start rounded-xl'>
                            <div className='flex flex-row items-center justify-around w-[70%]'>
                                <p className='text-white font-bold'>Colaborador</p>
                                <p className='text-white font-bold'>Colocação</p>
                                <p className='text-white font-bold'>Membro</p>
                                <p className='text-white font-bold'>Status</p>
                            </div>
                        </div>

                        {tableData.length > 0 ? (
                            <ul className='bg-branco w-full flex flex-col divide-y divide-gray-200'>
                                {tableData.map((colaborador, index) => (
                                    <li key={index} className='flex flex-row items-center justify-start w-full h-min my-2'>
                                        <div className='w-[70%] flex justify-around items-center'>
                                            <div className='flex flex-row items-center mt-2 w-[30%]'>
                                                <img src={colaborador.colaborador.imagem} alt="Foto do colaborador" className='w-[2.5rem] h-[2.5rem] rounded-full mr-2' />
                                                <div className='flex flex-col items-start justify-center'>
                                                    <p className='font-bold'>{colaborador.colaborador.nome}</p>
                                                    <p className='text-sm text-gray-500'>{colaborador.colaborador.email}</p>
                                                </div>
                                            </div>

                                            <p className='text-gray-500 w-[10%] text-center'>{index + 1}</p>
                                            <p className='text-gray-500 w-[25%] text-center'>{colaborador.membro}</p>
                                            <p className='text-gray-500 w-[15%] text-center'>{colaborador.status}</p>
                                        </div>

                                        <Link to={`/collaborators/${colaborador.colaborador.id}`} className='ml-32'>
                                            <button className='text-vermelho text-sm border-2 border-vermelho rounded-xl px-4 py-1 hover:bg-vermelho hover:text-white transition duration-300 ease-in-out'>
                                                Ver Perfil
                                            </button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className='my-2 text-gray-500 text-2xl font-bold text-center'>Carregando...</p>
                        )}

                        <Link to='/new_collaborator' className="flex justify-end w-full mt-6 mr-4">
                            <button className='bg-vermelho text-white text-sm rounded-md px-6 py-2'>
                                Add Colaborador
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
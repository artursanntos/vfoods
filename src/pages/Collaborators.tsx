import { Header } from "../componets/Header/Header"
import { SideBar } from "../componets/SideBar/SideBar"
import { VfoodsContext } from "../contexts/VfoodsContext"
import { collaboratorType } from "../types"
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../Api";
import starSvg from '../assets/starGray.svg';


export default function Collaborators() {
    const { allCollaborators } = useContext(VfoodsContext);
    const [tableData, setTableData] = useState([] as { colaborador: collaboratorType, membro: string, status: number }[]);
    let arrayNotas = [] as { colaborador: collaboratorType, nota: number }[];

    const loadTableData = () => {
        let newData = allCollaborators.map((collaborator) => {
            const year = new Date(collaborator.data_admissao).getFullYear();
            const status = arrayNotas.find((nota) => nota.colaborador.id === collaborator.id)?.nota;
            if (status === undefined)
                return {
                    colaborador: collaborator,
                    membro: `desde ${year}`,
                    status: -1
                };
            else
                return {
                    colaborador: collaborator,
                    membro: `desde ${year}`,
                    status: status
                };
        });

        newData.sort((a, b) => b.status - a.status);

        setTableData(newData);
    };

    async function loadNotas(colaboradores: collaboratorType[]): Promise<any> {
        arrayNotas = [] as { colaborador: collaboratorType, nota: number }[];

        for (let i = 0; i < colaboradores.length; i++) {
            const currMonth = new Date().getMonth() + 1;
            const currYear = new Date().getFullYear();
            const currMonthString = currMonth < 10 ? `0${currMonth}` : `${currMonth}`;
            const url = `nota-mensal/${colaboradores[i].id}/${currMonthString}/${currYear}`;

            try {
                const response = await Api.get(url);
                const data = response.data;

                arrayNotas.push({ colaborador: colaboradores[i], nota: data.notaMensal });
            } catch (error) {
                console.error(`Ocorreu um erro ao carregar a nota para o colaborador ${colaboradores[i].id}`);
            }
        }
    };

    const notaEstrelas = (nota: number) => {
        let estrelas = [];

        // -1 = Sem nota
        if (nota === -1)
            estrelas.push(<p className='text-gray-500 text-sm'>Sem nota</p>);

        // 0 = Nota 0
        else if (nota === 0)
            estrelas.push(<img src={starSvg} alt="Estrela" className="w-4 h-4" />);

        // 1-5 = Nota 1-5
        else
            for (let i = 0; i < nota; i++)
                estrelas.push(<img src={starSvg} alt="Estrela" className="w-4 h-4" key={i} />);

        return estrelas;
    };

    useEffect(() => {
        const loadData = async () => {
            await loadNotas(allCollaborators);
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

                    <div className='flex flex-col justify-center items-center w-[85%] h-full mx-10'>

                        <div className='bg-vermelho w-full h-[2.75rem] flex flex-row items-center justify-around rounded-xl'>
                            <p className='text-white font-bold w-[20%] text-center'>Colaborador</p>
                            <p className='text-white font-bold w-[20%] text-center'>Colocação</p>
                            <p className='text-white font-bold w-[20%] text-center'>Membro</p>
                            <p className='text-white font-bold w-[20%] text-center'>Status</p>

                            <div className='w-[20%] items-center'>
                                <button className='bg-azul font-bold text-sm rounded-2xl px-6 py-2 items-center w-max hover:bg-azul-800 hover:text-white transition duration-300 ease-in-out'>
                                    <Link to='/new_collaborator'>Add Colaborador</Link>
                                </button>
                            </div>
                        </div>

                        {tableData.length > 0 ? (
                            <ul className='w-full flex flex-col divide-y divide-gray-200 h-[90%] rounded-xl overflow-y-scroll'>
                                {tableData.map((colaborador, index) => (
                                    <li key={index} className='flex flex-row items-center justify-around w-full h-min my-2'>
                                        <div className='flex flex-row items-center mt-2 ml-2 w-[20%]'>
                                            <img src={colaborador.colaborador.imagem} alt="Foto do colaborador" className='w-[2.5rem] h-[2.5rem] rounded-full mr-2 object-cover' />
                                            <div className='flex flex-col items-start justify-center'>
                                                <p className='font-bold'>{colaborador.colaborador.nome}</p>
                                                <p className='text-sm text-gray-500'>{colaborador.colaborador.email}</p>
                                            </div>
                                        </div>

                                        <p className='text-gray-500 w-[20%] text-center'>#{index + 1}</p>
                                        <p className='text-gray-500 w-[20%] text-center'>{colaborador.membro}</p>
                                        <div className='flex flex-row items-center justify-center w-[22%]'>
                                            {notaEstrelas(colaborador.status).map((estrela, index) => (
                                                <span key={index}>{estrela}</span>
                                            ))}
                                        </div>

                                        <Link to={`/collaborators/${colaborador.colaborador.id}`} className="flex justify-end pr-[5%] items-center w-[18%]">
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
                    </div>
                </div>
            </div>
        </>
    )
}
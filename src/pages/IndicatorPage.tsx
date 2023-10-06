import { useParams } from "react-router-dom";
import { Header } from "../componets/Header/Header";
import { SideBar } from "../componets/SideBar/SideBar";
import { useContext, useEffect, useState } from "react";
import Api from "../Api";
import { colaboratorIndicatorType, collaboratorType } from "../types";
import CardGraphIndicator from "../componets/CardGraphIndicator";
import { Link } from "react-router-dom";
import { IndicatorContext } from "../contexts/IndicatorContext";
import { VfoodsContext } from "../contexts/VfoodsContext";

export default function IndicatorPage() {

    const params = useParams();
    const [monthData, setMonthData] = useState<colaboratorIndicatorType[]>([]);
    const [tableData, setTableData] = useState([] as { colaborador: collaboratorType, membro: string, status: number }[]);
    const {allCollaborators} = useContext(VfoodsContext)
    const {indicator, allCollabInd, collaborator, setCollab, setAllColabInd} = useContext(IndicatorContext)
    const [Page, setPage] = useState(0)
    const [open, setOpen] = useState(0)
    const collabId = params.id
    let arrayNotas = [] as { colaborador: collaboratorType, nota: number }[];


    const loadTableData = () => {
        const newData = collaborator.map((collaborator) => {
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
    }

    useEffect(() => {
        const loadData = async () => {
            await loadNotas(collaborator);
            loadTableData();
        }

        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Page]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, page: number) => {
        event.preventDefault();

        setPage(page);
        setOpen(open+1)
    }

    const mediaGeral = () => {
        return(
            <CardGraphIndicator indicador={indicator}/>
        )

    }

    const colaboradores = () => {
        return(
            <div className='flex flex-col justify-center items-center w-[85%] h-full mx-10'>
                <div className='bg-vermelho w-full h-[2.75rem] flex flex-row items-center justify-around rounded-xl'>
                    <p className='text-white font-bold w-[20%] text-center'>Colaborador</p>
                    <p className='text-white font-bold w-[20%] text-center'>Colocação</p>
                    <p className='text-white font-bold w-[20%] text-center'>Membro</p>
                    <p className='text-white font-bold w-[20%] text-center'>Status</p>

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
        )
    }

    function addForEdit() {

        for (let x = 0; x < allCollaborators.length; x++) {
            for (let i = 0; i < allCollabInd.length; i++) {
                if (allCollaborators[x].id == allCollabInd[i].idColaborador) {
                    setCollab(prevState => [...prevState, allCollaborators[x]]);
                    console.log('Cheguei aqui') 
                }
            }
        }  
    }

    useEffect(() => {
        if (open == 1) {
            setCollab([])
            addForEdit()
            console.log('Cheguei useEffect')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    

    return (
        <>
            <div className='flex h-full'>
                
                <SideBar/>
                
                <div className='flex flex-col pt-12 ml-[15rem] gap-16 w-full h-full'>
                    
                    <div className='flex flex-col items-center pb-16'>

                        <Header/>

                    </div>

                    <div className="flex flex-col ml-[15rem] gap-8">

                        <div className=" font-semibold text-2xl">
                            {indicator.nome}
                            
                        </div>

                        <div className="flex flex-row gap-8 text-xl">

                            <button onClick={(event) => handleChangePage(event, 0)}>
                                <div className={Page == 0 ? 'border-b-2 border-vermelho pb-2' : 'text-cinza-300 pb-2'}>
                                    Média Geral
                                </div>
                            </button>

                            <button onClick={(event) => handleChangePage(event, 1)}>
                                <div className={Page == 1 ? 'border-b-2 border-vermelho pb-2' : 'text-cinza-300 pb-2'}>
                                    Colaboradores
                                </div>
                            </button>
                        </div>

                        <div className='px-14'>
                                {Page == 0 && mediaGeral()}
                                {Page == 1 && colaboradores()}
                        </div>

                    </div>

                    

                    

                </div>
                
   
            </div>
        </>
    )

}
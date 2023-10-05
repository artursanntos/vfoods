import { useContext, useEffect, useState } from "react";
import { collaboratorType } from "../../types";
import { CollaboratorContext } from "../../contexts/ColaboratorContext";
import Api from "../../Api";
import { Link } from "react-router-dom";

export default function CollabTable() {

    const { lastSeen, setLastSeen } = useContext(CollaboratorContext);
    const [ lastSeenCollab, setLastSeenCollab ] = useState<collaboratorType[]>([] as collaboratorType[]);
    let tempLastSeen = [] as collaboratorType[];
    const [ arrayNotas, setArrayNotas ] = useState<{ colaborador: collaboratorType, nota: number }[]>([] as { colaborador: collaboratorType, nota: number }[]);

    const getLastSeenInfo = async () => {
        console.log(lastSeen);
        for (let i = 0; i < lastSeen.length; i++) {
            console.log(i);
            
            await Api.get(`colaborador/${lastSeen[i]}`)
            .then((response) => {
                console.log(response.data);
                tempLastSeen.push(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        console.log(tempLastSeen);

        setLastSeenCollab(tempLastSeen);
    }

    useEffect(() => {
        getLastSeenInfo();
        //console.log(lastSeenCollab);
        loadNotas(lastSeenCollab)
        
    },[lastSeen])

    async function loadNotas(colaboradores: collaboratorType[]): Promise<any> {
        setArrayNotas([] as { colaborador: collaboratorType, nota: number }[]);
        for (let i = 0; i < colaboradores.length; i++) {
            const currMonth = new Date().getMonth() + 1;
            const currYear = new Date().getFullYear();
            const currMonthString = currMonth < 10 ? `0${currMonth}` : `${currMonth}`;
            const url = `nota-mensal/${colaboradores[i].id}/${currMonthString}/${currYear}`;
            console.log(url);

            try {
                const response = await Api.get(url);
                const data = response.data;

                //arrayNotas.push({ colaborador: colaboradores[i], nota: data.notaMensal });
                setArrayNotas([...arrayNotas, { colaborador: colaboradores[i], nota: data.notaMensal }])
                console.log({ colaborador: colaboradores[i], nota: data.notaMensal });
                
            } catch (error) {
                console.error(`Ocorreu um erro ao carregar a nota para o colaborador ${colaboradores[i].id}`);
            }
        }
    };

    const createEstrelas = (nota: number) => {
        let estrelas = [];

        // -1 = Sem nota
        if (nota === -1)
            estrelas.push(<p className='text-gray-500 text-sm'>Sem nota</p>);

        // 0 = Nota 0
        else if (nota === 0)
            estrelas.push(<img src="/src/assets/star.svg" alt="Estrela" className="w-4 h-4" />);

        // 1-5 = Nota 1-5
        else
            for (let i = 0; i < nota; i++)
                estrelas.push(<img src="/src/assets/star.svg" alt="Estrela" className="w-4 h-4" key={i} />);

        return estrelas;
    };

    const returnEstrelas = (id: string) => {
        // in the array arrayNotas, get the grade that corresponds to the id
        console.log(id);
        console.log(arrayNotas);
        const nota = arrayNotas.find((element) => element.colaborador.id === id)?.nota;
        console.log(nota);
        if (nota != undefined) {
            return createEstrelas(nota);
        }
        return 0;
    }

    const getDate = (date: Date) => {
        return new Date(date).toLocaleDateString('pt-BR');
    }

    const parseId = (id: string) => {
        return id.slice(0, 5);
    }

    return (
        <>
        {lastSeenCollab.length === 0 && 
            <p className="flex justify-center mt-12 text-base font-semibold text-cinza-500">Aqui aparecerão os últimos colaboradores vistos</p>}
        {lastSeenCollab.length > 0 &&
            <table className="w-[80%]">
                <thead className="border-b border-cinza-300">
                    <tr className="mb-3 text-sm text-cinza-500 px-4">
                        <th className="font-medium px-4 py-2 text-left">Colaborador</th>
                        <th className="font-medium px-4 py-2 text-left">Cod</th>
                        <th className="font-medium px-4 py-2 text-left">Cargo</th>
                        <th className="font-medium px-4 py-2 text-left">Data de Admissão</th>
                        <th className="font-medium px-4 py-2 text-left">Desempenho</th>
                        <th className="font-medium px-4 py-2 text-left"></th>
                    </tr>
                </thead>
                
                <tbody>
                {lastSeenCollab.map((collaborator, index) => {
                    return (
                        <tr key={index} className="mb-3 px-4 text-sm text-cinza-500">
                            <td className="px-4 py-2">
                                <div className="flex items-center">
                                    <img src={collaborator.imagem} alt="Foto" className='w-[2.5rem] min-w-[2.5rem] min-h-[1rem] h-[2.5rem] rounded-full mr-2 object-cover'/>
                                    <div className="flex flex-col">
                                        <p className="text-preto font-semibold">{collaborator.nome}</p>
                                        <p className="text-xs">{collaborator.email}</p>
                                    </div>
                                </div>
                                
                            </td>
                            <td className="px-4 py-2">{parseId(collaborator.id)}</td>
                            <td className="px-4 py-2">{collaborator.cargo}</td>
                            <td className="px-4 py-2">{getDate(collaborator.data_admissao)}</td>
                            <td className="px-4 py-2">{returnEstrelas(collaborator.id)}</td>
                            <td className="px-4 py-2">
                                <Link to={`/collaborators/${collaborator.id}`} className=''>
                                    <button className='text-branco text-sm border-2 border-preto bg-preto rounded-xl px-4 py-1 hover:bg-branco hover:text-preto transition duration-300 ease-in-out'>
                                        Ver Perfil
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    )
                })}
                
                </tbody>        
                
            </table>}

        </>
    )
    
}
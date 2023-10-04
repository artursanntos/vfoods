import { useContext, useEffect, useState } from "react";
import { VfoodsContext } from "../../contexts/VfoodsContext";
import { collaboratorType } from "../../types";
import { CollaboratorContext } from "../../contexts/ColaboratorContext";
import Api from "../../Api";

export default function CollabTable() {

    const { lastSeen } = useContext(CollaboratorContext);
    const [ lastSeenCollab, setLastSeenCollab ] = useState<collaboratorType[]>([] as collaboratorType[]);

    const getLastSeenInfo = async () => {
        let tempLastSeen = [] as collaboratorType[];
        for (let i = 0; i < lastSeen.length; i++) {
            await Api.get(`colaborador/${lastSeen[i]}`)
            .then((response) => {
                console.log(response.data);
                tempLastSeen.unshift(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        setLastSeenCollab(tempLastSeen);
    }

    const getDate = (date: Date) => {
        return new Date(date).toLocaleDateString('pt-BR');
    }

    const parseId = (id: string) => {
        return id.slice(0, 5);
    }

    useEffect(() => {
        getLastSeenInfo();
    },[lastSeen])

    return (
        <table>
            <thead className="border-b border-cinza-300">
                <tr className="flex gap-48 mb-3 text-sm text-cinza-500 px-4">
                    <th className="font-medium">Colaborador</th>
                    <th className="font-medium">Cod</th>
                    <th className="font-medium">Cargo</th>
                    <th className="font-medium">Data de Admissão</th>
                    <th className="font-medium">Desempenho</th>
                    <th className="font-medium"></th>
                </tr>
            </thead>
            <tbody>
                {lastSeenCollab.length === 0 && 
                <p className="flex justify-center mt-12 text-base font-semibold text-cinza-500">Aqui aparecerão os últimos colaboradores vistos</p>}
                {lastSeenCollab.map((collaborator) => {
            return (
                <tr className="flex gap-44 mb-3 text-sm text-cinza-500 px-4 mt-4">
                    <td className="flex max-w-[6rem]">
                        <img src={collaborator.imagem} alt="Foto" className='w-[2.5rem] h-[2.5rem] rounded-full mr-2 object-cover'/>
                        <div className="flex flex-col">
                            <p className="text-preto font-semibold">{collaborator.nome}</p>
                            <p className="text-xs">{collaborator.email}</p>
                        </div>
                        
                    </td>
                    <td className="flex max-w-[6rem]">{parseId(collaborator.id)}</td>
                    <td className="flex max-w-[4rem]">{collaborator.cargo}</td>
                    <td className="flex max-w-[6rem] ">{getDate(collaborator.data_admissao)}</td>
                    <td className="flex max-w-[6rem]">estrelas</td>
                    <td className="flex max-w-[6rem]">...</td>
                </tr>
            )
        })}
                
            </tbody>
        </table>
    )
    
}
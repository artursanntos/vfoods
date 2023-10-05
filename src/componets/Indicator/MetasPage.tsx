import { EditIndicator } from "./EditIndicator"
import { useContext } from "react";
import { IndicatorContext } from "../../contexts/IndicatorContext";

export default function MetasPage() {
    const { collaborator, allCollabInd } = useContext(IndicatorContext);

    
    
    //É mandado como propriedade o colaborador-indicador referente ao colaborador que também é mandado

    return (
        <ul className='flex flex-col gap-4 divide-y divide-gray-200 dark:divide-gray-700'>
            {collaborator.map((colaborador, index) => (
                <EditIndicator key={index} colaborador={colaborador} colabInd={allCollabInd[index]} />
            ))}
        </ul>
    )
}
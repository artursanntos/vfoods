import { EditIndicator } from "./EditIndicator"
import { useContext } from "react";
import { IndicatorContext } from "../../contexts/IndicatorContext";

export default function MetasPage() {
    const { collaborator } = useContext(IndicatorContext);

    return (
        <ul className='flex flex-col gap-4 divide-y divide-gray-200 dark:divide-gray-700'>
            {collaborator.map((colaborador, index) => (
                <EditIndicator key={index} colaborador={colaborador} />
            ))}
        </ul>
    )
}
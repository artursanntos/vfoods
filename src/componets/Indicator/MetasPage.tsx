import { EditIndicator } from "./EditIndicator"

type MetasPageProps = {
    colaboradores: { nome: string, email: string, foto: string }[];
}

export default function MetasPage({ colaboradores }: MetasPageProps) {

    

    return (
        <ul className='flex flex-col gap-4 divide-y divide-gray-200 dark:divide-gray-700'>
            {colaboradores.map((colaborador, index) => (
                <EditIndicator key={index} colaborador={colaborador} />
            ))}
        </ul>
    )
}
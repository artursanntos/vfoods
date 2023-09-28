import { EditIndicator } from "./EditIndicator"

type MetasPageProps = {
    colaboradores: { nome: string, email: string, foto: string }[];
}

export default function MetasPage({ colaboradores }: MetasPageProps) {
    return (
        <div className='flex flex-col gap-3'>
            {colaboradores.map((colaborador, index) => (
                <EditIndicator key={index} colaborador={colaborador} />
            ))}
        </div>

    )
}
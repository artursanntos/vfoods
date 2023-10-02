import Api from "../../Api";
import { collaboratorType } from "../../types";

interface CollaboratorCardProps {
    nome: collaboratorType["nome"];
    cargo: collaboratorType["cargo"];
    imagem: collaboratorType["imagem"];
    email: collaboratorType["email"];
    telefone: collaboratorType["telefone"];
}

export default function CollaboratorCard({ nome, cargo, imagem, email, telefone }: CollaboratorCardProps) {

    // TODO: forma de calcular a nota do colaborador
    const nota = 10;

    return (
        <>
            <div className="bg-white max-w-[33.875rem] w-[33.875rem] rounded-17 border border-cinza-300">
                <p>{nome}</p>
            </div>
        </>
    )

}
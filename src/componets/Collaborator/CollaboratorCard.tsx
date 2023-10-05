import { useEffect, useState } from "react";
import Api from "../../Api";
import { collaboratorType } from "../../types";

interface CollaboratorCardProps {
    id: collaboratorType["id"] | undefined;
    nome: collaboratorType["nome"];
    cargo: collaboratorType["cargo"];
    imagem: collaboratorType["imagem"];
    email: collaboratorType["email"];
    telefone: collaboratorType["telefone"];
}

export default function CollaboratorCard({ id, nome, cargo, imagem, email, telefone }: CollaboratorCardProps) {

    const [nota, setNota] = useState<number>(0);

    const getNota = async () => {
        const month = new Date().getMonth() + 1;
        const monthString = month < 10 ? `0${month}` : `${month}`;
        const year = new Date().getFullYear();
        const url = `/nota-mensal/` + id + `/` + monthString + `/` + year;
        //console.log(url);
        await Api.get(url).then((response) => {
            //console.log(response.data.notaMensal);
            setNota(response.data.notaMensal);
        })
        
    } 

    const notaEstrelas = (nota: number) => {
        let estrelas = [];
        for (let i = 0; i < nota; i++) {
            estrelas.push(<img src="/src/assets/star.svg" alt="Estrela" className="w-4 h-4" key={i} />);
        }
        return estrelas;

    }

    useEffect(() => {
        const loadData = async () => {
            await getNota();
        }

        loadData();
    }, [])

    return (
        <>
            <div className="flex bg-white max-w-[33.875rem] w-[33.875rem] pr-6 pl-6 py-9 gap-7 rounded-17 border border-cinza-300 overflow-x-hidden">
                <img src={imagem} alt="Foto de perfil" className="w-36 min-w-[9rem] h-36 min-h-[9rem] object-cover rounded-full"/>
                <div className="w-full">
                    <div className="mb-6">
                        <p className="font-bold text-32">{nome}</p>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-cinza">{cargo}</p>
                            <div className="flex gap-1">
                                {notaEstrelas(nota)}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-cinza-100"></div>
                    <div className="flex mt-6 gap-[3.8rem]">
                        <div className="flex flex-col gap-[0.625rem]">
                            <div className="flex gap-3">
                                <img src="/src/assets/phone.svg" alt="Telefone" />
                                <p className="font-medium text-base">Telefone</p>
                            </div>
                            <p className="font-medium text-cinza text-sm">{telefone}</p>
                        </div>
                        <div className="flex flex-col gap-[0.625rem] ml-6">
                            <div className="flex gap-3">
                                <img src="/src/assets/mail.svg" alt="E-mail" />
                                <p className="font-medium text-base">E-mail</p>
                            </div>
                            <p className="font-medium text-cinza text-sm">{email}</p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </>
    )

}
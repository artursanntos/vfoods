import { managerType } from "../../types";
interface GestorCardProps {
    nome: managerType["nome"];
    area: managerType["area"];
    imagem: managerType["imagem"];
    email: managerType["email"];
}

export default function GestorCard({ nome, area, imagem, email}: GestorCardProps) {


    return (
        <>
            <div className="h-[13rem] flex bg-white max-w-[33.875rem] w-[33.875rem] pr-6 pl-6 pt-[0.75rem] pb-[1.75rem] gap-7 rounded-17 border border-cinza-100 overflow-x-hidden">
                <img src={imagem} alt="Foto de perfil" className="w-36 h-36 object-cover rounded-full"/>
                <div className="w-full">
                    <div className="mb-6">
                        <p className="font-bold text-32">{nome}</p>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-cinza">{'Gestor '+area}</p>
                            
                        </div>
                    </div>
                    <div className="border-t border-cinza-100"></div>
                    <div className="flex mt-6 gap-[3.8rem]">
                        
                        <div className="flex flex-col gap-[0.625rem]">
                            <div className="flex gap-3">
                                <img src="/src/assets/mailGest.png" alt="E-mail" className="mt-[0.2rem] w-[1.3rem] h-[1.2rem]"/>
                                <p className="font-bold text-base">E-mail</p>
                            </div>
                            <p className="font-medium text-cinza text-sm">{email}</p>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )

}
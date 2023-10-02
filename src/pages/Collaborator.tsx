import { useParams } from "react-router-dom";
import { Header } from "../componets/Header/Header";
import { SideBar } from "../componets/SideBar/SideBar";
import { useEffect, useState } from "react";
import Api from "../Api";
import CollaboratorCard from "../componets/Collaborator/CollaboratorCard";
import { collaboratorType } from "../types";
import IndicatorsList from "../componets/Collaborator/IndicatorsList";

export default function Collaborator() {

    const params = useParams();
    const [colab, setColab] = useState<collaboratorType>({} as collaboratorType);

    const getCollaboratorData = () => {
        const collabId = params.id;
        Api.get(`/colaborador/${collabId}`).then((response) => {
            // console.log(response.data);
            setColab(response.data);
        })
    }

    useEffect(() => {
        getCollaboratorData();
    }, []);

    return (
        <>
            <div className='flex h-full'>
                
                <SideBar/>
                
                <div className='flex flex-col pt-12 ml-[15rem] w-full h-full'>
                    
                    <div className='flex flex-col items-center pb-16'>

                        <Header/>

                    </div>

                    <div className="pl-[8.25rem] pr-24 h-full">
                        <div className="flex gap-12 h-full">
                            <div>
                                <CollaboratorCard nome={colab.nome} cargo={colab.cargo} imagem={colab.imagem} email={colab.email} telefone={colab.telefone}/>
                            </div>
                            <IndicatorsList/>
                            
                        </div>
                    </div>

                    

                </div>
                
   
            </div>
        </>
    )

}
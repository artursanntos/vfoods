import { useParams } from "react-router-dom";
import { Header } from "../componets/Header/Header";
import { SideBar } from "../componets/SideBar/SideBar";
import { useEffect, useState } from "react";
import Api from "../Api";
import CollaboratorCard from "../componets/Collaborator/CollaboratorCard";
import { colaboratorIndicatorType, collaboratorType } from "../types";
import IndicatorsList from "../componets/Collaborator/IndicatorsList";
import CollabCardGraph from "../componets/CollabCardGraph";

export default function Collaborator() {

    const params = useParams();
    const [collab, setCollab] = useState<collaboratorType>({} as collaboratorType);
    const [monthData, setMonthData] = useState<colaboratorIndicatorType[]>([] as colaboratorIndicatorType[]); 
    const collabId = params.id as string;

    const getCollaboratorData = () => {
        Api.get(`/colaborador/${collabId}`).then((response) => {
            // console.log(response.data);
            setCollab(response.data);
        })
    }

    const getSemesterData = () => {
        setMonthData([] as colaboratorIndicatorType[]);
        const actualMonth = new Date().getMonth() + 1;
        const firstMonth = actualMonth - 5;
        const year = new Date().getFullYear();
        for (let i = firstMonth; i <= actualMonth; i++) {
            const monthString = i < 10 ? `0${i}` : `${i}`;
            const url = `/colaborador-indicador/findAllOfColaboratorByMonth/` + collabId + `/` + year + '-' + monthString + `-01T00:00:00.000Z`

            Api.get(url).then((response) => {
                //console.log(response.data.colaboradorIndicadores)
                setMonthData([...monthData, response.data.colaboradorIndicadores]);
            })
        }
    }

    useEffect(() => {
        getCollaboratorData();
        getSemesterData();
    }, []);

    return (
        <>
            <div className='flex h-full'>
                
                <SideBar/>
                
                <div className='flex flex-col pt-12 ml-[15rem] w-full h-full'>
                    
                    <div className='flex flex-col items-center pb-16'>

                        <Header/>

                    </div>

                    <div className="w-full h-[calc(100vh-14.25rem)] max-h-[calc(100vh-14.25rem)]">
                        <div className="flex gap-44 h-full w-full justify-center">
                            <div className="flex flex-col justify-between items-center">
                                <CollaboratorCard id={collabId} nome={collab.nome} cargo={collab.cargo} imagem={collab.imagem} email={collab.email} telefone={collab.telefone}/>
                                <div className="mt-8">
                                    <CollabCardGraph id={collabId}/>
                                </div>
                                
                            </div>
                            <div className="h-full min-h-full max-h-full">
                                <IndicatorsList id={collabId}/>
                            </div>
                            
                        </div>
                    </div>

                    

                </div>
                
   
            </div>
        </>
    )

}
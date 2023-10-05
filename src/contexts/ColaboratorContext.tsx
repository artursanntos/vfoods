import { createContext, SetStateAction, useState, Dispatch, ReactNode, useEffect } from 'react';
import { collaboratorType } from '../types';
import { useContext } from 'react';
import { VfoodsContext } from './VfoodsContext';	
import axios from 'axios';

interface CollaboratorContextType {
    collaborator: collaboratorType;
    setCollab: Dispatch<SetStateAction<collaboratorType>>
    createCollab: () => Promise<void>;
    lastSeen: string[];
    setLastSeen: Dispatch<SetStateAction<string[]>>
    loadGraph: boolean;
    setLoadGraph: Dispatch<SetStateAction<boolean>>;
}

interface CollaboratorProviderProps {
    children: ReactNode
}

export const CollaboratorContext = createContext({} as CollaboratorContextType);

export function CollaboratorProvider({ children }: CollaboratorProviderProps) {
    const [collaborator, setCollab] = useState<collaboratorType>({} as collaboratorType)
    const [lastSeen, setLastSeen] = useState<string[]>([] as string[])
    const [loadGraph, setLoadGraph] = useState<boolean>(false);
    const { manager } = useContext(VfoodsContext);

    const createCollab = async () => {
        console.log("Chegou aqui");
        
        try {
            const url = 'http://localhost:3000/colaborador'

            const headers = {
                'Content-Type': 'application/json'
            }

            console.log(manager.id);
            
            // setCollab({...collaborator, gestor: manager.id})

            const response = await axios.post(url, {...collaborator, idGestor: manager.id}, { headers })
            
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CollaboratorContext.Provider value={{ collaborator, setCollab,  createCollab, lastSeen, setLastSeen, loadGraph, setLoadGraph }}>

            {children}
        </CollaboratorContext.Provider>
    )

}
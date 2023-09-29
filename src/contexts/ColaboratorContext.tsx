import { createContext, SetStateAction, useState, Dispatch, ReactNode } from 'react';
import { collaboratorType } from '../types';
import { useContext } from 'react';
import { VfoodsContext } from './VfoodsContext';	
import axios from 'axios';

interface CollaboratorContextType {
    collaborator: collaboratorType;
    setCollab: Dispatch<SetStateAction<collaboratorType>>
    createCollab: () => Promise<void>;
}

interface CollaboratorProviderProps {
    children: ReactNode
}

export const CollaboratorContext = createContext({} as CollaboratorContextType);

export function CollaboratorProvider({ children }: CollaboratorProviderProps) {
    const [collaborator, setCollab] = useState<collaboratorType>({} as collaboratorType)
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
        <CollaboratorContext.Provider value={{ collaborator, setCollab,  createCollab }}>
            {children}
        </CollaboratorContext.Provider>
    )

}
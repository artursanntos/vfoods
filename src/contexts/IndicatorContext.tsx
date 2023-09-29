import { createContext, SetStateAction, useState, Dispatch, ReactNode } from 'react';
import { collaboratorType, indicatorType } from '../types';
import { useContext } from 'react';
import { VfoodsContext } from './VfoodsContext';	
import axios from 'axios';

interface IndicatorContextType {
    collaborator: collaboratorType[];
    setCollab: Dispatch<SetStateAction<collaboratorType[]>>
    indicator: indicatorType;
    setIndicator: Dispatch<SetStateAction<indicatorType>>
    createIndicator: () => Promise<void>;
}

interface IndicatorProviderProps {
    children: ReactNode
}

export const IndicatorContext = createContext({} as IndicatorContextType);

export function IndicatorProvider({ children }: IndicatorProviderProps) {
    const [collaborator, setCollab] = useState<collaboratorType[]>([])
    const [indicator, setIndicator] = useState<indicatorType>({} as indicatorType)
    const { manager } = useContext(VfoodsContext);

    const createIndicator = async () => {
        console.log("Chegou aqui");
        
        try {
            const url = 'http://localhost:3000/indicador'

            const headers = {
                'Content-Type': 'application/json'
            }

            console.log(manager.id);
            
            // setIndicator({...indicator, gestor: manager.id})

            const response = await axios.post(url, {...indicator, idGestor: manager.id}, { headers })
            
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <IndicatorContext.Provider value={{ collaborator, setCollab, indicator, setIndicator, createIndicator }}>
            {children}
        </IndicatorContext.Provider>
    )

}
import { createContext, SetStateAction, useState, Dispatch, ReactNode } from 'react';
import { collaboratorType, indicatorType } from '../types';

interface IndicatorContextType {
    collaborator: collaboratorType[];
    setCollab: Dispatch<SetStateAction<collaboratorType[]>>
    indicator: indicatorType;
    setIndicator: Dispatch<SetStateAction<indicatorType>>
}

interface IndicatorProviderProps {
    children: ReactNode
}

export const IndicatorContext = createContext({} as IndicatorContextType);

export function IndicatorProvider({ children }: IndicatorProviderProps) {
    const [collaborator, setCollab] = useState<collaboratorType[]>([])
    const [indicator, setIndicator] = useState<indicatorType>({} as indicatorType)

    return (
        <IndicatorContext.Provider value={{ collaborator, setCollab, indicator, setIndicator }}>
            {children}
        </IndicatorContext.Provider>
    )

}
import { createContext, SetStateAction, useState, Dispatch, ReactNode } from 'react';
import { collaboratorType, indicatorType } from '../types';
import { useContext } from 'react';
import { VfoodsContext } from './VfoodsContext';	
//import axios from 'axios';
import Api from '../Api';

interface IndicatorContextType {
    collaborator: collaboratorType[];
    setCollab: Dispatch<SetStateAction<collaboratorType[]>>
    indicator: indicatorType;
    setIndicator: Dispatch<SetStateAction<indicatorType>>
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>
    createEdit: string;
    setCreateEdit: Dispatch<SetStateAction<string>>
    allowUpdate: boolean;
    setAllowUpdate: Dispatch<SetStateAction<boolean>>
    createIndicator: () => Promise<void>;
    updateIndicator: (nome: string) => Promise<void>;
}

interface IndicatorProviderProps {
    children: ReactNode
}

export const IndicatorContext = createContext({} as IndicatorContextType);

export function IndicatorProvider({ children }: IndicatorProviderProps) {
    const [collaborator, setCollab] = useState<collaboratorType[]>([])
    const [indicator, setIndicator] = useState<indicatorType>({} as indicatorType)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [createEdit, setCreateEdit] = useState<string>('')
    const [allowUpdate, setAllowUpdate] = useState<boolean>(false)
    const { manager } = useContext(VfoodsContext);

    const createIndicator = async () => {
        //console.log("Chegou aqui");
        
        try {
            const url = 'indicador/'

            const headers = {
                'Content-Type': 'application/json'
            }

            // console.log(manager.id);

            Api.post(url, {...indicator, idGestor: manager.id}, { headers }).then(response => {
                console.log(response)
            });            
        } catch (error) {
            console.log(error)
        }
    }

    const updateIndicator = async (nome: string) => {
        try {
            const url = 'indicador/' + manager.id + '/' + nome

            const headers = {
                'Content-Type': 'application/json'
            }

            // console.log(manager.id);

            Api.put(url, {...indicator, idGestor: manager.id}, { headers }).then(response => {
                console.log(response)
            });            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <IndicatorContext.Provider value={{ collaborator, setCollab, indicator, setIndicator, createIndicator, openModal, setOpenModal, createEdit, setCreateEdit, updateIndicator, allowUpdate, setAllowUpdate }}>
            {children}
        </IndicatorContext.Provider>
    )

}
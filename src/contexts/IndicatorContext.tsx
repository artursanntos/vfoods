import { createContext, SetStateAction, useState, Dispatch, ReactNode } from 'react';
import { colaboratorIndicatorType, collaboratorType, indicatorType } from '../types';
import { useContext } from 'react';
import { VfoodsContext } from './VfoodsContext';	
import Api from '../Api';

interface IndicatorContextType {
    collaborator: collaboratorType[];
    setCollab: Dispatch<SetStateAction<collaboratorType[]>>
    all_colab_ind: colaboratorIndicatorType[];//lista de colaboradores-indicadores
    setAllColabInd: Dispatch<SetStateAction<colaboratorIndicatorType[]>>
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
    const [all_colab_ind, setAllColabInd] = useState<colaboratorIndicatorType[]>([])
    const [indicator, setIndicator] = useState<indicatorType>({} as indicatorType)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [createEdit, setCreateEdit] = useState<string>('')
    const [allowUpdate, setAllowUpdate] = useState<boolean>(false)
    const { manager } = useContext(VfoodsContext);

    const createIndicator = async () => {
        
        try {
            const url = 'indicador/'

            const headers = {
                'Content-Type': 'application/json'
            }

            console.log(collaborator)
            console.log(all_colab_ind)

            Api.post(url, {...indicator, idGestor: manager.id}, { headers }).then(response => {
                console.log(response)
                setIndicator(response.data)
                //É necessário que isto seja feito aqui pois é preciso o id do indicador, que só é obtido quando se faz o post
                createColaboradorIndicador(response.data.id)

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

    const createColaboradorIndicador = async (idIndicador:string) => {

        const url = 'colaborador-indicador/'
    
        const headers = {
                    'Content-Type': 'application/json'
        }
        //Enviar uma requisicao para cada colaborador adiconado ao indicador
        all_colab_ind.forEach(colabIndic => {
            try {
    
                Api.post(url, {...colabIndic, idIndicador: idIndicador}, { headers }).then(response => {
                    console.log(response)
                });
    
            } catch (error) {
                console.log(error)
            }
        });
        
    }

    return (
        <IndicatorContext.Provider value={{ collaborator, setCollab, indicator, setIndicator, createIndicator, openModal, setOpenModal, createEdit, setCreateEdit, updateIndicator, allowUpdate, setAllowUpdate, all_colab_ind, setAllColabInd }}>
            {children}
        </IndicatorContext.Provider>
    )

}
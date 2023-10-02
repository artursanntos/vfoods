import { createContext, SetStateAction, useState, Dispatch, ReactNode } from 'react';
import { colaboradorIndicadorType, collaboratorType, indicatorType } from '../types';
import { useContext } from 'react';
import { VfoodsContext } from './VfoodsContext';	
import Api from '../Api';

interface IndicatorContextType {
    collaborator: collaboratorType[];
    all_colab_ind: colaboradorIndicadorType[];//lista de colaboradores-indicadores
    setAllColabInd: Dispatch<SetStateAction<colaboradorIndicadorType[]>>
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
    const [all_colab_ind, setAllColabInd] = useState<colaboradorIndicadorType[]>([])
    const [indicator, setIndicator] = useState<indicatorType>({} as indicatorType)
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
        <IndicatorContext.Provider value={{ collaborator, setCollab, indicator, setIndicator, createIndicator, all_colab_ind, setAllColabInd }}>
            {children}
        </IndicatorContext.Provider>
    )

}
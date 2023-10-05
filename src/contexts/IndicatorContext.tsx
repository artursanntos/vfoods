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
    createIndicator: () => Promise<void>;
    updateIndicator: (nome: string) => Promise<void>;
    getAllColaboradorIndicador: (idIndicador: string) => void;
    getAllIndicatorMonth: (idIndicador: string) => void;
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
    const { manager, allCollaborators, getIndicators } = useContext(VfoodsContext);

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
                getIndicators(manager)
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

        setIndicator({} as indicatorType)
        setAllColabInd([])
        setCollab([])
        setCreateEdit('')
        
    }

    const updateIndicator = async (id: string) => {
        try {
            const url = 'indicador/' + manager.id + '/' + id

            const headers = {
                'Content-Type': 'application/json'
            }

            console.log(indicator);
            console.log(id)

            Api.put(url, {...indicator}, { headers }).then(response => {
                console.log(response)
            });

            updateCollaboratorIndicator()

        } catch (error) {
            console.log(error)
        }
    }

    const updateCollaboratorIndicator = async () => {
    
        const headers = {
                    'Content-Type': 'application/json'
        }
        //Enviar uma requisicao para cada colaborador adiconado ao indicador
        all_colab_ind.forEach(colabIndic => {
            try {
                const url = 'colaborador-indicador/' + colabIndic.id
                console.log(url)
    
                Api.patch(url, {...colabIndic}, { headers }).then(response => {
                    console.log(response)
                });
    
            } catch (error) {
                console.log(error)
                createColaboradorIndicador(indicator.id)
            }
        });

        setIndicator({} as indicatorType)
        setAllColabInd([])
        setCollab([])
        setCreateEdit('')
    }

    const getAllColaboradorIndicador = async (idIndicador:string) => {

        const url = 'colaborador-indicador/findAllOfIndicator/' + idIndicador
        
        try {

            Api.get(url).then(response => {
                const indCol = response.data.colaboradorIndicadores
                indCol.map((adicionar: colaboratorIndicatorType) => {
                    console.log(adicionar)
                    setAllColabInd(prevState => [...prevState, adicionar]);

                })
                console.log(all_colab_ind)
            });

        } catch (error) {
            console.log(error)
        }
        
    }

    const getAllIndicatorMonth = async (idIndicador:string) => {
        
        const month = new Date().getMonth() + 1;
        const monthString = month < 10 ? `0${month}` : `${month}`;
        const url = 'colaborador-indicador/findAllOfIndicatorByMonth/' + idIndicador + '/2023-' + monthString + '-01T00:00:00.000Z'
        setCollab([])
        
        try {

            Api.get(url).then(response => {
                const indCol = response.data.colaboradorIndicadores
                indCol.map((adicionar: colaboratorIndicatorType) => {
                    console.log(adicionar)
                    setAllColabInd(prevState => [...prevState, adicionar]);

                })
                console.log(all_colab_ind)
            });

            for (let x = 0; x < allCollaborators.length; x++) {
                for (let i = 0; i < all_colab_ind.length; i++) {
                    if (allCollaborators[x].id == all_colab_ind[i].idColaborador) {
                        setCollab(prevState => [...prevState, allCollaborators[x]]);
                        console.log('Cheguei aqui') 
                    }
                }
            }
            
            console.log(collaborator)
            console.log(all_colab_ind)

        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <IndicatorContext.Provider value={{ collaborator, setCollab, indicator, setIndicator, createIndicator, openModal, setOpenModal, createEdit, setCreateEdit, updateIndicator, all_colab_ind, setAllColabInd, getAllColaboradorIndicador, getAllIndicatorMonth }}>
            {children}
        </IndicatorContext.Provider>
    )

}
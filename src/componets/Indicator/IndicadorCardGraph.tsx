import Api from "../../Api";
import LineGraph from "../LineGraph";
import { IndicatorContext } from '../../contexts/IndicatorContext';
import { useContext, useEffect, useState } from 'react';
import { VfoodsContext } from "../../contexts/VfoodsContext";
import { colaboratorIndicatorType, collaboratorType } from "../../types";
import { useNavigate } from "react-router-dom";


type IndicadorCardGraphProps = {
    indicador: {
        id: string
        nome: string
        unidade_medida: string
        descricao: string
        data_deadline: Date
        idGestor: string
    }
}


export default function IndicadorCardGraph({ indicador }: IndicadorCardGraphProps) {
    
    
    const { setOpenModal, setCreateEdit, setAllColabInd, setCollab, collaborator, allCollabInd } = useContext(IndicatorContext);
    const { allCollaborators } = useContext(VfoodsContext)
    const [ liberar, setLiberar] = useState(false)
    const [auxColabInd, setAuxColabInd] = useState<colaboratorIndicatorType[]>([])
    const [auxColab, setAuxColab] = useState<collaboratorType[]>([])
    const [cat, setCat] = useState<[][]>([]);
    const navigate = useNavigate();

    function open() {
        setCreateEdit(indicador.nome)
        auxColab.map((collab) => {
            setCollab(prevState => [...prevState, collab])
        })
        auxColabInd.map((collabInd) => {
            setAllColabInd(prevState => [...prevState, collabInd])
        })

        
        setLiberar(true)
        
    }

    function setAux() {
        setCollab([])
        setAllColabInd([])

        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const monthString = month < 10 ? `0${month}` : `${month}`;
        const url = 'colaborador-indicador/findAllOfIndicatorByMonth/' + indicador.id + '/' + year + '-' + monthString + '-01T00:00:00.000Z'
        
        try {

            Api.get(url).then(response => {
                const indCol = response.data.colaboradorIndicadores
                indCol.map((adicionar: colaboratorIndicatorType) => {
                    console.log(adicionar)
                    setAuxColabInd(prevState => [...prevState, adicionar]);

                })
                console.log(auxColabInd)
            });

            for (let x = 0; x < allCollaborators.length; x++) {
                for (let i = 0; i < auxColabInd.length; i++) {
                    if (allCollaborators[x].id == allCollabInd[i].idColaborador) {
                        setAuxColab(prevState => [...prevState, allCollaborators[x]]);
                        console.log('Cheguei aqui') 
                    }
                }
            }

        } catch (error) {
            console.log(error)
        }

    }

    function fluxo() {
        console.log(collaborator)
        console.log(allCollabInd)
        setOpenModal(true)
        console.log('chegou open')
        setLiberar(false)
    }

    useEffect(() => {
        if (liberar) {
            fluxo()
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [liberar])

    useEffect (() => {
        setAux()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    useEffect(() => {
        
        try{
            Api.get('metas-mes-indicador/'+indicador.id).then(res =>{
                const aux = res.data;
                setCat(aux); 
                
            })
        } catch (error) {
            console.log(error)
        }
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    const navegar = () => {
        
        auxColab.map((collab) => {
            setCollab(prevState => [...prevState, collab])
        })
        auxColabInd.map((collabInd) => {
            setAllColabInd(prevState => [...prevState, collabInd])
        })
        navigate(`/indicators/${indicador.id}`)
    }

    return (
        <>
                              
            <div className='border rounded-10 bg-white border-cinza-100 h-[23.125rem] w-[29.75rem]  hover:border-[#7D55EF] hover:border-2'>

                <div className='flex flex-col'>
                    <div className="flex justify-between">
                        <button onClick={navegar} className='text-2xl font-bold mt-4 ml-[1.75rem]'>
                            {indicador.nome}
                        </button>

                        <button onClick={open} className="border border-cinza-400 rounded-10 h-[1.5rem] w-[5.75rem] mt-4 mr-[1.75rem] hover:border-[#7D55EF] hover:border-2">
                            Editar
                        </button>

                    </div>
                    
                    <div className='mb-4'>
                        <LineGraph mmsdInd={cat} />
                    </div>

                </div>
            </div>
            
        </>
    );
}

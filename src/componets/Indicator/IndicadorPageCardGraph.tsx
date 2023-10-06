import Api from "../../Api";
import IndicadorPageLineGraph from "./IndicadorPageLineGraph";
import { IndicatorContext } from '../../contexts/IndicatorContext';
import { useContext, useEffect, useState } from 'react';
import { VfoodsContext } from "../../contexts/VfoodsContext";
import { colaboratorIndicatorType } from "../../types";


type IndicadorPageGraphProps = {
    indicador: {
        id: string
        nome: string
        unidade_medida: string
        descricao: string
        data_deadline: Date
        idGestor: string
    }
}


export default function IndicadorPageGraph({ indicador }: IndicadorPageGraphProps) {
    
    
    const { setOpenModal, setCreateEdit, setAllColabInd, setCollab, collaborator, allCollabInd } = useContext(IndicatorContext);
    const { allCollaborators } = useContext(VfoodsContext)
    const [ liberar, setLiberar] = useState(false)
    const [cat, setCat] = useState<[][]>([]);

    function open() {
        setCreateEdit(indicador.nome)
        setCollab([])

        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const monthString = month < 10 ? `0${month}` : `${month}`;
        const url = 'colaborador-indicador/findAllOfIndicatorByMonth/' + indicador.id + '/' + year + '-' + monthString + '-01T00:00:00.000Z'
        
        try {

            Api.get(url).then(response => {
                const indCol = response.data.colaboradorIndicadores
                indCol.map((adicionar: colaboratorIndicatorType) => {
                    console.log(adicionar)
                    setAllColabInd(prevState => [...prevState, adicionar]);

                })
                console.log(allCollabInd)
            });

            for (let x = 0; x < allCollaborators.length; x++) {
                for (let i = 0; i < allCollabInd.length; i++) {
                    if (allCollaborators[x].id == allCollabInd[i].idColaborador) {
                        setCollab(prevState => [...prevState, allCollaborators[x]]);
                        console.log('Cheguei aqui') 
                    }
                }
            }

            setLiberar(true)

        } catch (error) {
            console.log(error)
        }
    }

    function fluxo() {
        console.log(collaborator)
        console.log(allCollabInd)
        setOpenModal(true)
        //console.log('chegou open')
        setLiberar(false)
    }

    useEffect(() => {
        if (liberar) {
            fluxo()
        }
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [liberar])

    

    
  
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

    return (
        <>
            <button
                onClick={() => { console.log('clicou') }}
                className='border rounded-10 bg-white border-cinza-100 h-[23.125rem] w-[29.75rem]'>

                <div className='flex flex-col'>
                    <div className="flex justify-between">
                        <h4 className='text-2xl font-bold mt-4 ml-[1.75rem]'>
                            Histórico
                        </h4>

                    </div>
                    
                    <div className='mb-4'>
                        <IndicadorPageLineGraph mmsdInd={cat} />
                    </div>

                </div>
            </button>

        </>
    );
}

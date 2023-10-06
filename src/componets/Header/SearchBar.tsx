import { useContext, useState, useEffect, useRef } from 'react';
import { VfoodsContext } from '../../contexts/VfoodsContext';
import { collaboratorType, indicatorType } from '../../types';
import { Link } from 'react-router-dom';
import { IndicatorContext } from '../../contexts/IndicatorContext';
import { colaboratorIndicatorType } from '../../types';
import Api from '../../Api';

export function SearchBar() {
    const { allCollaborators, allIndicators } = useContext(VfoodsContext);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const [filteredCollaborators, setFilteredCollaborators] = useState([] as collaboratorType[]);
    const [filteredIndicators, setFilteredIndicators] = useState([] as indicatorType[]);
    const [showResults, setShowResults] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const {setAllColabInd, setCollab, setIndicator, allCollabInd} = useContext(IndicatorContext)

    const filterItems = (items: any, search: string) => {
        return items
            .filter((item: any) => item.nome.toLowerCase().includes(search.toLowerCase()))
            .sort((a: any, b: any) => a.nome.localeCompare(b.nome));
    };

    const handleSearch = (search: string) => {
        setSearchValue(search);

        if (search === '') {
            setShowResults(false);
            return;
        }

        setShowResults(true);

        let fc = filterItems(allCollaborators, search);
        let fi = filterItems(allIndicators, search);

        setFilteredCollaborators(fc);
        setFilteredIndicators(fi);
    }

    const handleClickOutside = (event: any) => {
        if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setShowResults(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const searchChanges = async (id: string) => {

        const url = '/indicador/info/byId/' + id;
        const response = await Api.get(url);
        setIndicator(response.data);

        setCollab([])
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const monthString = month < 10 ? `0${month}` : `${month}`;
        const url2 = 'colaborador-indicador/findAllOfIndicatorByMonth/' + id + '/' + year + '-' + monthString + '-01T00:00:00.000Z'
        
        try {

            Api.get(url2).then(response => {
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
            

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-[32.15rem] flex flex-col'>
            <input
                type="text"
                ref={searchInputRef}
                className="border border-cinza-300 rounded-19 h-[3.5rem] w-full bg-transparent px-6 text-lg placeholder:text-cinza-300 focus:shadow-none focus:outline-none outline-none focus:border-transparent"
                placeholder="Pesquise colaboradores e indicadores"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
            />

            {showResults && (
                <div className="bg-white border border-cinza-300 rounded-19 mt-[3.5rem] h-max w-[32.15rem] z-40 absolute">
                    <p className="text-gray-500 text-sm pt-2 pl-2">Colaboradores</p>

                    {filteredCollaborators.length === 0 &&
                        <p className="text-thin text-gray-500 text-sm pt-2 pl-2">Nenhum resultado encontrado</p>}

                    <ul className="divide-y divide-cinza-300 max-h-[50%] overflow-y-scroll p-2">
                        {filteredCollaborators.map((collaborator) => (
                            <li key={collaborator.id} className='h-[3rem] hover:bg-azul hover:round hover:rounded-3xl'>
                                <Link to={`/collaborators/${collaborator.id}`}>
                                    <div className="flex flex-row items-center justify-start">
                                        <img
                                            src={collaborator.imagem}
                                            className="w-10 h-10 rounded-full items-center ml-2 object-cover"
                                            alt="Foto do colaborador"
                                        />
                                        <div className="ml-2 flex flex-col items-start justify-center">
                                            <p>{collaborator.nome}</p>
                                            <p className='text-sm text-gray-500'>{collaborator.cargo}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <p className="text-gray-500 text-sm pt-2 pl-2">Indicadores</p>

                    {filteredIndicators.length === 0 &&
                        <p className="text-thin text-gray-500 text-sm pt-2 pl-2">Nenhum resultado encontrado</p>}

                    <ul className="divide-y divide-cinza-300 max-h-[50%] overflow-y-scroll p-2">
                        {filteredIndicators.map((indicator) => (
                            <li key={indicator.id} className='h-[3rem] hover:bg-azul hover:round hover:rounded-3xl items-center'>
                                <Link onClick={() => searchChanges(indicator.id)} to={`/indicators/${indicator.id}`}>
                                    <p className="ml-2 p-2 items-center">
                                        {indicator.nome}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

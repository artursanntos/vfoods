import { useContext, useState, useEffect } from 'react';
import { VfoodsContext } from '../../contexts/VfoodsContext';
import iconSearch from './assets/IconSearch.png';
import { collaboratorType, indicatorType } from '../../types';
import { Link } from 'react-router-dom';

export function SearchBar() {
    const { allCollaborators, allIndicators } = useContext(VfoodsContext);
    const [search, setSearch] = useState('');
    const [filteredCollaborators, setFilteredCollaborators] = useState([] as collaboratorType[]);
    const [filteredIndicators, setFilteredIndicators] = useState([] as indicatorType[]);
    const [showResults, setShowResults] = useState(false);

    const handleShowResults = () => {
        setShowResults(true);
    }

    useEffect(() => {
        if (search === '') {
            // Se o campo de pesquisa estiver vazio, oculte os resultados
            setShowResults(false);
            return;
        }

        let fc = allCollaborators.filter((collaborator) => {
            return collaborator.nome.toLowerCase().includes(search.toLowerCase());
        });

        let fi = allIndicators.filter((indicator) => {
            return indicator.nome.toLowerCase().includes(search.toLowerCase());
        });

        setFilteredCollaborators(fc);
        setFilteredIndicators(fi);
    }, [search, allCollaborators, allIndicators]);

    return (
        <div className='w-[32.15rem] flex flex-col'>
            <div className="border border-cinza-300 rounded-19 h-[3.5rem] w-[32.15rem]">
                <input
                    type="text"
                    className="float-left bg-transparent pl-[2.25rem] pt-4 mr-[3rem] italic text-lg border-none w-[24rem] placeholder:text-cinza-300 focus:shadow-none outline-none"
                    placeholder="Pesquise colaboradores e indicadores"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <img
                    src={iconSearch}
                    className="w-[2.75rem] pt-[0.3rem] cursor-pointer"
                    alt="Buscar"
                    onClick={handleShowResults} // Adicione um evento de clique para iniciar a pesquisa
                />
            </div>

            {showResults && (
                <div className="bg-white border border-cinza-300 rounded-19 mt-[3.5rem] h-max w-[32.15rem] z-49 absolute">
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
                                <Link to={`/indicators/${indicator.id}`}>
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

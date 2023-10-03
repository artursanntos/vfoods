export function SearchBar(){
    return (
        <div className="border border-cinza-300 rounded-19 h-[3.5rem] w-[32.15rem]">
            <input type="text" className="float-left bg-transparent pl-[2.25rem] pt-4 mr-[3rem] italic text-lg border-none w-[24rem] placeholder:text-cinza-300 focus:shadow-none outline-none" placeholder="Pesquise colaboradores e indicadores"/>
            <img src="/src\componets\Header\assets\IconSearch.png" className="w-[2.75rem] pt-[0.3rem] cursor-pointer" alt="Buscar"/>
        </div>
    )
} 
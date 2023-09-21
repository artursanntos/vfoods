export function SearchBar(){
    return (
        <div className="border border-cinza-300 rounded-19 h-[7vh] w-[35vw]">
            <input type="text" className="float-left bg-transparent pl-[2.5vw] pt-[2vh] italic text-2xl border-none w-[30vw] placeholder:text-cinza-300 focus:shadow-none outline-none" placeholder="Pesquise colaboradores e indicadores"/>
            <img src="src\componets\Header\assets\IconSearch.png" className="w-[2vw] pt-[1.5vh]" alt="Buscar"/>
        </div>
    )
} 
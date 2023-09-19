import './SearchBar.css'


export function SearchBar(){
    return (
        <div className="bodySearchBar">
            <input type="text" className="input-search-bar" placeholder="Pesquise colaboradores e indicadores"/>
            <img src="src\componets\Header\assets\IconSearch.png" className="search-button" alt="Buscar"/>
        </div>
    );
} 
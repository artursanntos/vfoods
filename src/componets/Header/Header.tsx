import { useContext } from 'react';
import { SearchBar } from './SearchBar';
import { Link } from 'react-router-dom';
import { VfoodsContext } from '../../contexts/VfoodsContext';



export function Header(){

    const { manager } = useContext(VfoodsContext);
    const userNameManager = manager.nome;
    const pathUserImgManager = manager.imagem;

    return (
        <div className="flex justify-center ml-[15rem] pl-12 w-[69rem] max-w-[69rem] min-w[69rem]">
            <div className="flex">
                <SearchBar />
            </div>
            
            <div className="flex items-center pl-[16rem]">
                <div className="w-[2rem]">
                    <img src="/src\componets\Header\assets\IconNotification.png" alt="Notificações"></img>
                </div>
                
                <Link to={"/profile"}>

                    <div className="flex pr-[6.25rem] pl-[3.25rem] text-[0.95rem] items-center gap-4 hover:scale-105 duration-300 ease-in-out">
                        <div >
                            <img className="rounded-full w-[2.75rem] max-w-[2.75rem]" src={ pathUserImgManager } alt="Imagem de perfil"></img>
                        </div>
                        
                        <div className="font-bold w-[8.25rem]">
                            { userNameManager }
                        </div>

                    </div>
                
                </Link>
            </div>
        </div>
    );
} 
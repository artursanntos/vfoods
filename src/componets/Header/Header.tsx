import { SearchBar } from './SearchBar';
import { Link } from 'react-router-dom';

type HeaderProps = {
    pathUserImg:string;
    userName:string;
    //é possivel fazer tratamentos com o userName para reduzir a um valor máximo de caracteres
    
}

export function Header({ pathUserImg, userName }: HeaderProps){
    return (
        <div className="flex space-between pl-12 w-[69rem] max-w-[69rem] min-w[69rem]">
            <div className="flex">
                <SearchBar />
            </div>
            
            <div className="flex items-center pl-[16rem]">
                <div className="w-[2rem]">
                    <img src="src\componets\Header\assets\IconNotification.png" alt="Notificações"></img>
                </div>
                
                <Link to={"/profile"}>

                    <div className="flex pr-[6.25rem] pl-[3.25rem] text-[0.95rem] items-center gap-4 hover:scale-105 duration-300 ease-in-out">
                        <div >
                            <img className="rounded-full w-[2.75rem] max-w-[2.75rem]" src={ pathUserImg } alt="Imagem de perfil"></img>
                        </div>
                        
                        <div className="font-bold w-[8.25rem]">
                            { userName }
                        </div>

                    </div>
                
                </Link>
            </div>
        </div>
    );
} 
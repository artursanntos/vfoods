import { SearchBar } from './SearchBar';

type HeaderProps = {
    pathUserImg:string;
    userName:string;
    //é possivel fazer tratamentos com o userName para reduzir a um valor máximo de caracteres
    
}

export function Header({ pathUserImg, userName }: HeaderProps){
    return (
        <div className="flex pl-[10vw]">
            <div className="">
                <SearchBar />
            </div>
            
            <div className="flex pl-[6vw]">
                <div>
                    <img className="h-[5vh] pt-[1vh]" src="src\componets\Header\assets\IconNotification.png" alt="Notificações"></img>
                </div>
                
                <div className="flex pl-[3vw] text-[1.2vw] items-center gap-4">
                    <div >
                        <img className="rounded-full w-[2.75rem] max-w-[2.75rem]" src={ pathUserImg } alt="Imagem de perfil"></img>
                    </div>
                    
                    <div className="font-bold">
                        { userName }
                    </div>

                </div>
            </div>
        </div>
    );
} 
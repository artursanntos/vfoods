import './Header.css'
import { SearchBar } from './SearchBar';

type HeaderProps = {
    pathUserImg:string;
    userName:string;
    //é possivel fazer tratamentos com o userName para reduzir a um valor máximo de caracteres
    
}

export function Header(props:HeaderProps){
    return (
        <div className="bodyHeader">
            <div className="search-bar">
                <SearchBar />
            </div>
            
            <div className="right-itens">
                <div >
                    <img className="notification-icon" src="src\componets\Header\assets\IconNotification.png" alt="Notificações"></img>
                </div>
                
                <div className="user-iformation">
                    <div >
                        <img className="user-img" src={props.pathUserImg} alt="Imagem de perfil"></img>
                    </div>
                    
                    <div className="user-name">
                        {props.userName}
                    </div>

                </div>
            </div>
        </div>
    );
} 
import { ButtonSB } from './ButtonSB';
import './SideBar.css'


export function SideBar(){
    return (
        <div className="bodySideBar">
            <div className="logo">
                <img src="src\componets\SideBar\assets\logo.png" alt="V-Foods Logo"></img>
            </div>
            <div className="menu">
                <div className="menuTop">
                    
                    <div className="SideBarItem">
                        <ButtonSB pathIcon={"src/componets/SideBar/assets/IconHome.png"} buttonText={'Home'} />
                    </div>
                    <div className="SideBarItem">
                        <ButtonSB pathIcon={"src/componets/SideBar/assets/IconIndicadores.png"} buttonText={'Indicadores'} />
                    </div>
                    <div className="SideBarItem">
                        <ButtonSB pathIcon={"src/componets/SideBar/assets/IconRanking.png"} buttonText={'Ranking'} />
                    </div>
                    <div className="SideBarItem">
                        <ButtonSB pathIcon={"src/componets/SideBar/assets/IconMeuPerfil.png"} buttonText={'Meu perfil'} />
                    </div>
                    
                </div>

                <div className="menuBottom">
                    <div className="SideBarItem">
                        <ButtonSB pathIcon={"src/componets/SideBar/assets/IconConfiguracoes.png"} buttonText={'Configurações'} />
                    </div>
                    
                    <div className="SideBarItem">
                        <ButtonSB pathIcon={"src/componets/SideBar/assets/IconSair.png"} buttonText={'Sair'} />
                    </div>
                    
                    
                </div>
                
            </div>
        </div>
    );
} 
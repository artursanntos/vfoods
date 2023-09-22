import { ButtonSB } from './ButtonSB';
import { Link } from 'react-router-dom';


export function SideBar(){
    return (
        <div className="flex flex-col items-center h-screen fixed overflow-y-auto z-0 w-[15rem] max-w-[15rem] bg-white border-r border-azul-400">
            <div className="pt-16">
                <a href="/" >
                    <img src="src\componets\SideBar\assets\logo.png" alt="V-Foods Logo"/>
                </a>
            </div>
            <div className="flex flex-col items-center justify-between h-full pt-24">
                <div className="flex flex-col gap-5">
                    
                    <div className="SideBarItem">
                        <Link to={"/"}>
                            <ButtonSB pathIcon={"src/componets/SideBar/assets/IconHome.png"} buttonText={'Home'} />
                        </Link>
                    </div>
                    <div className="SideBarItem">
                        <Link to={"/indicators"}>
                            <ButtonSB pathIcon={"src/componets/SideBar/assets/IconIndicadores.png"} buttonText={'Indicadores'} />
                        </Link>
                        
                    </div>
                    <div className="SideBarItem">
                        <ButtonSB pathIcon={"src/componets/SideBar/assets/IconRanking.png"} buttonText={'Ranking'} />
                    </div>
                    <div className="SideBarItem">
                        <ButtonSB pathIcon={"src/componets/SideBar/assets/IconMeuPerfil.png"} buttonText={'Meu perfil'}/>
                    </div>
                    
                </div>

                <div className="flex flex-col pt-5 gap-5 mb-14">
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
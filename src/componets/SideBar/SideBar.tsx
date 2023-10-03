import { ButtonSB } from './ButtonSB';
import { Link } from 'react-router-dom';


export function SideBar(){
    return (
        <div className="flex flex-col items-center h-screen fixed overflow-y-auto z-0 w-[15rem] max-w-[15rem] bg-branco border-r border-azul-400">
            <div className="pt-16">
                <Link to={"/"} >
                    <img src="/src\componets\SideBar\assets\logo.png" alt="V-Foods Logo" className="hover:scale-105 duration-300 ease-in-out"/>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-between h-full pt-24">
                <div className="flex flex-col gap-5">
                    
                    <div className="SideBarItem">
                        <Link to={"/"}>
                            <ButtonSB pathIcon={"/src/componets/SideBar/assets/IconHome.png"} buttonText={'Home'} />
                        </Link>
                    </div>
                    <div className="SideBarItem">
                        <Link to={"/indicators"}>
                            <ButtonSB pathIcon={"/src/componets/SideBar/assets/IconIndicadores.png"} buttonText={'Indicadores'} />
                        </Link>
                        
                    </div>
                    <div className="SideBarItem">
                        <Link to={"/collaborators"}>
                            <ButtonSB pathIcon={"/src/componets/SideBar/assets/IconRanking.png"} buttonText={'Colaboradores'} />
                        </Link>
                    </div>
                    <div className="SideBarItem">
                        <Link to={"/profile"}>
                            <ButtonSB pathIcon={"/src/componets/SideBar/assets/IconMeuPerfil.png"} buttonText={'Meu perfil'}/>
                        </Link>
                    </div>
                    
                </div>

                <div className="flex flex-col mb-16">
                                  
                    <div className="SideBarItem">
                        <Link to={"/login"}>
                            <ButtonSB pathIcon={"/src/componets/SideBar/assets/IconSair.png"} buttonText={'Sair'} />
                        </Link>
                    </div>
                    
                    
                </div>
                
            </div>
        </div>
    );
} 
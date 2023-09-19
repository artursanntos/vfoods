type ButtonSBProps = {
    pathIcon:string;
    buttonText:string;
    //selected:boolean;
    //esse atributo deixa o botao selecionado, para indicar que já está na página que o motão levaria
}

export function ButtonSB(props:ButtonSBProps){
    return (
        <div>
            <button className="flex w-[15vw] h-[5vh] items-center py-[2vh] px-[1vw] border-[0.8em] border-white rounded-[0.7em] bg-white mb-[1vh] hover:bg-azul hover:border-azul hover:font-bold">
            <img src={props.pathIcon} className="mr-[2vw]"></img>
            <span className="button-text">{props.buttonText}</span>
            </button>
        </div>
        
    );
}
import './ButtonSB.css'

type ButtonSBProps = {
    pathIcon:string;
    buttonText:string;
    //selected:boolean;
    //esse atributo deixa o botao selecionado, para indicar que já está na página que o motão levaria
}

export function ButtonSB(props:ButtonSBProps){
    return (
        <div>
            <button className="bodyButton">
            <img src={props.pathIcon} className="icon"></img>
            <span className="button-text">{props.buttonText}</span>
            </button>
        </div>
        
    );
}
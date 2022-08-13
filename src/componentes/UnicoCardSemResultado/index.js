import "./estilo.css";
import IconeFiltroSemResultado from "../../imagens/iconeFiltroSemResultado.svg";

function UnicoCardSemResultado() {
   return (
      <div className="imagemSemResultado">
         <div className="unicoCardSemResultado">
            <img src={IconeFiltroSemResultado} alt="icone sem resultado" />
            <h1>Nenhum resultado foi encontrado!</h1>
            <h2>Verifique se escrita está correta</h2>
         </div>
      </div>
   );
}

export default UnicoCardSemResultado;

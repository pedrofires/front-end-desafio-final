import "./estilo.css";
import InfoUsuario from "../InfoUsuario";
import SetaCabecalhoClienteDetalhe from '../../imagens/setaCabecalhoClienteDetalhe.svg'


function Cabecalho(props) {
   return (
      <div className={props.pagina === "Estilizada" ? "cabecalhoPaginaEstilizada" : "cabecalhoPaginaNormal"}>
         <div className={props.pagina === "Estilizada" ? "cabecalhoPaginaEstilizadaH1" : ""}>
            <h1 >{props.titulo}</h1>

            {props.detalhes && <div className="divDetalhesCliente">
               <img className="imgDetalhesCliente" src={SetaCabecalhoClienteDetalhe} alt='seta cliente'/>
               <h1 className="h1DetalhesCliente">Detalhes do cliente</h1>
            </div>}
         </div>
         <InfoUsuario />
      </div>
   );
}

export default Cabecalho;
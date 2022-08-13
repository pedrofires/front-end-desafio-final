import "./estilo.css";
import HomeAtivo from "../../imagens/iconeHome.svg";
import HomeDesativado from "../../imagens/iconeHomeDesativado.svg";
import ClientesAtivo from "../../imagens/iconeClientesAtivo.svg";
import ClientesDesativado from "../../imagens/iconeClientes.svg";
import CobrancasDesativado from "../../imagens/iconeCobrancas.svg";
import CobrancasAtivado from "../../imagens/iconeCobrancaAtivado.svg";
import { useNavigate } from "react-router-dom";

function MenuLateral(props) {
   const navigateTo = useNavigate();

   function clientes() {
      navigateTo("/clientes");
      if (props.carregarClientes) props.carregarClientes();
   }

   function cobrancas() {
      navigateTo("/cobrancas");
      if (props.carregarCobrancas) props.carregarCobrancas();
   }

   return (
      <div className="menuLateral">
         <div
            onClick={() => navigateTo("/home")}
            className={
               props.pagina === "home btn-hover"
                  ? "paginaAtualDiv btn-hover"
                  : "btn-hover"
            }
         >
            <img
               src={props.pagina === "home" ? HomeAtivo : HomeDesativado}
               alt="ir para a pagina home"
            />
            <p className={props.pagina === "home" ? "paginaAtualP" : ""}>
               Home
            </p>
         </div>

         <div
            onClick={() => clientes()}
            className={
               props.pagina === "clientes btn-hover"
                  ? "paginaAtualDiv btn-hover"
                  : "btn-hover"
            }
         >
            <img
               src={
                  props.pagina === "clientes"
                     ? ClientesAtivo
                     : ClientesDesativado
               }
               alt="ir para a pagina clientes"
            />
            <p className={props.pagina === "clientes" ? "paginaAtualP" : ""}>
               Clientes
            </p>
         </div>

         <div
            onClick={() => cobrancas()}
            className={
               props.pagina === "cobrancas btn-hover"
                  ? "paginaAtualDiv btn-hover"
                  : "btn-hover"
            }
         >
            <img
               src={
                  props.pagina === "cobrancas"
                     ? CobrancasAtivado
                     : CobrancasDesativado
               }
               alt="ir para a pagina cobrancas"
            />
            <p className={props.pagina === "cobrancas" ? "paginaAtualP" : ""}>
               Cobranças
            </p>
         </div>
      </div>
   );
}

export default MenuLateral;

import "./estilo.css";
import IconeTabelaClientes from "../../imagens/iconeTabelaClientes.svg";

function MenuClientesTabela(props) {
   return (
      <div className="menuClientesTabela">
         <div
            className="colunaCliente btn-hover"
            onClick={() => props.reordenarCliente()}
         >
            <img src={IconeTabelaClientes} alt="icone cliente" />
            <p>Cliente</p>
         </div>
         <div className="colunaTabelaNumero24">
            <p>CPF</p>
         </div>
         <div className="colunaTabelaNumero3">
            <p>E-mail</p>
         </div>
         <div className="colunaTabelaNumero24">
            <p>Telefone</p>
         </div>
         <div className="colunaTabelaNumero5">
            <p>Status</p>
         </div>
         <div className="colunaTabelaNumero6">
            <p>Criar Cobrança</p>
         </div>
      </div>
   );
}

export default MenuClientesTabela;

import "./estilo.css";

function CardClientesStatus(props) {
   return (
      <div className="rotulo-tabela-card-clientesDados">
         <div className="rotulo-tabela-card-clientes-Clientes">
            <h1>{props.nome}</h1>
         </div>
         <div className="rotulo-tabela-card-clientes-Clientes">
            <h1>{props.idCobranca}</h1>
         </div>
         <div className="rotulo-tabela-card-clientes-Valor">
            <h1>{`R$ ${(props.valor / 100).toFixed(2)}`}</h1>
         </div>
      </div>
   );
}

export default CardClientesStatus;

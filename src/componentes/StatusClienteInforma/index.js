import "./estilo.css";

function StatusClienteInforma(props) {
   return (
      <div className="cardStatusClienteInformacoes">
         <div className="miniTabelaNomesClientes">
            <h1>{props.nome}</h1>
         </div>
         <div className="miniTabelaNomesData">
            <h1>{props.id}</h1>
         </div>
         <div className="miniTabelaNomesVenc">
            <h1>{props.cpf}</h1>
         </div>
      </div>
   );
}

export default StatusClienteInforma;

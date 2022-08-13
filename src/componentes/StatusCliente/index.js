import "./estilo.css";
import StatusClienteInforma from "../StatusClienteInforma/index.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function StatusCliente(props) {
   const [listaDeClientes, setListaDeClientes] = useState([]);

   useEffect(() => {
      const listaClientes = [];
      for (let i = 0; i < 4; i++) {
         const clientes = props.clientes[i];
         if (clientes) listaClientes.push(clientes);
      }
      setListaDeClientes(listaClientes);
   }, [props.clientes]);

   return (
      <div className="cardStatusCliente">
         <div className="cabecalhoMiniTabelaClientes">
            <div className="cabecalhoMiniTabelaClientesInfo">
               <img src={props.icon} alt="icone" />
               <h1>{props.titulo}</h1>
            </div>
            <div className="cabecalhoMiniTabelaClientesNumero">
               <h2 style={{ background: props.bgcolor, color: props.color }}>
                  {props.quantidade}
               </h2>
            </div>
         </div>
         <div className="miniTabelaClientesCabecalho">
            <div className="miniTabelaNomesClientes">
               <h1>Clientes</h1>
            </div>
            <div className="miniTabelaNomesData">
               <h1>ID do clie.</h1>
            </div>
            <div className="miniTabelaNomesVenc">
               <h1>CPF</h1>
            </div>
         </div>
         {listaDeClientes.map((cliente) => (
            <StatusClienteInforma
               key={cliente.id}
               nome={cliente.nome}
               id={cliente.id}
               cpf={cliente.cpf}
            />
         ))}
         <div className="linkMiniTabela">
            <Link to={props.url} className="btn-hover">
               Ver todos
            </Link>
         </div>
      </div>
   );
}

export default StatusCliente;

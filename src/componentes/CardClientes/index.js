import "./estilo.css";
import CardClientesStatus from "../CardClientesStatus/index.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CardCliente(props) {
   const [listaDeCobrancas, setListaDeCobrancas] = useState([]);

   useEffect(() => {
      const listaCobrancas = [];
      for (let i = 0; i < 4; i++) {
         const cobranca = props.cobrancas[i];
         if (cobranca) listaCobrancas.push(cobranca);
      }
      setListaDeCobrancas(listaCobrancas);
   }, [props.cobrancas]);

   return (
      <div className="cardCliente">
         <div className="cabecalho-tabelaClientes">
            <h1>{props.titulo}</h1>
            <h2 style={{ background: props.bgcolor, color: props.color }}>
               {props.quantidade}
            </h2>
         </div>

         <div className="rotulo-tabela-card-clientes">
            <div className="rotulo-tabela-card-clientes-Clientes">
               <h1>Cliente</h1>
            </div>
            <div className="rotulo-tabela-card-clientes-Rotulo">
               <h1 className="rotulo-id">ID da Cob.</h1>
            </div>
            <div className="rotulo-tabela-card-clientes-Valor">
               <h1>Valor</h1>
            </div>
         </div>

         {listaDeCobrancas.map((cobranca) => (
            <CardClientesStatus
               key={cobranca.id}
               nome={cobranca.nome}
               idCobranca={cobranca.id}
               valor={cobranca.valor}
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

export default CardCliente;

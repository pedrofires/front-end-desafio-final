import "./estilo.css";
import iconeExcluirTabelaCobranca from "../../imagens/iconeExcluirTabelaCobranca.svg";
import iconeEditarTabelaCobranca from "../../imagens/iconeEditarTabelaCobranca.svg";
import { useState } from "react";
import ComumCardExclusaoCobranca from "../../componentes/ComumCardExclusãoCobranca";
import CardCadastroCobranca from "../CardCadastroCobranca";

function UnicoTabelaCobrancaDados(props) {
   const [abrirModalExcluir, setAbrirModalExcluir] = useState(false);
   const [modalNovaCobranca, setModalNovaCobranca] = useState(false);

   return (
      <div className="tabelaCobrancaDados">
         <div className="dadosDaTabelaCobranca">
            <div className="divTabIdCobranca">
               <p>{props.idCobranca}</p>
            </div>
            <div className="divTabVencimentoCobranca">
               <p>{props.vencimento}</p>
            </div>
            <div className="divTabValorCobranca">
               <p>{props.valor}</p>
            </div>
            <div className="divTabValorCobrancaDados divTabStatusCobrancas">
               <div>
                  <h3
                     className={
                        props.status === "Vencida"
                           ? "divTabValorCobrancaDadosVenc"
                           : props.status === "Pendente"
                           ? "divTabValorCobrancaDadosPend"
                           : "divTabValorCobrancaDadosPago"
                     }
                  >
                     {props.status}
                  </h3>
               </div>
            </div>
            <div className="divTabDescricaoCobranca">
               <p>{props.descricao}</p>
            </div>
            <div className="divTabOpcoesCobranca">
               <div
                  className="btn-hover"
                  onClick={() => setModalNovaCobranca(true)}
               >
                  <img src={iconeEditarTabelaCobranca} alt="icone editar" />
                  <h4>Editar</h4>
               </div>
               <div
                  className="btn-hover"
                  onClick={() => setAbrirModalExcluir(true)}
               >
                  <img src={iconeExcluirTabelaCobranca} alt="icone editar" />
                  <h4>Excluir</h4>
               </div>
            </div>
         </div>
         {abrirModalExcluir && (
            <ComumCardExclusaoCobranca
               setAbrirModalExcluir={setAbrirModalExcluir}
               idCobranca={props.idCobranca}
            />
         )}
         {modalNovaCobranca && (
            <CardCadastroCobranca
               setModalNovaCobranca={setModalNovaCobranca}
               nomeCliente={props.nomeCliente}
               funcaoDoModal="editar"
               id={props.dadosDacobranca.id_cliente}
               dadosDacobranca={props.dadosDacobranca}
               setCobrancas={props.setCobrancas}
            />
         )}
      </div>
   );
}

export default UnicoTabelaCobrancaDados;

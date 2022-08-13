import "./estilo.css";
import iconeExcluirTabelaCobranca from "../../imagens/iconeExcluirTabelaCobranca.svg";
import iconeEditarTabelaCobranca from "../../imagens/iconeEditarTabelaCobranca.svg";
import { useState } from "react";
import ComumCardExclusaoCobranca from "../../componentes/ComumCardExclusãoCobranca";
import CardCadastroCobranca from "../CardCadastroCobranca";

function UnicoTabelaCobrancaDados(props) {
   const [abrirModalExcluir, setAbrirModalExcluir] = useState(false);
   const [modalNovaCobranca, setModalNovaCobranca] = useState(false);

   function carregarDetalhesDaCobranca() {
      props.setInfoCobranca({
         nome: props.nome,
         descricao: props.descricao,
         vencimento: props.vencimento,
         valor: props.valor,
         id: props.idCobranca,
         status: props.status,
      });
      props.setModalDetalhe(true);
   }
   return (
      <div className="unicoTabelaCobrancaDados">
         <div className="dadosTabelaCobranca">
            <div
               onClick={() => carregarDetalhesDaCobranca()}
               className={
                  props.maisUmaDiv
                     ? "divTabCobrancaTam03"
                     : "divTabCobrancaTam06"
               }
            >
               <p>{props.nome}</p>
            </div>
            <div
               onClick={() => carregarDetalhesDaCobranca()}
               className="divTabCobrancaTam06"
            >
               <p>{props.idCobranca}</p>
            </div>
            <div
               onClick={() => carregarDetalhesDaCobranca()}
               className="divTabCobrancaTam02"
            >
               <p>{props.valor}</p>
            </div>
            {props.maisUmaDiv && (
               <div
                  onClick={() => carregarDetalhesDaCobranca()}
                  className="divTabCobrancaTam04"
               >
                  <p>{props.vencimento}</p>
               </div>
            )}
            <div
               onClick={() => carregarDetalhesDaCobranca()}
               className="divTabCobrancaTam02Dados"
            >
               <div>
                  <h3
                     className={
                        props.status === "Vencida" ||
                        props.vencimento === "Vencida"
                           ? "divTabCobrancaTam02DadosVenc"
                           : props.status === "Pendente" ||
                             props.vencimento === "Pendente"
                           ? "divTabCobrancaTam02DadosPend"
                           : "divTabCobrancaTam02DadosPago"
                     }
                  >
                     {props.maisUmaDiv ? props.status : props.vencimento}
                  </h3>
               </div>
            </div>
            <div
               onClick={() => carregarDetalhesDaCobranca()}
               className={
                  props.maisUmaDiv
                     ? "divTabCobrancaTam05"
                     : "divTabCobrancaTam05Mod"
               }
            >
               <p>{props.maisUmaDiv ? props.descricao : props.status}</p>
            </div>
            <div className="divTabCobrancaTam01">
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
               carregarCobrancas={props.carregarCobrancas}
            />
         )}
         {modalNovaCobranca && (
            <CardCadastroCobranca
               id={props.dadosDaCobranca.id_cliente}
               dadosDacobranca={props.dadosDaCobranca}
               nomeCliente={props.nome}
               setCobrancas={props.setCobrancas}
               modalNovaCobranca={modalNovaCobranca}
               setModalNovaCobranca={setModalNovaCobranca}
               funcaoDoModal="editar"
               pagina="cobrancas"
            />
         )}
      </div>
   );
}

export default UnicoTabelaCobrancaDados;

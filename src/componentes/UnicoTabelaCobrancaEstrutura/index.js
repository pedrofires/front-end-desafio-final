import "./estilo.css";
import IconeTabelaClientes from "../../imagens/iconeTabelaClientes.svg";
import UnicoTabelaCobrancaDados from "../UnicoTabelaCobrancaDados";
import UnicoCardSemResultado from "../UnicoCardSemResultado";

function UnicoTabelaCobrancaEstrutura({
   cobrancas,
   setModalDetalhe,
   setModalExcluir,
   setInfoCobranca,
   setCobrancas,
   carregarCobrancas,
   reordenarCliente,
}) {
   return (
      <div className="unicoTabelaCobrancaEstrutura">
         <div className="menuTabelaCobranca">
            <div
               className="divTabCobrancaTam03Menu btn-hover"
               onClick={() => reordenarCliente()}
            >
               <img src={IconeTabelaClientes} alt="icone cliente" />
               <p>Cliente</p>
            </div>
            <div
               className="divTabCobrancaTam06Menu btn-hover"
               onClick={() => reordenarCliente()}
            >
               <img src={IconeTabelaClientes} alt="icone cliente" />
               <p>ID Cob.</p>
            </div>
            <div className="divTabCobrancaTam02">
               <p>Valor</p>
            </div>
            <div className="divTabCobrancaTam04">
               <p>Data de venc.</p>
            </div>
            <div className="divTabCobrancaTam02">
               <p>Status</p>
            </div>
            <div className="divTabCobrancaTam05">
               <p>Descrição</p>
            </div>
            <div className="divTabCobrancaTam01"></div>
         </div>
         {!cobrancas[0] && <UnicoCardSemResultado />}
         {cobrancas.map((cobranca) => (
            <UnicoTabelaCobrancaDados
               key={cobranca.id + Math.random()}
               nome={cobranca.nome}
               idCobranca={cobranca.id}
               dadosDaCobranca={cobranca}
               valor={`R$ ${cobranca.valor}`}
               vencimento={cobranca.vencimento}
               status={cobranca.status}
               descricao={cobranca.descricao}
               maisUmaDiv={true}
               setModalDetalhe={setModalDetalhe}
               setModalExcluir={setModalExcluir}
               setInfoCobranca={setInfoCobranca}
               carregarCobrancas={carregarCobrancas}
               setCobrancas={setCobrancas}
            />
         ))}
      </div>
   );
}

export default UnicoTabelaCobrancaEstrutura;

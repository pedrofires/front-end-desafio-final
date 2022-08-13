import "./estilo.css";
import IconeMais from "../../imagens/iconeMais.svg";
import IconeTabelaClientes from "../../imagens/iconeTabelaClientes.svg";
import CardCobranca from "../CardCobranca";

function UnicoCobrancaCliente({
   setModalNovaCobranca,
   modalNovaCobranca,
   cobrancas,
   nomeCliente,
   setCobrancas,
}) {
   return (
      <div className="unicoCobrancaCliente">
         <div className="menuUnicoCobrancaCliente">
            <h1>Cobranças do Cliente</h1>
            <button
               className="btn-hover"
               type="button"
               onClick={() => setModalNovaCobranca(!modalNovaCobranca)}
            >
               <img src={IconeMais} alt="icone editar" />
               Nova Cobrança
            </button>
         </div>
         <div className="menuTabelaCobranca">
            <div className="divTabCobrancaTam06Menu btn-hover">
               <img src={IconeTabelaClientes} alt="icone cliente" />
               <p>ID Cob.</p>
            </div>
            <div className="divTabCobrancaTam06Menu btn-hover">
               <img src={IconeTabelaClientes} alt="icone cliente" />
               <p>Data de venc.</p>
            </div>
            <div className="divTabCobrancaTam02">
               <p>Valor</p>
            </div>
            <div className="divTabCobrancaTam02">
               <p>Status</p>
            </div>
            <div className="divTabCobrancaTam05Mod">
               <p>Descrição</p>
            </div>
            <div className="divTabCobrancaTam01"></div>
         </div>
         {cobrancas.map((cobranca) => (
            <CardCobranca
               key={cobranca.id}
               dadosDacobranca={cobranca}
               idCobranca={cobranca.id}
               valor={`R$ ${cobranca.valor}`}
               vencimento={cobranca.vencimento}
               status={cobranca.status}
               descricao={cobranca.descricao}
               nomeCliente={nomeCliente}
               setCobrancas={setCobrancas}
            />
         ))}
      </div>
   );
}

export default UnicoCobrancaCliente;

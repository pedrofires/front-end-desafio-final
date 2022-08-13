import "./estilo.css";
import IconeFechar from "../../imagens/iconeFechar.svg";
import IconeCobrancas from "../../imagens/iconeCobrancas.svg";
function UnicoCardDetalheCobranca({ setModalDetalhe, infoCobranca }) {
   function fecharClicandoForaDoDetalhe() {
      const clickForaDoModalDetalhe = document.getElementsByClassName(
         "divLivreCardDetalheCobranca"
      );

      if (
         clickForaDoModalDetalhe[0].className === "divLivreCardDetalheCobranca"
      )
         setModalDetalhe(false);
   }

   return (
      <div className="unicoCardDetalheCobranca" id="fora-do-modal-detalhe">
         <div
            className="divLivreCardDetalheCobranca"
            onClick={() => fecharClicandoForaDoDetalhe()}
         ></div>
         <div className="conteudoCardDetalheCobranca" id="modal-detalhe">
            <div className="tituloCardDetalheCobranca">
               <img
                  className="iconeFecharCardDetalheCobranca btn-hover"
                  src={IconeFechar}
                  alt="icone fechar"
                  onClick={() => setModalDetalhe(false)}
               />
               <img
                  className="iconeCobrancaCardDetalheCobranca"
                  src={IconeCobrancas}
                  alt="icone cobrancas"
               />
               <h1>Detalhe da Cobrança</h1>
            </div>
            <div className="conteudoInfoCardDetalheCobranca">
               <div className="conteudoSuperiorCardDetalheCobranca">
                  <h1>Nome</h1>
                  <p>{infoCobranca.nome}</p>
               </div>
               <div className="conteudoSuperiorCardDetalheCobranca">
                  <h1 className="conteudoInfoTituloDescricaoCardDetalheCobranca">
                     Descrição
                  </h1>
                  <p>{infoCobranca.descricao}</p>
               </div>
               <div className="conteudoInferiorCardDetalheCobranca">
                  <div>
                     <h1>Vencimento</h1>
                     <p>{infoCobranca.vencimento}</p>
                  </div>
                  <div>
                     <h1>Valor</h1>
                     <p>{infoCobranca.valor}</p>
                  </div>
               </div>
               <div className="conteudoInferiorCardDetalheCobranca">
                  <div className="conteudoInferiorPCardDetalheCobranca">
                     <h1>ID cobranças</h1>
                     <p>{infoCobranca.id}</p>
                  </div>
                  <div className="conteudoInferiorPCardDetalheCobranca">
                     <h1>Status</h1>
                     <p
                        className={
                           infoCobranca.status === "Vencida"
                              ? "conteudoInferiorPCardDetalheCobrancaStatusVenc"
                              : infoCobranca.status === "Pendente"
                              ? "conteudoInferiorPCardDetalheCobrancaStatusPend"
                              : "conteudoInferiorPCardDetalheCobrancaStatusPago"
                        }
                     >
                        {infoCobranca.status}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default UnicoCardDetalheCobranca;

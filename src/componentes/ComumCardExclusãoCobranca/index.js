import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IconeAlertaExclusaoCobranca from "../../imagens/iconeAlertaExclusaoCobranca.svg";
import IconeDeFechar from "../../imagens/iconeFechar.svg";
import IconeFalha from "../../imagens/toastIconeFalha.svg";
import IconeSucesso from "../../imagens/toastIconeSucesso.svg";
import axios from "../../servicos/api";
import { limparLocalStorage, pegarItem } from "../../utilidades/localStorage";
import "./estilo.css";

function ComumCardExclusaoCobranca({
   setAbrirModalExcluir,
   idCobranca,
   carregarCobrancas,
}) {
   const navegarPara = useNavigate();
   const token = pegarItem("token");

   function clicarForaParaFecharModalExclusao() {
      const clickForaDoModalExclusao = document.getElementsByClassName(
         "divLivreCardExclusaoCobranca"
      );
      if (
         clickForaDoModalExclusao[0].className ===
         "divLivreCardExclusaoCobranca"
      )
         setAbrirModalExcluir(false);
   }

   function feedbackCobrancaDeletada(mensagem) {
      toast.success(mensagem, {
         icon: () => <img src={IconeSucesso} alt="sucesso" />,
         position: "bottom-right",
         autoClose: 4000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: false,
         progress: undefined,
         className: "corDeFundoSucesso",
      });
   }

   function feedbackCobrancaFalha(mensagem) {
      toast.success(mensagem, {
         icon: () => <img src={IconeFalha} alt="falha" />,
         position: "bottom-right",
         autoClose: 4000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: false,
         progress: undefined,
         className: "corDeFundoFalha",
      });
   }

   async function deletarCobranca() {
      try {
         await axios.delete(`/cobrancas/${idCobranca}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         feedbackCobrancaDeletada("Cobrança excluída com sucesso!");
      } catch (error) {
         const dataError = error.response.data;
         if (error.response.status === 406) {
            feedbackCobrancaFalha("Essa cobrança não pode ser excluída!");
         }
         if (error.response.status >= 500) {
            feedbackCobrancaFalha("Oops... Tente mais tarde");
         }

         if (dataError === "jwt expired") {
            feedbackCobrancaFalha("Sua seção expirou");
            limparLocalStorage();
            navegarPara("/login");
         }
      } finally {
         setAbrirModalExcluir(false);
         carregarCobrancas();
      }
   }

   return (
      <div className="comumCardExclusaoCobranca">
         <div
            className="divLivreCardExclusaoCobranca"
            onClick={() => clicarForaParaFecharModalExclusao()}
         ></div>
         <div className="conteudoCardExclusaoCobranca">
            <img
               src={IconeDeFechar}
               alt="icone-de-fechar"
               className="fechar-cancelamento btn-hover"
               onClick={() => setAbrirModalExcluir(false)}
            />
            <img
               src={IconeAlertaExclusaoCobranca}
               alt="icone de alerta para exclusão"
               className="advertencia"
            />
            <h1>Tem certeza que deseja excluir esta cobrança?</h1>

            <div>
               <button
                  onClick={() => setAbrirModalExcluir(false)}
                  className="botaoExclusaoCobrancaNao btn-hover"
               >
                  Não
               </button>
               <button
                  type="submit"
                  onClick={() => deletarCobranca()}
                  className="botaoExclusaoCobrancaSim btn-hover"
               >
                  Sim
               </button>
            </div>
         </div>
      </div>
   );
}

export default ComumCardExclusaoCobranca;

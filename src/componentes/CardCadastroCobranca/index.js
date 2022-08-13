import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IconeCobrancas from "../../imagens/iconeCobrancasCard.svg";
import IconeFechar from "../../imagens/iconeFechar.svg";
import IconeFalha from "../../imagens/toastIconeFalha.svg";
import IconeSucesso from "../../imagens/toastIconeSucesso.svg";
import axios from "../../servicos/api";
import { limparLocalStorage, pegarItem } from "../../utilidades/localStorage";
import "./estilo.css";

function CardCadastroCobranca({
   setModalNovaCobranca,
   id,
   setCobrancas,
   nomeCliente,
   dadosDacobranca,
   funcaoDoModal,
   pagina,
}) {
   const navegarPara = useNavigate();
   const token = pegarItem("token");

   const [statusDoPagamento, setStatusDoPagamento] = useState("Pago");
   const [dadosCadastroCobranca, setDadosCadastroCobranca] = useState({
      id_cliente: id,
      nome: nomeCliente,
      descricao: "",
      status: "",
      valor: "",
      vencimento: "",
   });

   const [nomeErro, setNomeErro] = useState("");
   const [descricaoErro, setDescricaoErro] = useState("");
   const [vencimentoErro, setVencimentoErro] = useState("");
   const [valorErro, setValorErro] = useState("");

   function feedbackCobrancaCadastrada(mensagem) {
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

   function mudarStatusPagamento(e) {
      return setStatusDoPagamento(e.target.value);
   }

   function modificarEstadoCobranca(e) {
      setDadosCadastroCobranca({
         ...dadosCadastroCobranca,
         [e.target.name]: e.target.value,
      });
   }

   async function confirmarCobranca(e) {
      e.preventDefault();

      setNomeErro("");
      setDescricaoErro("");
      setVencimentoErro("");
      setValorErro("");

      if (!dadosCadastroCobranca.nome) {
         setNomeErro("Este campo é obrigatório");
         return;
      }
      if (!dadosCadastroCobranca.descricao) {
         setDescricaoErro("Este campo é obrigatório");
         return;
      }
      if (!dadosCadastroCobranca.vencimento) {
         setVencimentoErro("Este campo é obrigatório");
         return;
      }
      if (!dadosCadastroCobranca.valor) {
         setValorErro("Este campo é obrigatório");
         return;
      }
      if (dadosCadastroCobranca.valor <= 0) {
         setValorErro("Digite um valor válido");
         return;
      }

      if (funcaoDoModal === "editar") {
         editarCobranca();
      } else {
         cadastrarCobranca();
      }
      cancelarCadastro();
      return;
   }

   function mascararValor(e) {
      setDadosCadastroCobranca({
         ...dadosCadastroCobranca,
         valor: (dadosCadastroCobranca.valor / 100).toFixed(2),
      });
   }
   async function editarCobranca() {
      try {
         const cadastroFormatado = { ...dadosCadastroCobranca };
         cadastroFormatado.status = statusDoPagamento;
         cadastroFormatado.valor = cadastroFormatado.valor * 100;

         await axios.put(
            `/cobrancas/${dadosDacobranca.id}`,
            cadastroFormatado,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         if (setCobrancas) {
            carregarCobrancas();
         }

         setModalNovaCobranca(false);
         feedbackCobrancaCadastrada("Cobrança editada com sucesso!");
      } catch (error) {
         const dataError = error.response.data;

         if (dataError !== "jwt expired") {
            feedbackCobrancaFalha("Oops... Tente mais tarde");
         }
         if (dataError === "jwt expired") {
            feedbackCobrancaFalha("Sua seção expirou");
            limparLocalStorage();
            navegarPara("/login");
         }
      }
   }
   async function cadastrarCobranca() {
      try {
         const cadastroFormatado = { ...dadosCadastroCobranca };
         cadastroFormatado.status = statusDoPagamento;
         cadastroFormatado.valor = cadastroFormatado.valor * 100;

         await axios.post("/cobranca", cadastroFormatado, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         if (setCobrancas) {
            carregarCobrancas();
         }

         setModalNovaCobranca(false);
         feedbackCobrancaCadastrada("Cobrança cadastrada com sucesso");
      } catch (error) {
         const dataError = error.response.data;

         if (dataError >= 500) {
            feedbackCobrancaFalha("Oops... Tente mais tarde");
         }
         if (dataError === "jwt expired") {
            feedbackCobrancaFalha("Sua seção expirou");
            limparLocalStorage();
            navegarPara("/login");
         }
      }
   }

   function cancelarCadastro() {
      setDadosCadastroCobranca({
         id_cliente: id,
         nome: "",
         descricao: "",
         status: statusDoPagamento,
         valor: "",
         vencimento: "",
      });
   }

   async function carregarCobrancas() {
      try {
         let cobrancaFormatada = [];
         if (pagina === "cobrancas") {
            const resposta = await axios.get("/cobrancas", {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            cobrancaFormatada = [...resposta.data];
         } else {
            const resposta = await axios.get(`/cobrancas/${id}`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            cobrancaFormatada = [...resposta.data];
         }

         cobrancaFormatada.forEach((element) => {
            const data = element.vencimento
               .substr(0, 10)
               .replace("-", "/")
               .replace("-", "/");
            const dataFormatada = format(new Date(data), "dd/MM/yyyy");
            element.vencimento = dataFormatada;

            const valor = (element.valor / 100).toFixed(2);
            element.valor = valor;
         });

         setCobrancas(cobrancaFormatada);
      } catch (error) {
         const dataError = error.response.data;
         if (dataError !== "jwt expired") {
            feedbackCobrancaFalha("Oops... Tente mais tarde");
         }
         if (dataError === "jwt expired") {
            feedbackCobrancaFalha("Sua seção expirou");
            limparLocalStorage();
            navegarPara("/login");
         }
      }
   }

   useEffect(() => {
      if (funcaoDoModal === "editar") {
         setStatusDoPagamento(
            dadosDacobranca.status === "Vencida" ? "Pendente" : "Pago"
         );
         setDadosCadastroCobranca({
            id_cliente: id,
            nome: nomeCliente,
            descricao: dadosDacobranca.descricao,
            status: dadosDacobranca.status === "Vencida" ? "Pendente" : "Pago",
            valor: dadosDacobranca.valor,
            vencimento: "",
         });
      }
   }, [funcaoDoModal, id, nomeCliente, dadosDacobranca]);

   function clicarForaParaFecharModalCobranca() {
      const clickForaDoModalCobranca =
         document.getElementsByClassName("foraModalCadastro");

      if (clickForaDoModalCobranca[0].className === "foraModalCadastro")
         setModalNovaCobranca(false);
   }

   return (
      <div id="fora-do-modal-cadastro" className="cardCadastroCobrancaModal">
         <div
            className="foraModalCadastro"
            onClick={() => clicarForaParaFecharModalCobranca()}
         ></div>
         <div id="modal-cobranca" className="cardCadastroCobranca">
            <img
               src={IconeFechar}
               alt="icone-de-fechar"
               className="icone-fechar-cadastro btn-hover"
               onClick={() => setModalNovaCobranca(false)}
            />
            <div className="tituloCardCadastroCobranca">
               <img src={IconeCobrancas} alt="icone cobranca" />
               <h1>
                  {funcaoDoModal === "editar"
                     ? "Edição de cobrança"
                     : "Cadastro de cobrança"}
               </h1>
            </div>
            <form className="formcardCadastroCobranca">
               <div className="inputPrimarioCardCadastroCobranca">
                  <label>Nome*</label>
                  <input
                     style={{
                        borderColor: nomeErro ? "#E70000" : "#d0d5dd",
                     }}
                     placeholder="Digite um nome"
                     value={dadosCadastroCobranca.nome}
                     name="nome"
                     onChange={(e) => modificarEstadoCobranca(e)}
                  />
                  {nomeErro && (
                     <span className="campo-de-erro-validacao">{nomeErro}</span>
                  )}
                  <label>Descrição*</label>
                  <textarea
                     style={{
                        borderColor: descricaoErro ? "#E70000" : "#d0d5dd",
                     }}
                     className="inputPrimarioDescricaoCardCadastroCobranca"
                     placeholder="Digite a descrição"
                     value={dadosCadastroCobranca.descricao}
                     name="descricao"
                     onChange={(e) => modificarEstadoCobranca(e)}
                  />
                  {descricaoErro && (
                     <span className="campo-de-erro-validacao">
                        {descricaoErro}
                     </span>
                  )}
               </div>
               <div className="inputSecundarioCardCadastroCobranca">
                  <div className="inputSecundarioDivsCardCadastroCobranca">
                     <label>Vencimento:*</label>
                     <input
                        style={{
                           borderColor: vencimentoErro ? "#E70000" : "#d0d5dd",
                        }}
                        type="date"
                        placeholder="Digite o Vencimento"
                        value={dadosCadastroCobranca.vencimento}
                        name="vencimento"
                        onChange={(e) => modificarEstadoCobranca(e)}
                     />
                     {vencimentoErro && (
                        <span className="campo-de-erro-validacao">
                           {vencimentoErro}
                        </span>
                     )}
                  </div>
                  <div className="inputSecundarioDivsCardCadastroCobranca">
                     <label>Valor:*</label>
                     <input
                        className="valorInput"
                        style={{
                           borderColor: valorErro ? "#E70000" : "#d0d5dd",
                        }}
                        placeholder="Digite o valor"
                        value={dadosCadastroCobranca.valor}
                        onBlur={(e) => mascararValor(e)}
                        name="valor"
                        onChange={(e) => modificarEstadoCobranca(e)}
                     />
                     <p className="cifrao valor">R$</p>
                     {valorErro && (
                        <span className="campo-de-erro-validacao">
                           {valorErro}
                        </span>
                     )}
                  </div>
               </div>
               <div className="inputTerciarioCardCadastroCobranca">
                  <label>Status*</label>
                  <div className="inputTerciarioDivsCardCadastroCobranca">
                     <input
                        className="inputCobrancaChecked"
                        type="radio"
                        checked={statusDoPagamento === "Pago"}
                        value="Pago"
                        onChange={(e) => mudarStatusPagamento(e)}
                        placeholder="Digite o valor"
                     />
                     <p>Cobrança Paga</p>
                  </div>
                  <div className="inputTerciarioDivsCardCadastroCobranca">
                     <input
                        type="radio"
                        checked={statusDoPagamento === "Pendente"}
                        value="Pendente"
                        onChange={(e) => mudarStatusPagamento(e)}
                        placeholder="Digite o valor"
                     />
                     <p>Cobrança Pendente</p>
                  </div>
               </div>

               <div className="buttonCardCadastroCobranca">
                  <button
                     type="button"
                     className="buttonCancelarCardCadastroCobranca btn-hover"
                     onClick={(e) => cancelarCadastro(e)}
                  >
                     Cancelar
                  </button>
                  <button
                     type="button"
                     className="buttonEditarCardCadastroCobranca btn-hover"
                     onClick={(e) => confirmarCobranca(e)}
                  >
                     Aplicar
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default CardCadastroCobranca;

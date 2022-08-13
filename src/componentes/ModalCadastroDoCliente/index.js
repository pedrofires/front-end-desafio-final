import "./estilo.css";
import IconeFechar from "../../imagens/iconeFechar.svg";
import IconeClientes from "../../imagens/iconeClientes.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../servicos/api";
import { pegarItem, limparLocalStorage } from "../../utilidades/localStorage";
import mascarasDeInput from "@nafuzi/brazilian-masks";
import { toast } from "react-toastify";
import IconeFalha from "../../imagens/toastIconeFalha.svg";

function ModalCadastroDoCliente({
   funcaoDoModal,
   abrirCadastroCliente,
   setAbrirCadastroCliente,
   cadastrarCliente,
   editarCliente,
   id,
}) {
   const navegarPara = useNavigate();

   const [erroCadastroNome, setErroCadastroNome] = useState("");
   const [erroCadastroEmail, setErroCadastroEmail] = useState("");
   const [erroCadastroCpf, setErroCadastroCpf] = useState("");
   const [erroCadastroTelefone, setErroCadastroTelefone] = useState("");
   const [erroCadastroCep, setErroCadastroCep] = useState("");

   const token = pegarItem("token");

   const [form, setForm] = useState({
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      logradouro: "",
      complemento: "",
      cep: "",
      bairro: "",
      cidade: "",
      estado: "",
   });

   function handleChangeForm(e) {
      if (e.target.name === "cep" && e.target.value.length > 9) return;
      if (e.target.name === "cpf" && e.target.value.length > 14) return;
      if (e.target.name === "telefone" && e.target.value.length > 15) return;

      if (e.target.name === "cpf") {
         e.target.value = mascarasDeInput.cpf(e.target.value);
      }
      if (e.target.name === "telefone") {
         e.target.value = mascarasDeInput.phone(e.target.value);
      }

      setForm({ ...form, [e.target.name]: e.target.value });
   }

   async function checarCep(e) {
      if (form.cep.length > 0 && form.cep.length < 8) {
         setErroCadastroCep("O cep deve ter 8 dítigos");
         return;
      } else if (form.cep.length === 8) {
         setErroCadastroCep("");
      } else if (form.cep.length === 0) {
         return;
      }
      try {
         let resposta = await fetch(
            `https://viacep.com.br/ws/${form.cep}/json/`
         );
         await resposta.json().then((data) => {
            if (data.cep === undefined) {
               setErroCadastroCep("Cep não foi encontrado");
               return;
            }
            setForm({
               nome: form.nome,
               email: form.email,
               cpf: form.cpf,
               telefone: form.telefone,
               logradouro: data.logradouro,
               complemento: data.complemento,
               cep: data.cep,
               bairro: data.bairro,
               cidade: data.localidade,
               estado: data.uf,
            });
         });
      } catch (error) {
         console.log(error);
      }
   }

   function aplicarCadastro(e) {
      e.preventDefault();

      setErroCadastroNome("");
      setErroCadastroEmail("");
      setErroCadastroCpf("");
      setErroCadastroTelefone("");
      setErroCadastroCep("");

      if (!form.nome) {
         setErroCadastroNome("Campo deve ser preenchido");
         return;
      }

      if (!form.email) {
         setErroCadastroEmail("Campo deve ser preenchido");
         return;
      }

      if (!form.cpf) {
         setErroCadastroCpf("Campo deve ser preenchido");
         return;
      }

      if (form.cpf.length > 0 && form.cpf.length < 11) {
         setErroCadastroCpf("Este campo deve ter 11 dígitos");
         return;
      }

      if (!form.telefone) {
         setErroCadastroTelefone("Campo deve ser preenchido");
         return;
      }

      if (form.telefone.length > 0 && form.telefone.length < 11) {
         setErroCadastroTelefone("Este campo deve ter 11 dígitos");
         return;
      }

      if (form.cep.length > 0 && form.cep.length < 8) {
         setErroCadastroCep("O cep deve ter 8 dítigos");
         return;
      }

      if (funcaoDoModal === "cadastrar") {
         console.log(form);
         cadastrarCliente(form);
      } else if (funcaoDoModal === "editar") {
         editarCliente(form);
      }
      cancelarCadastro();
      setAbrirCadastroCliente(false);
   }

   function cancelarCadastro() {
      setForm({
         nome: "",
         email: "",
         cpf: "",
         telefone: "",
         logradouro: "",
         complemento: "",
         cep: "",
         bairro: "",
         cidade: "",
         estado: "",
      });

      setErroCadastroNome(false);
      setErroCadastroEmail(false);
      setErroCadastroCpf(false);
      setErroCadastroTelefone(false);
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

   useEffect(() => {
      async function preencherFormularioEditar() {
         if (funcaoDoModal === "editar") {
            try {
               const resposta = await axios.get(`/cliente/${id}`, {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               });

               if (!resposta.data.logradouro) resposta.data.logradouro = "";
               if (!resposta.data.complemento) resposta.data.complemento = "";
               if (!resposta.data.cep) resposta.data.cep = "";
               if (!resposta.data.bairro) resposta.data.bairro = "";
               if (!resposta.data.cidade) resposta.data.cidade = "";
               if (!resposta.data.estado) resposta.data.estado = "";

               setForm(resposta.data);
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
      }
      preencherFormularioEditar();
   }, [funcaoDoModal, id, token, navegarPara]);

   function clicarForaParaFecharModalCliente() {
      const clickForaDoModalCliente =
         document.getElementsByClassName("foraDoModalCliente");

      if (clickForaDoModalCliente[0].className === "foraDoModalCliente")
         setAbrirCadastroCliente(false);
   }

   return (
      <>
         {abrirCadastroCliente && (
            <div
               id="fora-do-modal-cliente"
               className="container-modal-cadastro"
            >
               <div
                  className="foraDoModalCliente"
                  onClick={() => clicarForaParaFecharModalCliente()}
               ></div>
               <div id="modal-cliente" className="container-formulario">
                  <img
                     src={IconeFechar}
                     alt="imagem-de-fechar"
                     className="btn-fechar btn-hover"
                     onClick={() => setAbrirCadastroCliente(false)}
                  />
                  <div className="container-titulo-cadastro-cliente">
                     <img src={IconeClientes} alt="icone-cliente" />
                     {funcaoDoModal === "cadastrar" ? (
                        <h1>Cadastro do Cliente</h1>
                     ) : (
                        <h1>Editar Cliente</h1>
                     )}
                  </div>
                  <form className="formularioEditarCliente">
                     <div className="containerInputLongo">
                        <h1>Nome*</h1>
                        <input
                           style={{
                              borderColor: erroCadastroNome
                                 ? "#E70000"
                                 : "#d0d5dd",
                           }}
                           type="text"
                           placeholder="Digite seu nome"
                           name="nome"
                           value={form.nome}
                           onChange={handleChangeForm}
                        />
                        {erroCadastroNome && (
                           <span className="erroCadastro">
                              Este campo deve ser preenchido
                           </span>
                        )}
                        <h1>E-mail*</h1>
                        <input
                           style={{
                              borderColor: erroCadastroEmail
                                 ? "#E70000"
                                 : "#d0d5dd",
                           }}
                           type="email"
                           placeholder="Digite seu e-mail"
                           name="email"
                           value={form.email}
                           onChange={handleChangeForm}
                        />
                        {erroCadastroEmail && (
                           <span className="erroCadastro">
                              {erroCadastroEmail}
                           </span>
                        )}
                     </div>
                     <div className="containerInputMedio containerInputLongoComSpan">
                        <div>
                           <h1>CPF*</h1>
                           <input
                              style={{
                                 borderColor: erroCadastroCpf
                                    ? "#E70000"
                                    : "#d0d5dd",
                              }}
                              type="text"
                              placeholder="Digite seu CPF"
                              name="cpf"
                              value={form.cpf}
                              onChange={handleChangeForm}
                           />
                           {erroCadastroCpf && (
                              <span className="erroCadastro">
                                 {erroCadastroCpf}
                              </span>
                           )}
                        </div>
                        <div>
                           <h1>Telefone*</h1>
                           <input
                              style={{
                                 borderColor: erroCadastroTelefone
                                    ? "#E70000"
                                    : "#d0d5dd",
                              }}
                              type="email"
                              placeholder="Digite seu Telefone"
                              name="telefone"
                              value={form.telefone}
                              onChange={handleChangeForm}
                           />
                           {erroCadastroTelefone && (
                              <span className="erroCadastro">
                                 {erroCadastroTelefone}
                              </span>
                           )}
                        </div>
                     </div>
                     <div className="containerInputLongo">
                        <h1>Endereço</h1>
                        <input
                           type="text"
                           placeholder="Digite o endereço"
                           name="logradouro"
                           value={form.logradouro}
                           onChange={handleChangeForm}
                        ></input>
                        <h1>Complemento</h1>
                        <input
                           type="text"
                           placeholder="Digite o complemento"
                           name="complemento"
                           value={form.complemento}
                           onChange={handleChangeForm}
                        ></input>
                     </div>
                     <div className="containerInputMedio">
                        <div>
                           <h1>CEP</h1>
                           <input
                              style={{
                                 borderColor: erroCadastroCep
                                    ? "#E70000"
                                    : "#d0d5dd",
                              }}
                              type="text"
                              placeholder="Digite CEP"
                              name="cep"
                              value={form.cep}
                              onChange={handleChangeForm}
                              onBlur={checarCep}
                           />
                           {erroCadastroCep && (
                              <span className="erroCadastro">
                                 {erroCadastroCep}
                              </span>
                           )}
                        </div>
                        <div>
                           <h1>Bairro</h1>
                           <input
                              type="text"
                              placeholder="Digite o Bairro"
                              name="bairro"
                              value={form.bairro}
                              onChange={handleChangeForm}
                           ></input>
                        </div>
                     </div>
                     <div className="containerInputVariado">
                        <div>
                           <h1>Cidade</h1>
                           <input
                              type="text"
                              className="inputCidade"
                              placeholder="Digite a Cidade"
                              name="cidade"
                              value={form.cidade}
                              onChange={handleChangeForm}
                           ></input>
                        </div>
                        <div>
                           <h1>UF</h1>
                           <input
                              type="texto"
                              className="inputUf"
                              placeholder="Digite a UF"
                              name="estado"
                              value={form.estado}
                              onChange={handleChangeForm}
                           ></input>
                        </div>
                     </div>
                     <div className="containerBtnCadastro">
                        <button
                           type="button"
                           className="btnCancelarCadastro btn-hover"
                           onClick={() => cancelarCadastro()}
                        >
                           Cancelar
                        </button>
                        <button
                           type="button"
                           className="btnEditarCadastro https://lorem-ipsum-bd.herokuapp.com/cliente btn-hover"
                           onClick={(e) => aplicarCadastro(e)}
                        >
                           Aplicar
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </>
   );
}

export default ModalCadastroDoCliente;

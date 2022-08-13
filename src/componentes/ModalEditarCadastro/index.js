import "./estilo.css";
import IconeFechar from "../../imagens/iconeFechar.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../servicos/api";
import {
   pegarItem,
   adicionarItem,
   limparLocalStorage,
} from "../../utilidades/localStorage.js";
import IconeOlhoFechado from "../../imagens/iconeOlhoFechado.png";
import IconeOlhoAberto from "../../imagens/iconeOlhoAberto.png";
import IconeFalha from "../../imagens/toastIconeFalha.svg";
import mascarasDeInput from "@nafuzi/brazilian-masks";
import { toast } from "react-toastify";

function ModalEditarCadastro({
   setModalEditarCadastro,
   modalEditarCadastro,
   setModalSucesso,
}) {
   const [dadosDoUsuario, setDadosDoUsuario] = useState({
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      senha: "",
   });

   const navegarPara = useNavigate();

   const [confirmarSenha, setConfirmarSenha] = useState("");
   const [erroUsuarioNome, setErroUsuarioNome] = useState(false);
   const [erroUsuarioEmail, setErroUsuarioEmail] = useState(false);
   const [erroUsuarioSenha, setErroUsuarioSenha] = useState(false);
   const [erroUsuarioConfSenha, setErroUsuarioConfSenha] = useState(false);

   const [erroEmailInvalido, setErroEmailInvalido] = useState("");
   const [erroCpfInvalido, setErroCpfInvalido] = useState("");
   const [erroTelefoneInvalido, setErroTelefoneInvalido] = useState("");

   const [mostrarSenha, setMostrarSenha] = useState(false);
   const [mostrarRepetirSenha, setMostrarRepetirSenha] = useState(false);

   const token = pegarItem("token");

   function atualizarEstadoDadoDoUsuario(e) {
      if (e.target.name === "cpf" && e.target.value.length > 14) return;
      if (e.target.name === "telefone" && e.target.value.length > 15) return;

      if (e.target.name === "cpf") {
         e.target.value = mascarasDeInput.cpf(e.target.value);
      }
      if (e.target.name === "telefone") {
         e.target.value = mascarasDeInput.phone(e.target.value);
      }
      setDadosDoUsuario({ ...dadosDoUsuario, [e.target.name]: e.target.value });
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

   function verificarEspacoVazio(campo) {
      const possuiEspacoVazio = campo.includes(" ");
      return possuiEspacoVazio;
   }

   async function editarCadastroUsuario(e) {
      e.preventDefault();

      setErroUsuarioNome(false);
      setErroUsuarioEmail(false);
      setErroUsuarioSenha(false);
      setErroUsuarioConfSenha(false);

      setErroTelefoneInvalido("");
      setErroEmailInvalido("");
      setErroCpfInvalido("");

      if (!dadosDoUsuario.nome) {
         setErroUsuarioNome(true);
         return;
      }

      if (!dadosDoUsuario.email) {
         setErroUsuarioEmail(true);
         return;
      }

      if (!dadosDoUsuario.email.includes("@")) {
         setErroEmailInvalido("Não é um Email válido");
         return;
      }

      if (dadosDoUsuario.cpf.length > 0 && dadosDoUsuario.cpf.length < 11) {
         setErroCpfInvalido("Campo deve ter 11 dígitos");
         return;
      }

      if (
         dadosDoUsuario.telefone.length > 0 &&
         dadosDoUsuario.telefone.length < 11
      ) {
         setErroTelefoneInvalido("Campo deve ter 11 dígitos");
         return;
      }

      if (!dadosDoUsuario.senha) {
         setErroUsuarioSenha("Este campo deve ser preenchido");
         return;
      }

      if (verificarEspacoVazio(dadosDoUsuario.senha)) {
         setErroUsuarioSenha("A senha possui campos vazios");
         return;
      }

      if (!confirmarSenha) {
         setErroUsuarioConfSenha(true);
         return;
      }

      if (dadosDoUsuario.senha !== confirmarSenha) {
         setErroUsuarioConfSenha(true);
         return;
      }

      if (dadosDoUsuario.senha.length < 8) {
         setErroUsuarioSenha("Senha deve ter 8 caracteres");
         return;
      }
      try {
         const usuario = { ...dadosDoUsuario };

         if (!usuario.cpf) usuario.cpf = null;
         if (!usuario.telefone) usuario.telefone = null;

         await axios.put(`/usuario`, usuario, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         adicionarItem("usuarioNome", dadosDoUsuario.nome);
         setModalEditarCadastro(false);
         setModalSucesso(true);
      } catch (error) {
         if (error.response.data.mensagem.includes("usuarios_cpf_key")) {
            setErroCpfInvalido("Este CPF já existe");
         }
         if (error.response.data.mensagem.includes("usuarios_telefone_key")) {
            setErroTelefoneInvalido("Este Telefone já existe");
         }
         if (error.response.data.mensagem.includes("e-mail")) {
            setErroEmailInvalido(error.response.data.mensagem);
         }
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
      async function pegarUsuario() {
         try {
            const resposta = await axios.get(`/usuario`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            const usuario = { ...resposta.data };
            if (!usuario.cpf) usuario.cpf = "";
            if (!usuario.telefone) usuario.telefone = "";
            if (!usuario.senha) usuario.senha = "";

            setDadosDoUsuario(usuario);
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
      pegarUsuario();
   }, [token, navegarPara]);

   function clicarForaParaFechar() {
      const clickForaDoModal = document.getElementsByClassName("fora-do-modal");

      if (clickForaDoModal[0].className === "fora-do-modal")
         setModalEditarCadastro(false);
   }

   return (
      <div id="foraDoModal" className="container-modal">
         <div
            className="fora-do-modal"
            onClick={() => clicarForaParaFechar()}
         ></div>
         <div id="modal" className="containerFormularioCadastroHome">
            <div className="cabecalhoEditarUsuario">
               <img
                  className="btn-hover"
                  src={IconeFechar}
                  alt="imagem-de-fechar"
                  onClick={() => setModalEditarCadastro(!modalEditarCadastro)}
               />
               <h1>Edite seu cadastro</h1>
            </div>
            <form onSubmit={editarCadastroUsuario}>
               <div className="containerLongoUsuario">
                  <div>
                     <h3>Nome*</h3>
                     <input
                        style={{
                           borderColor: erroUsuarioNome ? "#E70000" : "#d0d5dd",
                        }}
                        type="text"
                        placeholder="Digite seu nome"
                        name="nome"
                        value={dadosDoUsuario.nome}
                        onChange={atualizarEstadoDadoDoUsuario}
                     />
                     {erroUsuarioNome && (
                        <span className="errorUsuario">
                           Este campo deve ser preenchido
                        </span>
                     )}
                  </div>
                  <div>
                     <h3>E-mail*</h3>
                     <input
                        style={{
                           borderColor:
                              erroUsuarioEmail || erroEmailInvalido
                                 ? "#E70000"
                                 : "#d0d5dd",
                        }}
                        type="text"
                        placeholder="Digite seu e-mail"
                        name="email"
                        value={dadosDoUsuario.email}
                        onChange={atualizarEstadoDadoDoUsuario}
                     />
                     {erroUsuarioEmail && (
                        <span className="errorUsuario">
                           Este campo deve ser preenchido
                        </span>
                     )}
                     {erroEmailInvalido && (
                        <span className="errorUsuario">
                           {erroEmailInvalido}
                        </span>
                     )}
                  </div>
               </div>
               <div className="containerMedioUsuario">
                  <div>
                     <h3>CPF</h3>
                     <input
                        style={{
                           borderColor: erroCpfInvalido ? "#E70000" : "#d0d5dd",
                        }}
                        type="text"
                        placeholder="Digite seu CPF"
                        name="cpf"
                        value={dadosDoUsuario.cpf}
                        onChange={atualizarEstadoDadoDoUsuario}
                     />
                     {erroCpfInvalido && (
                        <span className="errorUsuario">{erroCpfInvalido}</span>
                     )}
                  </div>
                  <div>
                     <h3>Telefone</h3>
                     <input
                        style={{
                           borderColor: erroTelefoneInvalido
                              ? "#E70000"
                              : "#d0d5dd",
                        }}
                        type="text"
                        placeholder="Digite seu Telefone"
                        name="telefone"
                        value={dadosDoUsuario.telefone}
                        onChange={atualizarEstadoDadoDoUsuario}
                     />
                     {erroTelefoneInvalido && (
                        <span className="errorUsuario">
                           {erroTelefoneInvalido}
                        </span>
                     )}
                  </div>
               </div>
               <div className="containerLongoUsuario">
                  <div className="longoUltimoUsuario">
                     <h3>Senha*</h3>
                     <input
                        style={{
                           borderColor: erroUsuarioSenha
                              ? "#E70000"
                              : "#d0d5dd",
                        }}
                        type={mostrarSenha ? "text" : "password"}
                        placeholder="Digite sua senha"
                        name="senha"
                        value={dadosDoUsuario.senha}
                        onChange={atualizarEstadoDadoDoUsuario}
                     />
                     <img
                        className="olho-senha"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        src={mostrarSenha ? IconeOlhoAberto : IconeOlhoFechado}
                        alt="icone olho"
                     />
                     {erroUsuarioSenha && (
                        <span className="errorUsuario">{erroUsuarioSenha}</span>
                     )}
                  </div>
                  <div className="inputConfirmarSenhaEditarCadastro">
                     <h3>Confirmar Senha*</h3>
                     <input
                        style={{
                           borderColor: erroUsuarioConfSenha
                              ? "#E70000"
                              : "#d0d5dd",
                        }}
                        type={mostrarRepetirSenha ? "text" : "password"}
                        placeholder="Digite sua senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                     />
                     <img
                        className="olho-senha"
                        onClick={() =>
                           setMostrarRepetirSenha(!mostrarRepetirSenha)
                        }
                        src={
                           mostrarRepetirSenha
                              ? IconeOlhoAberto
                              : IconeOlhoFechado
                        }
                        alt="icone olho"
                     />
                     {erroUsuarioConfSenha && (
                        <span className="errorUsuario">
                           As senhas não conferem
                        </span>
                     )}
                  </div>
               </div>
               <div className="botaoAtualizarUsuario">
                  <button className="btn-hover">Aplicar</button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default ModalEditarCadastro;

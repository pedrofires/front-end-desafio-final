import { useState } from "react";
import { Link } from "react-router-dom";
import MensagemCadastroSucesso from "../MensagemCadastroSucesso";
import ProgressoInferior from "../ProgressoInferior";
import axios from "../../servicos/api";
import "./estilo.css";
import IconeOlhoFechado from "../../imagens/iconeOlhoFechado.png";
import IconeOlhoAberto from "../../imagens/iconeOlhoAberto.png";

function InputAdicioneSeusDados({ passo, avancarPassoCadastro }) {
   const [nome, setNome] = useState("");
   const [email, setEmail] = useState("");
   const [senha, setSenha] = useState("");
   const [senhaConferida, setSenhaConferida] = useState("");

   const [senhaInvalida, setSenhaInvalida] = useState("");
   const [senhaDiferentes, setSenhaDiferentes] = useState("");
   const [nomeInvalido, setNomeInvalido] = useState("");
   const [emailInvalido, setEmailInvalido] = useState("");
   const [mostrarSenha, setMostrarSenha] = useState(false);
   const [mostrarRepetirSenha, setMostrarRepetirSenha] = useState(false);

   function verificarEspacoVazio(campo) {
      const possuiEspacoVazio = campo.includes(" ");
      return possuiEspacoVazio;
   }

   async function confirmarCadastro(e) {
      e.preventDefault();
      setSenhaInvalida("");
      setSenhaDiferentes("");

      if (!senha && !senhaConferida) {
         setSenhaInvalida("Campo obrigatório");
         return;
      }

      if (senha.length < 8) {
         setSenhaInvalida("A senha deve conter 8 caracteres ou mais");
         return;
      }

      if (senha !== senhaConferida) {
         setSenhaDiferentes("Senhas não conferem");
         return;
      }

      if (verificarEspacoVazio(senha)) {
         setSenhaInvalida("A senha contém campos vazios");
         return;
      }

      try {
         await axios.post("/usuarios", {
            nome,
            email,
            senha,
         });
         avancarPassoCadastro("tres");
      } catch (error) {
         console.log("Erro:", error);
      }
   }

   function confirmarNomeEmail() {
      setEmailInvalido("");
      setNomeInvalido("");

      if (nome.trim() === "") {
         setNomeInvalido("Campos vazios");
         setNome("");
         return;
      }
      if (!nome) {
         setNomeInvalido("Campo obrigatório");
         return;
      }
      if (!email) {
         setEmailInvalido("Campo obrigatório");
         return;
      }
      if (!email.includes("@")) {
         setEmailInvalido("Digite um email válido");
         return;
      }
      avancarPassoCadastro("dois");
   }

   return (
      <>
         {passo === "um" && (
            <div className="container-adicionar-dados nome-email">
               <h1>Adicione seus dados</h1>
               <form>
                  <label>Nome*</label>
                  <input
                     style={{
                        borderColor: nomeInvalido ? "#E70000" : "#d0d5dd",
                     }}
                     type="text"
                     required="required"
                     placeholder="Digite seu nome"
                     value={nome}
                     onChange={(e) => setNome(e.target.value)}
                  />
                  {nomeInvalido && (
                     <span className="mensagem-erro">{nomeInvalido}</span>
                  )}

                  <label>E-mail*</label>
                  <input
                     style={{
                        borderColor: emailInvalido ? "#E70000" : "#d0d5dd",
                     }}
                     type="email"
                     required="required"
                     placeholder="Digite seu e-mail"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailInvalido && (
                     <span className="mensagem-erro">{emailInvalido}</span>
                  )}

                  <div className="container-continuar">
                     <button
                        className="btn-rosa"
                        type="button"
                        onClick={confirmarNomeEmail}
                     >
                        Continuar
                     </button>
                     <span>
                        Já possui uma conta? Faça seu
                        <Link to="/" className="link-rosa">
                           Login
                        </Link>
                     </span>
                  </div>
               </form>
               <ProgressoInferior passo={passo} />
            </div>
         )}
         {passo === "dois" && (
            <div className="container-adicionar-dados nome-email">
               <h1>Escolha uma senha</h1>
               <form>
                  <img
                     onClick={() => setMostrarSenha(!mostrarSenha)}
                     className="olhoFechadoSenha"
                     src={mostrarSenha ? IconeOlhoAberto : IconeOlhoFechado}
                     alt="icone olho fechado"
                  />
                  <label>Senha*</label>
                  <input
                     style={{
                        borderColor:
                           senhaInvalida || senhaDiferentes
                              ? "#E70000"
                              : "#d0d5dd",
                     }}
                     type={mostrarSenha ? "text" : "password"}
                     placeholder="Digite sua senha"
                     required="required"
                     value={senha}
                     onChange={(e) => setSenha(e.target.value)}
                  />
                  {senhaInvalida && (
                     <span className="mensagem-erro">{senhaInvalida}</span>
                  )}

                  <img
                     onClick={() =>
                        setMostrarRepetirSenha(!mostrarRepetirSenha)
                     }
                     className={
                        senhaInvalida
                           ? "olhoFechadoRepitaSenha fixOlho"
                           : "olhoFechadoRepitaSenha"
                     }
                     src={
                        mostrarRepetirSenha ? IconeOlhoAberto : IconeOlhoFechado
                     }
                     alt="icone olho fechado"
                  />
                  <label>Repita a Senha*</label>
                  <input
                     style={{
                        borderColor: senhaDiferentes ? "#E70000" : "#d0d5dd",
                     }}
                     type={mostrarRepetirSenha ? "text" : "password"}
                     placeholder="Repita sua senha"
                     required="required"
                     value={senhaConferida}
                     onChange={(e) => setSenhaConferida(e.target.value)}
                  />
                  {senhaDiferentes && (
                     <span className="mensagem-erro">{senhaDiferentes}</span>
                  )}
                  <div className="container-continuar">
                     <button
                        className="btn-rosa"
                        type="submit"
                        onClick={(e) => confirmarCadastro(e)}
                     >
                        Entrar
                     </button>
                     <span>
                        Já possui uma conta? Faça seu
                        <Link to="/" className="link-rosa">
                           Login
                        </Link>
                     </span>
                  </div>
               </form>
               <ProgressoInferior passo={passo} />
            </div>
         )}
         {passo === "tres" && (
            <div className="container-adicionar-dados container-sucesso">
               <MensagemCadastroSucesso />
               <ProgressoInferior passo={passo} />
            </div>
         )}
      </>
   );
}

export default InputAdicioneSeusDados;

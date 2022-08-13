import "./estilos.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { adicionarItem } from "../../utilidades/localStorage";
import axios from "../../servicos/api";
import IconeOlhoFechado from "../../imagens/iconeOlhoFechado.png";
import IconeOlhoAberto from "../../imagens/iconeOlhoAberto.png";

function PaginaLogin() {
   const navigateTo = useNavigate();

   const [email, setEmail] = useState("");
   const [senha, setSenha] = useState("");
   const [emailInvalido, setEmailInvalido] = useState(false);
   const [senhaInvalida, setSenhaInvalida] = useState(false);
   const [loginErro, setLoginErro] = useState(false);
   const [mostrarSenha, setMostrarSenha] = useState(false);

   async function manipularEnviar(e) {
      e.preventDefault();
      setEmailInvalido(false);
      setSenhaInvalida(false);
      setLoginErro(false);

      try {
         if (!email) {
            setEmailInvalido(true);
            return;
         }
         if (!senha) {
            setSenhaInvalida(true);
            return;
         }

         const resposta = await axios.post("/login", {
            email,
            senha,
         });

         const { token, usuario } = resposta.data;
         adicionarItem("token", token);
         adicionarItem("usuarioNome", usuario.nome);

         navigateTo("/home");
      } catch (error) {
         setLoginErro(error.response.data.mensagem);
      }
   }

   return (
      <div className="container-login">
         <div className="container-login-imagem">
            <h1>Gerencie todos os pagamentos da sua empresa em um só lugar.</h1>
         </div>
         <div className="container-input-login">
            <h1>Faça seu Login!</h1>
            <form onSubmit={manipularEnviar}>
               <label>Email</label>
               <input
                  style={{
                     borderColor: emailInvalido ? "#E70000" : "#d0d5dd",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Digite seu e-mail"
               />
               {emailInvalido && (
                  <span className="mensagem-erro">Campo Obrigatório</span>
               )}
               {loginErro && (
                  <span className="mensagem-erro">{`${loginErro}`}</span>
               )}

               <div className="container-senha-label">
                  <label>Senha</label>
                  <Link to="/">Esqueceu a senha?</Link>
                  <img
                     onClick={() => setMostrarSenha(!mostrarSenha)}
                     src={mostrarSenha ? IconeOlhoAberto : IconeOlhoFechado}
                     alt="icone olho"
                  />
               </div>
               <input
                  style={{
                     borderColor: senhaInvalida ? "#E70000" : "#d0d5dd",
                  }}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
               />
               {senhaInvalida && (
                  <span className="mensagem-erro">Campo Obrigatório</span>
               )}

               <div className="login-btn-link">
                  <button type="submit" className="btn-rosa">
                     Login
                  </button>
                  <span>
                     Ainda não possui uma conta?{" "}
                     <Link to="/cadastro">Cadastre-se </Link>
                  </span>
               </div>
            </form>
         </div>
      </div>
   );
}

export default PaginaLogin;

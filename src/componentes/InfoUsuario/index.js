import "./estilo.css";
import SetaUsuario from "../../imagens/setaUsuario.svg";
import { useState } from "react";
import ModalSairEditar from "../ModalSairEditar";
import ModalEditarCadastro from "../ModalEditarCadastro";
import MensagemAlteracaoSucesso from "../MensagemAlteracaoSucesso";
import { pegarItem } from "../../utilidades/localStorage.js";

function InfoUsuario() {
   const [modalSair, setModalSair] = useState(false);
   const [modalEditarCadastro, setModalEditarCadastro] = useState(false);
   const [modalSucesso, setModalSucesso] = useState(false);
   const usuarioNome = pegarItem("usuarioNome");

   function abrirModalDeEditarOuSair() {
      setModalSair(!modalSair);
   }

   return (
      <div>
         <div
            className="infoUsuario btn-hover"
            onClick={() => abrirModalDeEditarOuSair()}
         >
            <div className="iniciaisUsuario">
               <h2>{usuarioNome.slice(0, 2)}</h2>
            </div>
            <p>{usuarioNome}</p>
            <img src={SetaUsuario} alt="icone seta" />
            {modalSair && (
               <ModalSairEditar
                  setModalEditarCadastro={setModalEditarCadastro}
                  modalEditarCadastro={modalEditarCadastro}
               />
            )}
         </div>
         {modalEditarCadastro && (
            <ModalEditarCadastro
               setModalEditarCadastro={setModalEditarCadastro}
               modalEditarCadastro={modalEditarCadastro}
               setModalSucesso={setModalSucesso}
            />
         )}
         {modalSucesso && (
            <MensagemAlteracaoSucesso setModalSucesso={setModalSucesso} />
         )}
      </div>
   );
}

export default InfoUsuario;

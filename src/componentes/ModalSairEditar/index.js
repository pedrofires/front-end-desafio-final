import "./estilo.css";
import IconeEditar from "../../imagens/iconeEditar.svg";
import IconeSair from "../../imagens/iconeSair.svg";
import { limparLocalStorage } from "../../utilidades/localStorage";
import { useNavigate } from "react-router-dom";

function ModalSairEditar({ setModalEditarCadastro, modalEditarCadastro }) {
   const navigateTo = useNavigate();

   function realizarLogout() {
      limparLocalStorage();
      navigateTo("/login");
   }

   return (
      <div className="funcoes-do-usuario">
         <div className="modal-sair-editar">
            <div
               className="btn-modal"
               onClick={() => setModalEditarCadastro(!modalEditarCadastro)}
            >
               <img
                  className="btn-editar"
                  src={IconeEditar}
                  alt="botão de editar"
               />
               <p className="editar-texto">Editar</p>
            </div>
            <div className="btn-modal" onClick={() => realizarLogout()}>
               <img
                  className="btn-sair"
                  src={IconeSair}
                  alt="botão de deslogar"
               />
               <p className="sair-texto">Sair</p>
            </div>
         </div>
      </div>
   );
}

export default ModalSairEditar;

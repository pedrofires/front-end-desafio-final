import "./estilo.css";
import IconeSucesso from "../../imagens/iconeSucesso.svg";

function MensagemAlteracaoSucesso({ setModalSucesso }) {
   return (
      <div className="container-modal" onClick={() => setModalSucesso(false)}>
         <div className="container-mensagem-alterado">
            <div className="sucesso-alterado">
               <img src={IconeSucesso} alt="icone-sucesso" />
               <h1>Cadastro Alterado com sucesso!</h1>
            </div>
         </div>
      </div>
   );
}

export default MensagemAlteracaoSucesso;

import "./estilo.css";
import IconeSucesso from "../../imagens/iconeSucesso.svg";
import { Link } from "react-router-dom";

function MensagemCadastroSucesso() {
   return (
      <div className="container-sucesso">
         <div className="container-mensagem">
            <div className="sucesso">
               <img src={IconeSucesso} alt="icone-sucesso" />
               <h1>Cadastro realizado com sucesso!</h1>
            </div>
         </div>
         <button className="btn-rosa btn-ir-para-login">
            <Link to="/login">Ir para Login</Link>
         </button>
      </div>
   );
}

export default MensagemCadastroSucesso;

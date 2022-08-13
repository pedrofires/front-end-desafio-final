import "./estilo.css";
import IconeCadastroConcluido from "../../imagens/iconeCadastroConcluido.svg";
import IconeFecharAzul from "../../imagens/iconeFecharAzul.svg";

function SucessoCadastroConcluido() {
   return (
      <div className="cadastro-concluido">
         <img src={IconeCadastroConcluido} alt="icone-cadastro-concluido" />
         <h3>Cadastro concluído com sucesso</h3>
         <img src={IconeFecharAzul} alt="icone-fechar-azul" />
      </div>
   );
}

export default SucessoCadastroConcluido;

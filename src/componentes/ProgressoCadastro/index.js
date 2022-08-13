import "./estilos.css";
import IconePassoAtual from "../../imagens/passoAtual.svg";
import IconePassoOutro from "../../imagens/passoOutro.svg";
import IconeConcluido from "../../imagens/iconeConcluido.svg";

function ProgressoCadastro({ passo }) {
  return (
    <div className="progresso-vertical">
      <div className="progresso-stepper">
        <div className="progresso-step">
          <div className="progresso-icones">
            <img
              src={passo === "um" ? IconePassoAtual : IconeConcluido}
              alt="icone de progresso"
            />
          </div>
          <div className="progresso-texto">
            <strong className="step-titulo">Cadastre-se</strong>
            <p className="step-dialogo">Por favor, escreva seu nome e e-mail</p>
          </div>
        </div>
        <div className="barra-verde"></div>
        <div className="progresso-step">
          <div className="progresso-icones">
            {passo === "um" && (
              <img src={IconePassoOutro} alt="icone de progresso" />
            )}
            {passo === "dois" && (
              <img src={IconePassoAtual} alt="icone de progresso" />
            )}
            {passo === "tres" && (
              <img src={IconeConcluido} alt="icone de progresso" />
            )}
          </div>
          <div className="progresso-texto">
            <strong className="step-titulo">Escolha uma senha</strong>
            <p className="step-dialogo">Escolha uma senha segura</p>
          </div>
        </div>
        <div className="barra-verde"></div>
        <div className="progresso-step">
          <div className="progresso-icones">
            <img
              src={passo === "tres" ? IconeConcluido : IconePassoOutro}
              alt="icone de progresso"
            />
          </div>
          <div className="progresso-texto">
            <strong className="step-titulo">
              Cadastro realizado com sucesso
            </strong>
            <p className="step-dialogo">
              E-mail e senha cadastrados com sucesso
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressoCadastro;

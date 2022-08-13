import "./estilos.css";

function ProgressoInferior({ passo }) {
  return (
    <div className="container-progresso-inferior">
      <div
        className={"barra-progresso" + (passo === "um" ? " verde" : " ")}
      ></div>
      <div
        className={"barra-progresso" + (passo === "dois" ? " verde" : " ")}
      ></div>
      <div
        className={"barra-progresso" + (passo === "tres" ? " verde" : " ")}
      ></div>
    </div>
  );
}

export default ProgressoInferior;

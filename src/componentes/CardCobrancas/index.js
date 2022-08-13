import "./estilo.css";

function CardCobrancas(props) {
   return (
      <>
         <div className="card" style={{ background: props.color }}>
            <img src={props.icon} alt="icone" />
            <div className="card-texts">
               <h4>{props.titulo}</h4>
               <h3>{props.valor}</h3>
            </div>
         </div>
      </>
   );
}

export default CardCobrancas;

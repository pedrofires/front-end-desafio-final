import { useState } from "react";
import InputAdicioneSeusDados from "../../componentes/InputAdicioneSeusDados";
import ProgressoCadastro from "../../componentes/ProgressoCadastro";
import "./estilos.css";

function CadastroCliente() {
   const [passo, setPasso] = useState("um");

   function avancarPassoCadastro(passo) {
      setPasso(passo);
   }

   return (
      <div className="container-cadastro">
         <div className="container-progresso">
            <ProgressoCadastro passo={passo} />
         </div>

         <div className="container-input">
            <InputAdicioneSeusDados
               passo={passo}
               avancarPassoCadastro={avancarPassoCadastro}
            />
         </div>
      </div>
   );
}

export default CadastroCliente;

import "./estilo.css";
import IconeCobrancaTabela from "../../imagens/iconeCobrancasTabela.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CardCadastroCobranca from "../CardCadastroCobranca";

function DadosClientesTabela({ id, nome, cpf, email, telefone, status }) {
   const navigateTo = useNavigate();
   const [modalNovaCobranca, setModalNovaCobranca] = useState(false);

   return (
      <div className="dadosClientesTabela">
         <div
            className="colunaTabelaTodos"
            onClick={() => navigateTo(`/clientes/${id}`)}
         >
            <p className="dadoClientesTabelaClique btn-hover">{nome}</p>
         </div>
         <div className="colunaTabelaNumero24">
            <p>{cpf}</p>
         </div>
         <div className="colunaTabelaNumero3">
            <p>{email}</p>
         </div>
         <div className="colunaTabelaNumero24">
            <p>{telefone}</p>
         </div>
         <div className="colunaTabelaNumero5 dadoTabelaStatus">
            <p
               className={
                  status === "Inadimplente"
                     ? "dadoTabelaStatusInad"
                     : "dadoTabelaStatusPago"
               }
            >
               {status}
            </p>
         </div>
         <div
            className="colunaTabelaNumero6"
            onClick={() => setModalNovaCobranca(true)}
         >
            <img
               className="btn-hover"
               src={IconeCobrancaTabela}
               alt="icone cobrança tabela"
            />
         </div>
         {modalNovaCobranca && (
            <CardCadastroCobranca
               id={id}
               nomeCliente={nome}
               modalNovaCobranca={modalNovaCobranca}
               setModalNovaCobranca={setModalNovaCobranca}
            />
         )}
      </div>
   );
}

export default DadosClientesTabela;

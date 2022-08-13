import "./estilo.css";
import Cabecalho from "../../componentes/Cabecalho";
import MenuLateral from "../../componentes/MenuLateral";
import MenuClientes from "../../componentes/MenuClientes";
import Cobrancas from "../../imagens/iconeCobrancas.svg";
import axios from "../../servicos/api";
import { limparLocalStorage, pegarItem } from "../../utilidades/localStorage";
import { useNavigate } from "react-router-dom";
import UnicoTabelaCobrancaEstrutura from "../../componentes/UnicoTabelaCobrancaEstrutura";
import UnicoCardDetalheCobranca from "../../componentes/UnicoCardDetalheCobranca";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function PaginaCobrancasListadas({ resumo }) {
   const token = pegarItem("token");
   const navegarPara = useNavigate();

   const [modalDetalhe, setModalDetalhe] = useState(false);
   const [infoCobranca, setInfoCobranca] = useState("");
   const [cobrancas, setCobrancas] = useState([" "]);

   async function cadastrarCobranca(cobranca) {
      try {
         await axios.post("/cobranca", cobranca, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         setCobrancas([...cobrancas, cobranca]);
      } catch (error) {
         const dataError = error.response.data;

         if (dataError === "jwt expired") {
            limparLocalStorage();
            navegarPara("/login");
         }
      }
   }

   async function carregarCobrancas() {
      try {
         const resposta = await axios.get("/cobrancas", {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         const novaLista = resposta.data.filter((cobranca) => {
            if (resumo === "Vencidas") {
               return cobranca.status === "Vencida";
            } else if (resumo === "Pagas") {
               return cobranca.status === "Pago";
            } else {
               return cobranca.status === "Pendente";
            }
         });

         novaLista.forEach((element) => {
            const data = element.vencimento
               .substr(0, 10)
               .replace("-", "/")
               .replace("-", "/");
            const dataFormatada = format(new Date(data), "dd/MM/yyyy");
            element.vencimento = dataFormatada;

            const valor = (element.valor / 100).toFixed(2);
            element.valor = valor;
         });

         setCobrancas(novaLista);
      } catch (error) {
         console.log(error);
         const dataError = error.response.data;

         if (dataError === "jwt expired") {
            limparLocalStorage();
            navegarPara("/login");
         }
      }
   }

   useEffect(() => {
      carregarCobrancas();
   }, [navegarPara, token]);

   return (
      <div className="paginaCobrancasListadas">
         <MenuLateral pagina="home" />
         <main>
            <Cabecalho titulo="Cobranças" pagina="Estilizada" />
            <MenuClientes
               src={Cobrancas}
               titulo={`Cobranças ${resumo}`}
               ativarBotao={false}
               ativarTudo={false}
            />
            <UnicoTabelaCobrancaEstrutura
               cadastrarCobranca={cadastrarCobranca}
               cobrancas={cobrancas}
               setModalDetalhe={setModalDetalhe}
               setInfoCobranca={setInfoCobranca}
               carregarCobrancas={carregarCobrancas}
            />

            {modalDetalhe && (
               <UnicoCardDetalheCobranca
                  setModalDetalhe={setModalDetalhe}
                  infoCobranca={infoCobranca}
               />
            )}
         </main>
      </div>
   );
}

export default PaginaCobrancasListadas;

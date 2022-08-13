import "./estilos.css";
import MenuLateral from "../../componentes/MenuLateral";
import Cabecalho from "../../componentes/Cabecalho";
import CardCobrancas from "../../componentes/CardCobrancas";
import IconePagas from "../../imagens/iconeCobrancasPagas.svg";
import IconeVencidas from "../../imagens/iconeCobrancasVencidas.svg";
import IconePrevistas from "../../imagens/iconeCobrancasPrevistas.svg";
import StatusCliente from "../../componentes/StatusCliente";
import CardCliente from "../../componentes/CardClientes";
import IconeEmDia from "../../imagens/iconeClientesAdimplente.svg";
import IconeInadimplente from "../../imagens/iconeClientesInadimplentes.svg";
import axios from "../../servicos/api";
import { useEffect, useState } from "react";
import { pegarItem, limparLocalStorage } from "../../utilidades/localStorage";
import { useNavigate } from "react-router-dom";
import IconeFalha from "../../imagens/toastIconeFalha.svg";
import { toast } from "react-toastify";

function ResumoCobrancas() {
   const token = pegarItem("token");
   const navegarPara = useNavigate();

   const [resumoCobrancas, setResumoCobrancas] = useState({
      CobrancasPagas: {
         lista: [],
         quantidade: "",
         total: "",
      },
      CobrancasVencidas: {
         lista: [],
         quantidade: "",
         total: "",
      },
      CobrancasPendentes: {
         lista: [],
         quantidade: "",
         total: "",
      },
   });
   const [resumoClientes, setResumoClientes] = useState({
      clientesEmDia: {
         lista: [],
         quantidade: "",
      },
      clientesInadimplentes: {
         lista: [],
         quantidade: "",
      },
   });

   function feedbackCobrancaFalha(mensagem) {
      toast.success(mensagem, {
         icon: () => <img src={IconeFalha} alt="falha" />,
         position: "bottom-right",
         autoClose: 4000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: false,
         progress: undefined,
         className: "corDeFundoFalha",
      });
   }

   useEffect(() => {
      async function trazerResumoDeCobrancas() {
         try {
            const resposta = await axios.get("/resumo/cobrancas", {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            setResumoCobrancas(resposta.data);
         } catch (error) {
            const dataError = error.response.data;
            if (dataError !== "jwt expired") {
               feedbackCobrancaFalha("Oops... Tente mais tarde");
            }
            if (dataError === "jwt expired") {
               feedbackCobrancaFalha("Sua seção expirou");
               limparLocalStorage();
               navegarPara("/login");
            }
         }
      }
      trazerResumoDeCobrancas();

      async function trazerResumoDeClientes() {
         try {
            const resposta = await axios.get("/resumo/clientes", {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            setResumoClientes(resposta.data);
         } catch (error) {
            const dataError = error.response.data;
            if (dataError !== "jwt expired") {
               feedbackCobrancaFalha("Oops... Tente mais tarde");
            }
            if (dataError === "jwt expired") {
               feedbackCobrancaFalha("Sua seção expirou");
               limparLocalStorage();
               navegarPara("/login");
            }
         }
      }
      trazerResumoDeClientes();
   }, [navegarPara, token]);

   return (
      <div className="home">
         <MenuLateral pagina="home" />
         <main>
            <Cabecalho titulo="Resumo das cobranças" pagina="Normal" />
            <div className="conteudoTodosCards">
               <div className="container-cards">
                  <CardCobrancas
                     titulo="Cobranças Pagas"
                     valor={`R$ ${(
                        resumoCobrancas.CobrancasPagas.total / 100
                     ).toFixed(2)}`}
                     color="#EEF7F7"
                     icon={IconePagas}
                  />
                  <CardCobrancas
                     titulo="Cobranças Vencidas"
                     valor={`R$ ${(
                        resumoCobrancas.CobrancasVencidas.total / 100
                     ).toFixed(2)}`}
                     color="#FFEFEF"
                     icon={IconeVencidas}
                  />
                  <CardCobrancas
                     titulo="Cobranças Previstas"
                     valor={`R$ ${(
                        resumoCobrancas.CobrancasPendentes.total / 100
                     ).toFixed(2)}`}
                     color="#FCF6DC"
                     icon={IconePrevistas}
                  />
               </div>
               <div className="container-cards-clientesInfo">
                  <div className="container-card-historico">
                     <CardCliente
                        url="/cobrancas/vencidas"
                        cobrancas={resumoCobrancas.CobrancasVencidas.lista}
                        titulo="Cobranças Vencidas"
                        color="#971D1D"
                        bgcolor="#FFEFEF"
                        quantidade={
                           resumoCobrancas.CobrancasVencidas.quantidade
                        }
                     />
                     <CardCliente
                        url="/cobrancas/previstas"
                        cobrancas={resumoCobrancas.CobrancasPendentes.lista}
                        titulo="Cobranças Previstas"
                        color="#C5A605"
                        bgcolor="#FCF6DC"
                        quantidade={
                           resumoCobrancas.CobrancasPendentes.quantidade
                        }
                     />
                     <CardCliente
                        url="/cobrancas/pagas"
                        cobrancas={resumoCobrancas.CobrancasPagas.lista}
                        titulo="Cobranças Pagas"
                        color="#1FA7AF"
                        bgcolor="#EEF6F6"
                        quantidade={resumoCobrancas.CobrancasPagas.quantidade}
                     />
                  </div>
                  <div className="container-card-status-cliente">
                     <StatusCliente
                        url="/clientes/inadimplentes"
                        clientes={resumoClientes.clientesInadimplentes.lista}
                        titulo="Clientes Inadimplentes"
                        color="#971D1D"
                        bgcolor="#FFEFEF"
                        quantidade={
                           resumoClientes.clientesInadimplentes.quantidade
                        }
                        icon={IconeInadimplente}
                     />
                     <StatusCliente
                        url="/clientes/emdia"
                        clientes={resumoClientes.clientesEmDia.lista}
                        titulo="Clientes em dia"
                        color="#1FA7AF"
                        bgcolor="#EEF6F6"
                        quantidade={resumoClientes.clientesEmDia.quantidade}
                        icon={IconeEmDia}
                     />
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
}

export default ResumoCobrancas;

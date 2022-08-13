import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cabecalho from "../../componentes/Cabecalho";
import MenuClientes from "../../componentes/MenuClientes";
import MenuLateral from "../../componentes/MenuLateral";
import UnicoCardDetalheCobranca from "../../componentes/UnicoCardDetalheCobranca";
import UnicoTabelaCobrancaEstrutura from "../../componentes/UnicoTabelaCobrancaEstrutura";
import Cobrancas from "../../imagens/iconeCobrancas.svg";
import IconeFalha from "../../imagens/toastIconeFalha.svg";
import axios from "../../servicos/api";
import { limparLocalStorage, pegarItem } from "../../utilidades/localStorage";
import "./estilos.css";

function PaginaCobranca() {
   const token = pegarItem("token");
   const navegarPara = useNavigate();

   const [cobrancas, setCobrancas] = useState([" "]);
   const [cobrancasSpread, setCobrancasSpread] = useState([" "]);

   const [modalDetalhe, setModalDetalhe] = useState(false);

   const [infoCobranca, setInfoCobranca] = useState("");

   const [ordenadoPorNome, setOrdenadoPorNome] = useState(false);

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

   async function carregarCobrancas() {
      try {
         const resposta = await axios.get("/cobrancas", {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         const novaLista = [...resposta.data];
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
         setCobrancasSpread(novaLista);
      } catch (error) {
         if (error.message === "Request aborted") {
            return;
         }
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

   useEffect(() => {
      carregarCobrancas();
   }, [navegarPara, token]);

   function reordenarCliente() {
      const cobrancasOrdenadas = [...cobrancas];

      if (!ordenadoPorNome) {
         cobrancasOrdenadas.sort(function (a, b) {
            if (a.nome.toLowerCase() < b.nome.toLowerCase()) {
               return -1;
            }
            if (a.nome.toLowerCase() > b.nome.toLowerCase()) {
               return 1;
            }
            return 0;
         });
         setOrdenadoPorNome(true);
      } else {
         cobrancasOrdenadas.sort(function (a, b) {
            if (a.id < b.id) {
               return -1;
            }
            if (a.id > b.id) {
               return 1;
            }
            return 0;
         });
         setOrdenadoPorNome(false);
      }
      setCobrancas(cobrancasOrdenadas);
      setCobrancasSpread(cobrancasOrdenadas);
   }

   return (
      <div className="paginaCobranca">
         <MenuLateral
            pagina="cobrancas"
            setCobrancas={setCobrancas}
            carregarCobrancas={carregarCobrancas}
            cobrancasSpread={cobrancasSpread}
         />
         <main>
            <Cabecalho titulo="Cobranças" pagina="Estilizada" />
            <MenuClientes
               src={Cobrancas}
               titulo="Cobranças"
               ativarTudo={true}
               cobrancas={cobrancas}
               setCobrancas={setCobrancas}
               cobrancasSpread={cobrancasSpread}
            />

            <UnicoTabelaCobrancaEstrutura
               reordenarCliente={reordenarCliente}
               cadastrarCobranca={cadastrarCobranca}
               cobrancas={cobrancas}
               setModalDetalhe={setModalDetalhe}
               setInfoCobranca={setInfoCobranca}
               carregarCobrancas={carregarCobrancas}
               setCobrancas={setCobrancas}
            />
         </main>
         {modalDetalhe && (
            <UnicoCardDetalheCobranca
               setModalDetalhe={setModalDetalhe}
               infoCobranca={infoCobranca}
            />
         )}
      </div>
   );
}

export default PaginaCobranca;

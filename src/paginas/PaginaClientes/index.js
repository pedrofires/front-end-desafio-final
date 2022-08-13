import mascarasDeInput from "@nafuzi/brazilian-masks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cabecalho from "../../componentes/Cabecalho";
import DadosClientesTabela from "../../componentes/DadosClientesTabela";
import MenuClientes from "../../componentes/MenuClientes";
import MenuClientesTabela from "../../componentes/MenuClientesTabela";
import MenuLateral from "../../componentes/MenuLateral";
import UnicoCardSemResultado from "../../componentes/UnicoCardSemResultado";
import Clientes from "../../imagens/iconeClientes.svg";
import IconeFalha from "../../imagens/toastIconeFalha.svg";
import IconeSucesso from "../../imagens/toastIconeSucesso.svg";
import axios from "../../servicos/api";
import { limparLocalStorage, pegarItem } from "../../utilidades/localStorage";
import "./estilos.css";

function PaginaClientes() {
   const navegarPara = useNavigate();
   const token = pegarItem("token");
   const [clientes, setClientes] = useState([" "]);
   const [clientesSpread, setClientesSpread] = useState([]);
   const [ordenadoPorNome, setOrdenadoPorNome] = useState(false);

   function feedbackCadastroConcluido() {
      toast.success("Cadastro concluído com sucesso!", {
         icon: () => <img src={IconeSucesso} alt="sucesso" />,
         position: "bottom-right",
         autoClose: 4000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: false,
         progress: undefined,
         className: "corDeFundoSucesso",
      });
   }

   function feedbackCadastroFalhou() {
      toast.success("Oops... Tente mais tarde!", {
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

   async function cadastrarCliente(cliente) {
      try {
         const clienteCadastrar = { ...cliente };
         if (!clienteCadastrar.cep) clienteCadastrar.cep = null;

         await axios.post("/cliente", clienteCadastrar, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         feedbackCadastroConcluido();
         carregarClientes();
      } catch (error) {
         feedbackCadastroFalhou();
         const dataError = error.response.data;
         if (dataError !== "jwt expired") {
            feedbackCadastroFalhou("Oops... Tente mais tarde");
         }
         if (dataError === "jwt expired") {
            feedbackCobrancaFalha("Sua seção expirou");
            limparLocalStorage();
            navegarPara("/login");
         }
      }
   }

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

   async function carregarClientes() {
      try {
         const resposta = await axios.get("/clientes", {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         resposta.data.forEach((cliente) => {
            cliente.cpf = mascarasDeInput.cpf(cliente.cpf);
            cliente.telefone = mascarasDeInput.phone(cliente.telefone);
         });
         setClientes(resposta.data);
         setClientesSpread(resposta.data);
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
      carregarClientes();
   }, [navegarPara, token]);

   function reordenarCliente() {
      const clientesOrdenados = [...clientes];

      if (!ordenadoPorNome) {
         clientesOrdenados.sort(function (a, b) {
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
         clientesOrdenados.sort(function (a, b) {
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
      setClientes(clientesOrdenados);
      setClientesSpread(clientesOrdenados);
   }

   return (
      <div className="paginaClientes">
         <MenuLateral
            pagina="clientes"
            clientesSpread={clientesSpread}
            carregarClientes={carregarClientes}
            setClientes={setClientes}
         />
         <main>
            <Cabecalho titulo="Clientes" pagina="Estilizada" />
            <MenuClientes
               src={Clientes}
               titulo="Clientes"
               ativarBotao={true}
               ativarTudo={true}
               cadastrarCliente={cadastrarCliente}
               clientes={clientes}
               setClientes={setClientes}
               clientesSpread={clientesSpread}
            />

            <div className="tabelaClientes">
               <MenuClientesTabela reordenarCliente={reordenarCliente} />
               {!clientes[0] && <UnicoCardSemResultado />}
               {clientes.map((cliente) => (
                  <DadosClientesTabela
                     key={cliente.id + Math.random()}
                     nome={cliente.nome}
                     cpf={cliente.cpf}
                     email={cliente.email}
                     telefone={cliente.telefone}
                     status={cliente.status}
                     id={cliente.id}
                  />
               ))}
            </div>
         </main>
      </div>
   );
}

export default PaginaClientes;

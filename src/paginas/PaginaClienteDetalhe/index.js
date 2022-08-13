import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cabecalho from "../../componentes/Cabecalho";
import CardCadastroCobranca from "../../componentes/CardCadastroCobranca";
import MenuClientes from "../../componentes/MenuClientes";
import MenuLateral from "../../componentes/MenuLateral";
import ModalCadastroDoCliente from "../../componentes/ModalCadastroDoCliente";
import UnicoCobrancaCliente from "../../componentes/UnicoCobrancaCliente";
import UnicoDadosCliente from "../../componentes/UnicoDadosCliente";
import IconeCliente from "../../imagens/iconeClientes.svg";
import axios from "../../servicos/api";
import { pegarItem, limparLocalStorage } from "../../utilidades/localStorage";
import "./estilos.css";
import IconeFalha from "../../imagens/toastIconeFalha.svg";
import IconeSucesso from "../../imagens/toastIconeSucesso.svg";
import { toast } from "react-toastify";

function PaginaClienteDetalhe() {
   const { id } = useParams();
   const token = pegarItem("token");
   const navegarPara = useNavigate();

   const [abrirCadastroCliente, setAbrirCadastroCliente] = useState(false);
   const [modalNovaCobranca, setModalNovaCobranca] = useState(false);

   const [cliente, setCliente] = useState({
      nome: "teste",
      email: "teste",
      telefone: "teste",
      cpf: "teste",
      logradouro: "teste",
      cep: "teste",
      complemento: "teste",
      bairro: "teste",
      cidade: "teste",
      estado: "ts",
   });
   const [cobrancas, setCobrancas] = useState([]);

   function feedbackClienteEditado(mensagem) {
      toast.success(mensagem, {
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

   function feedbackClienteFalha(mensagem) {
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

   async function editarCliente(clienteEditado) {
      const cliente = { ...clienteEditado };
      if (!cliente.cep) cliente.cep = null;

      try {
         await axios.put(`/cliente/${id}`, cliente, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         setCliente(cliente);
         feedbackClienteEditado("Edições do cadastro concluídas com sucesso!");
      } catch (error) {
         const dataError = error.response.data;
         if (dataError !== "jwt expired")
            feedbackClienteFalha("Oops... Tente mais tarde");

         if (dataError === "jwt expired") {
            feedbackClienteFalha("Sua seção expirou");
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

   useEffect(() => {
      async function carregarCliente() {
         try {
            const resposta = await axios.get(`/cliente/${id}`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            setCliente(resposta.data);
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
      carregarCliente();
      async function carregarCobrancasDoCliente(idCliente) {
         try {
            const resposta = await axios.get(`/cobrancas/${idCliente}`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            const cobrancaFormatada = [...resposta.data];

            cobrancaFormatada.forEach((element) => {
               const data = element.vencimento
                  .substr(0, 10)
                  .replace("-", "/")
                  .replace("-", "/");
               const dataFormatada = format(new Date(data), "dd/MM/yyyy");
               element.vencimento = dataFormatada;

               const valor = (element.valor / 100).toFixed(2);
               element.valor = valor;
            });

            setCobrancas(resposta.data);
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
      carregarCobrancasDoCliente(id);
   }, [id, token, navegarPara]);

   return (
      <div className="paginaClienteDetalhe">
         <MenuLateral pagina="clientes" />
         <main>
            <Cabecalho titulo="Clientes" pagina="Estilizada" detalhes={true} />
            <MenuClientes src={IconeCliente} titulo={cliente.nome} />

            <UnicoDadosCliente
               cliente={cliente}
               abrirCadastroCliente={abrirCadastroCliente}
               setAbrirCadastroCliente={setAbrirCadastroCliente}
            />
            <UnicoCobrancaCliente
               nomeCliente={cliente.nome}
               cobrancas={cobrancas}
               setCobrancas={setCobrancas}
               setModalNovaCobranca={setModalNovaCobranca}
               modalNovaCobranca={modalNovaCobranca}
            />
         </main>
         {abrirCadastroCliente && (
            <ModalCadastroDoCliente
               funcaoDoModal="editar"
               editarCliente={editarCliente}
               abrirCadastroCliente={abrirCadastroCliente}
               setAbrirCadastroCliente={setAbrirCadastroCliente}
               id={id}
            />
         )}
         {modalNovaCobranca && (
            <CardCadastroCobranca
               id={id}
               nomeCliente={cliente.nome}
               setCobrancas={setCobrancas}
               modalNovaCobranca={modalNovaCobranca}
               setModalNovaCobranca={setModalNovaCobranca}
            />
         )}
      </div>
   );
}

export default PaginaClienteDetalhe;

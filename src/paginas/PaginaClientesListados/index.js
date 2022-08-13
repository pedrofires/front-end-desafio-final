import "./estilo.css";
import Cabecalho from "../../componentes/Cabecalho";
import MenuLateral from "../../componentes/MenuLateral";
import MenuClientes from "../../componentes/MenuClientes";
import Clientes from "../../imagens/iconeClientes.svg";
import axios from "../../servicos/api";
import { limparLocalStorage, pegarItem } from "../../utilidades/localStorage";
import mascarasDeInput from "@nafuzi/brazilian-masks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuClientesTabela from "../../componentes/MenuClientesTabela";
import DadosClientesTabela from "../../componentes/DadosClientesTabela";

function PaginaClientesListados({ resumo }) {
   const token = pegarItem("token");
   const navegarPara = useNavigate();

   const [clientes, setClientes] = useState([" "]);

   useEffect(() => {
      async function carregarClientes() {
         try {
            const resposta = await axios.get("/clientes", {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            const novaLista = resposta.data.filter((cliente) => {
               if (resumo === "Inadimplentes") {
                  return cliente.status === "Inadimplente";
               } else {
                  return cliente.status !== "Inadimplente";
               }
            });

            novaLista.forEach((cliente) => {
               cliente.cpf = mascarasDeInput.cpf(cliente.cpf);
               cliente.telefone = mascarasDeInput.phone(cliente.telefone);
            });

            setClientes(novaLista);
         } catch (error) {
            const dataError = error.response.data;

            if (dataError === "jwt expired") {
               limparLocalStorage();
               navegarPara("/login");
            }
         }
      }
      carregarClientes();
   }, [navegarPara, token, resumo]);

   return (
      <div className="paginaClientesListados">
         <MenuLateral pagina="home" />
         <main>
            <Cabecalho titulo="Clientes" pagina="Estilizada" />
            <MenuClientes
               src={Clientes}
               titulo={`Clientes ${resumo}`}
               ativarBotao={false}
               ativarTudo={false}
            />

            <div className="tabelaClientes">
               <MenuClientesTabela />
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

export default PaginaClientesListados;

import "./estilo.css";
import IconeFiltro from "../../imagens/iconeFiltro.svg";
import IconeLupa from "../../imagens/iconeLupa.svg";
import IconeMais from "../../imagens/iconeMais.svg";
import ModalCadastroDoCliente from "../ModalCadastroDoCliente/index.js";
import { useState } from "react";

function MenuClientes(props) {
   const [abrirCadastroCliente, setAbrirCadastroCliente] = useState(false);
   const [pesquisa, setPesquisa] = useState("");

   function confirmarEnter(e) {
      if (e.keyCode === 13 && props.titulo === "Clientes") {
         pesquisarPagCliente();
      } else if (e.keyCode === 13 && props.titulo !== "Clientes") {
         pesquisarPagCobranca();
      } else return;
   }

   function pesquisarPagCliente() {
      if (pesquisa === "") {
         props.setClientes(props.clientesSpread);
      } else {
         const novaLista = props.clientes.filter((cliente) => {
            return (
               cliente.email === pesquisa ||
               cliente.nome.toLowerCase().trim() ===
                  pesquisa.toLocaleLowerCase().trim() ||
               cliente.cpf === pesquisa
            );
         });
         if (!novaLista[0]) {
            props.setClientes(novaLista);
         } else {
            props.setClientes(novaLista);
         }
      }

      setPesquisa("");
   }

   function pesquisarPagCobranca() {
      if (pesquisa === "") {
         props.setCobrancas(props.cobrancasSpread);
      } else {
         const novaLista = props.cobrancas.filter((cobranca) => {
            return (
               cobranca.id === Number(pesquisa) ||
               cobranca.nome.toLowerCase().trim() ===
                  pesquisa.toLocaleLowerCase().trim()
            );
         });
         if (!novaLista[0]) {
            props.setCobrancas(novaLista);
         } else {
            props.setCobrancas(novaLista);
         }
      }

      setPesquisa("");
   }

   return (
      <div className="menuClientes">
         <div className="menuClientesEsquerda">
            <img src={props.src} alt="icone clientes" />
            <h1>{props.titulo}</h1>
         </div>
         {props.ativarTudo && (
            <div className="menuClientesDireita">
               {props.ativarBotao && (
                  <button
                     className="btn-hover"
                     onClick={() => setAbrirCadastroCliente(true)}
                  >
                     <img src={IconeMais} alt="icone Mais" />
                     Adicionar Cliente
                  </button>
               )}

               <div className="menuClientesDireitaDiv">
                  <img
                     className="iconeFiltro btn-hover"
                     src={IconeFiltro}
                     alt="icone filtro"
                  />
                  <input
                     placeholder="Pesquisa"
                     type="text"
                     name="pesquisa"
                     value={pesquisa}
                     onChange={(e) => setPesquisa(e.target.value)}
                     onKeyDown={(e) => confirmarEnter(e)}
                  />
                  <img
                     className="iconeLupa btn-hover"
                     src={IconeLupa}
                     alt="icone lupa"
                     onClick={
                        props.titulo === "Clientes"
                           ? () => pesquisarPagCliente()
                           : () => pesquisarPagCobranca()
                     }
                  />
               </div>
            </div>
         )}
         <ModalCadastroDoCliente
            funcaoDoModal="cadastrar"
            abrirCadastroCliente={abrirCadastroCliente}
            setAbrirCadastroCliente={setAbrirCadastroCliente}
            cadastrarCliente={props.cadastrarCliente}
         />
      </div>
   );
}

export default MenuClientes;

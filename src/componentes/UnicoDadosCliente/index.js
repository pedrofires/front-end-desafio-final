import "./estilo.css";
import IconeBotaoDadosCliente from "../../imagens/iconeBotaoDadosCliente.svg";

function UnicoDadosCliente({
   setAbrirCadastroCliente,
   abrirCadastroCliente,
   cliente,
}) {
   return (
      <div className="unicoDadosCliente">
         <div className="menuUnicoDadosCliente">
            <h1>Dados do Cliente</h1>
            <button
               className="btn-hover"
               type="button"
               onClick={() => setAbrirCadastroCliente(!abrirCadastroCliente)}
            >
               <img src={IconeBotaoDadosCliente} alt="icone editar" />
               Editar Cliente
            </button>
         </div>

         <div className="conteudoDadosUnicoDadosCliente">
            <div className="dadosUnicoDadosCliente">
               <div className="dadosUnicoDadosClienteTam04">
                  <h1>E-mail</h1>
                  <p>{cliente.email}</p>
               </div>
               <div className="dadosUnicoDadosClienteTam03">
                  <h1>Telefone</h1>
                  <p>{cliente.telefone}</p>
               </div>
               <div className="dadosUnicoDadosClienteTam03">
                  <h1>CPF</h1>
                  <p>{cliente.cpf}</p>
               </div>
               <div className="dadosUnicoDadosClienteTam03"></div>
               <div className="dadosUnicoDadosClienteTam02"></div>
               <div className="dadosUnicoDadosClienteTam01"></div>
            </div>
            <div className="dadosUnicoDadosCliente">
               <div className="dadosUnicoDadosClienteTam04">
                  <h1>Endereço</h1>
                  <p>{cliente.logradouro}</p>
               </div>
               <div className="dadosUnicoDadosClienteTam03">
                  <h1>Bairro</h1>
                  <p>{cliente.bairro}</p>
               </div>
               <div className="dadosUnicoDadosClienteTam03">
                  <h1>Complemento</h1>
                  <p>{cliente.complemento}</p>
               </div>
               <div className="dadosUnicoDadosClienteTam03">
                  <h1>CEP</h1>
                  <p>{cliente.cep}</p>
               </div>
               <div className="dadosUnicoDadosClienteTam02">
                  <h1>Cidade</h1>
                  <p>{cliente.cidade}</p>
               </div>
               <div className="dadosUnicoDadosClienteTam01">
                  <h1>UF</h1>
                  <p>{cliente.estado}</p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default UnicoDadosCliente;

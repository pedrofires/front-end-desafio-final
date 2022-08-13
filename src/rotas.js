import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import CadastroCliente from "./paginas/CadastroCliente";
import PaginaLogin from "./paginas/PaginaLogin";
import ResumoCobrancas from "./paginas/ResumoCobrancas";
import { pegarItem } from "./utilidades/localStorage";
import PaginaClientes from "./paginas/PaginaClientes";
import PaginaCobranca from "./paginas/PaginaCobranca";
import PaginaClienteDetalhe from "./paginas/PaginaClienteDetalhe";
import PaginaCobrancasListadas from "./paginas/PaginaCobrancasListadas";
import PaginaClientesListados from "./paginas/PaginaClientesListados";

function RotaProtegida({ redirecionarPara }) {
   let autenticacao = pegarItem("token");

   return autenticacao ? <Outlet /> : <Navigate to={redirecionarPara} />;
}

function RotasPrincipais() {
   return (
      <Routes>
         <Route
            path="*"
            element={
               <h1
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     justifyContent: "center",
                     height: "100vh",
                  }}
               >
                  {`(╯°□°）╯︵ ┻━┻ 
                     Essa página não existe!`}
               </h1>
            }
         ></Route>
         <Route path="/">
            <Route path="/" element={<PaginaLogin />}></Route>
            <Route path="/login" element={<PaginaLogin />}></Route>
         </Route>
         <Route path="/cadastro" element={<CadastroCliente />}></Route>
         <Route element={<RotaProtegida redirecionarPara={"/login"} />}>
            <Route path="/home" element={<ResumoCobrancas />} />
            <Route
               path="/cobrancas/vencidas"
               element={<PaginaCobrancasListadas resumo="Vencidas" />}
            />
            <Route
               path="/cobrancas/previstas"
               element={<PaginaCobrancasListadas resumo="Previstas" />}
            />
            <Route
               path="/cobrancas/pagas"
               element={<PaginaCobrancasListadas resumo="Pagas" />}
            />
            <Route
               path="/clientes/inadimplentes"
               element={<PaginaClientesListados resumo="Inadimplentes" />}
            />
            <Route
               path="/clientes/emdia"
               element={<PaginaClientesListados resumo="Em Dia" />}
            />
            <Route path="/clientes" element={<PaginaClientes />} />
            <Route path="/clientes/:id" element={<PaginaClienteDetalhe />} />
            <Route path="/cobrancas" element={<PaginaCobranca />} />
         </Route>
      </Routes>
   );
}

export default RotasPrincipais;

import { Route, Routes as Switch, HashRouter } from "react-router-dom";
import { AlterarSenha, CadastrarMedicos, Cadastro, ListarAgendamentos, Login, RecuperarAcesso, ListarMedicos, BemVindo, CadastrarPacientes, ListarPacientes, EditarPacientes, EditarAgendamentos } from "../paginas";
import { AuthProvider } from "../paginas/autenticar/UseAuth";
import { CadastrarAgendamentos } from "../paginas/agendamentos/CadastrarAgendamentos";
import { EditarMedicos } from "../paginas/medicos/EditarMedicos";
export const Rotas = () => {
    return (
        <AuthProvider>
        <HashRouter>
            <Switch>
                <Route path="/agendamentos" element={<ListarAgendamentos />} />
                <Route path="/pacientes" element={<ListarPacientes/>} />
                <Route path="/home" element={<BemVindo/>} />
                <Route path="/cadastrar" element={<Cadastro />} />
                <Route path="/cadastrarPaciente" element={<CadastrarPacientes/>} />
                <Route path="/recuperar" element={<RecuperarAcesso />} />
                <Route path="/alterar" element={< AlterarSenha/>} />
                <Route path="/cadastrarMedico" element={<CadastrarMedicos />} />
                <Route path="/cadastrarAgendamento" element={<CadastrarAgendamentos/>} />
                <Route path="/medicos" element={<ListarMedicos/>} />
                <Route path="/" element={<Login />} />
                <Route path="/editarMedicos" element={<EditarMedicos />} />
                <Route path="/editarPacientes" element={<EditarPacientes/>} />
                <Route path="/editarAgendamentos" element={<EditarAgendamentos/>} />
                
            </Switch>
        </HashRouter>
        </AuthProvider>
    );
}
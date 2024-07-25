import { Route, Routes as Switch, Navigate, HashRouter } from "react-router-dom";
import { AlterarSenha, Cadastro, Login, RecuperarAcesso } from "../paginas";
export const Rotas = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastrar" element={<Cadastro />} />
                <Route path="/recuperar" element={<RecuperarAcesso />} />
                <Route path="/alterar" element={< AlterarSenha/>} />
                <Route path="/" element={<Login />} />
                
            </Switch>
        </HashRouter>
    );
}
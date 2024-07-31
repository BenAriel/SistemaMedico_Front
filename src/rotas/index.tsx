import React, { ReactNode } from 'react';
import { Route, Routes as Switch, HashRouter, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlterarSenha, CadastrarMedicos, Cadastro, ListarAgendamentos, Login, RecuperarAcesso, ListarMedicos, BemVindo, CadastrarPacientes, ListarPacientes, EditarPacientes, EditarAgendamentos } from "../paginas";
import { AuthProvider } from "../paginas/autenticar/UseAuth";
import { CadastrarAgendamentos } from "../paginas/agendamentos/CadastrarAgendamentos";
import { EditarMedicos } from "../paginas/medicos/EditarMedicos";

const pageVariants = {
    initial: {
        opacity: 0,
        x: "-100vw"
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            type: "tween",
            ease: "anticipate",
            duration: 0.6
        }
    },
    exit: {
        opacity: 0,
        x: "100vw",
        transition: {
            type: "tween",
            ease: "anticipate",
            duration: 0.6
        }
    }
};

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Switch location={location} key={location.pathname}>
                <Route path="/agendamentos" element={<MotionWrapper><ListarAgendamentos /></MotionWrapper>} />
                <Route path="/pacientes" element={<MotionWrapper><ListarPacientes /></MotionWrapper>} />
                <Route path="/home" element={<MotionWrapper><BemVindo /></MotionWrapper>} />
                <Route path="/cadastrar" element={<MotionWrapper><Cadastro /></MotionWrapper>} />
                <Route path="/cadastrarPaciente" element={<MotionWrapper><CadastrarPacientes /></MotionWrapper>} />
                <Route path="/recuperar" element={<MotionWrapper><RecuperarAcesso /></MotionWrapper>} />
                <Route path="/alterar" element={<MotionWrapper><AlterarSenha /></MotionWrapper>} />
                <Route path="/cadastrarMedico" element={<MotionWrapper><CadastrarMedicos /></MotionWrapper>} />
                <Route path="/cadastrarAgendamento" element={<MotionWrapper><CadastrarAgendamentos /></MotionWrapper>} />
                <Route path="/medicos" element={<MotionWrapper><ListarMedicos /></MotionWrapper>} />
                <Route path="/" element={<MotionWrapper><Login /></MotionWrapper>} />
                <Route path="/editarMedicos" element={<MotionWrapper><EditarMedicos /></MotionWrapper>} />
                <Route path="/editarPacientes" element={<MotionWrapper><EditarPacientes /></MotionWrapper>} />
                <Route path="/editarAgendamentos" element={<MotionWrapper><EditarAgendamentos /></MotionWrapper>} />
            </Switch>
        </AnimatePresence>
    );
};

interface MotionWrapperProps {
    children: ReactNode;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({ children }) => (
    <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
    >
        {children}
    </motion.div>
);

export const Rotas: React.FC = () => {
    return (
        <AuthProvider>
            <HashRouter>
                <AnimatedRoutes />
            </HashRouter>
        </AuthProvider>
    );
}

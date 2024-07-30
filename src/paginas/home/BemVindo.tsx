import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from "../agendamentos/componentes/Bar";
import { Header } from "../agendamentos/componentes/Header";
import oitavaRosado from '../../imagens/oitava_rosado_logo.png';
import IMGpessoa from '../../imagens/pessoa.png';
import { UseAuth } from '../autenticar/UseAuth';

export const BemVindo: React.FC = () => {
  const location = useLocation();
  const { user } = UseAuth();

  return (
    <div>
      <Header nome={user || 'Usuário'} img={IMGpessoa} />
      <Bar img={oitavaRosado} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <img
          src={oitavaRosado}
          alt="Bem-vindo"
          className="w-1/4 h-auto mb-8"
        />
        <h1 className="text-2xl font-bold mb-2">Seja bem-vindo(a) ao sistema da Clínica Oitava Rosado</h1>
        <p className="text-base text-gray-600 mb-16">Navegue pelos itens no menu para ter acesso às funcionalidades</p>
        <div className="absolute bottom-4 right-4 text-xs text-gray-500 space-y-1">
          <p>Feedback</p>
          <p>Contato de Suporte</p>
          <p>Suporte</p>
        </div>
      </div>
    </div>
  );
};

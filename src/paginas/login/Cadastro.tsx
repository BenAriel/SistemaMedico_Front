import { RetanguloVerde } from './componentes/RetanguloVerde';
import { Botao } from './componentes/Botao';
import { useState } from 'react';

export const Cadastro = () => {
  const [novoUser, setNovoUser] = useState({
    name: '',
    email: '',
    senha: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setNovoUser((prevUser) => {
        const updatedUser = {
          ...prevUser,
          [id]: value
        };
        console.log(updatedUser);
        return updatedUser;
      });
    }
  };

  const handleOnClick = async () => {
    // Validação básica
    if (!novoUser.name || !novoUser.email || !novoUser.senha) {
      alert('Todos os campos são obrigatórios.');
      return;
    }
  
    if (novoUser.senha !== confirmPassword) {
      console.error('As senhas não coincidem');
      alert('As senhas não coincidem.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/cadastrarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: novoUser.name, // Certifique-se de que os nomes dos campos estão corretos
          email: novoUser.email,
          senha: novoUser.senha
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro: ${response.status} - ${errorData.message}`);
      }
  
      const data = await response.json();
      console.log('Usuário cadastrado com sucesso:', data);
      alert('Usuário cadastrado com sucesso.');
  
    } catch (error: any) {
      console.error('Houve um problema com a requisição:', error.message);
      alert('Houve um problema com a requisição: ' + error.message);
    }
  };
  

  return (
    <div className="flex h-screen justify-center items-center p-1">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden m-2 min-h-[500px]">
        <RetanguloVerde />
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-5">
          <h1 className="text-[#0F8982] text-2xl mb-2">Criar conta</h1>
          <p className="text-gray-600 text-sm mb-4">Preencha as informações abaixo para criar uma nova conta no sistema.</p>
          <form className="flex flex-col w-full px-8">
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                className="p-2 border border-gray-300 rounded w-full bg-gray-200"
                value={novoUser.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block">E-mail</label>
              <input
                type="text"
                id="email"
                name="email"
                className="p-2 border border-gray-300 rounded w-full bg-gray-200"
                value={novoUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="senha" className="mb-2 block">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                className="p-2 border border-gray-300 rounded w-full bg-gray-200"
                value={novoUser.senha}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="mb-2 block">Confirme a senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="p-2 border border-gray-300 rounded w-full bg-gray-200"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
            <Botao texto="Finalizar cadastro" handleOnClick={handleOnClick} />
          </form>
        </div>
      </div>
    </div>
  );
};

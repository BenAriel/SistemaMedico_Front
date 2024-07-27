import { RetanguloVerde } from './componentes/RetanguloVerde';
import { useState } from 'react';
import { Botao } from './componentes/Botao';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleOnClick = () => {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Login failed');
      })
      .then((data) => {
        console.log('Login successful:', data);
        navigate('/cadastrar');
      })
      .catch((error) => {
        console.error('Error during login:', error);
        alert('Login failed');
      });
  };

  return (
    <div className="flex h-screen justify-center items-center p-1">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden m-2 min-h-[500px]">
        <RetanguloVerde />
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-5">
          <h1 className="text-[#0F8982] text-2xl mb-2">Acessar Conta</h1>
          <p className="text-gray-600 text-sm mb-4">
            Bem-vindo(a)! Por favor, digite suas credenciais para ter acesso ao sistema.
          </p>
          <form className="flex flex-col w-full px-8">
            <div className="mb-4">
              <label htmlFor="username" className="mb-2 block">
                Usuário
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="p-2 border border-gray-300 rounded w-full bg-gray-200"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="mb-2 block">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="p-2 border border-gray-300 rounded w-full bg-gray-200"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Botao texto="Entrar na conta" handleOnClick={handleOnClick} />
          </form>
        </div>
      </div>
    </div>
  );
};

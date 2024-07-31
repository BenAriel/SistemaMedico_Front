import { RetanguloVerde } from './componentes/RetanguloVerde';
import { useState } from 'react';
import { Botao } from './componentes/Botao';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../autenticar/UseAuth';

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [errors, setErrors] = useState({ email: '', senha: '', general: '' });
  const navigate = useNavigate();
  const { setUser } = UseAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
      general: '',
    }));
  };

  const handleOnClick = async () => {
    const newErrors = { email: '', senha: '', general: '' };
    let hasError = false;

    if (!formData.email) {
      newErrors.email = 'O campo não pode ser vazio';
      hasError = true;
    }

    if (!formData.senha) {
      newErrors.senha = 'O campo não pode ser vazio';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      setUser(data.nome);
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: 'Usuário ou senha incorretos',
      }));
    }
  };

  const handleEsqueceuSenha = async () => {
    if (!formData.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'O campo não pode ser vazio',
      }));
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/recuperarSenha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      alert('Código de recuperação enviado para o email');
      navigate('/recuperar', { state: { email: formData.email } });
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: error.message.includes('não cadastrada') ? 'Não é possível recuperar acesso de conta não cadastrada' : '',
        general: error.message,
      }));
    }
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
          <form onSubmit={e => e.preventDefault()} className="flex flex-col w-full px-8">
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block">
                Usuário
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full bg-gray-200`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="senha" className="mb-2 block">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                className={`p-2 border ${errors.senha ? 'border-red-500' : 'border-gray-300'} rounded w-full bg-gray-200`}
                value={formData.senha}
                onChange={handleChange}
              />
              {errors.senha && <p className="text-red-500 text-xs mt-1">{errors.senha}</p>}
            </div>
            {errors.general && <p className="text-red-500 text-xs mb-4">{errors.general}</p>}
            <Botao texto="Entrar na conta" handleOnClick={handleOnClick} />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleEsqueceuSenha}
                className="text-xs text-red-500 hover:underline"
              >
                Esqueceu sua senha?
              </button>
              <button
                onClick={() => navigate('/cadastrar')}
                className="text-xs text-green-500 hover:underline"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

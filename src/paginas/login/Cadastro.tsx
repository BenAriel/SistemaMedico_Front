import { RetanguloVerde } from './componentes/RetanguloVerde';
import { Botao } from './componentes/Botao';
import { useState } from 'react';
import validator from 'validator';
import { UseAuth } from '../autenticar/UseAuth';
import { useNavigate } from 'react-router-dom';

export const Cadastro = () => {
  const navigate = useNavigate();
  const { setUser } = UseAuth();
  const [novoUser, setNovoUser] = useState({
    name: '',
    email: '',
    senha: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    senha: '',
    confirmPassword: '',
    general: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'confirmPassword') {
      setConfirmPassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: '',
        general: ''
      }));
    } else {
      setNovoUser((prevUser) => ({
        ...prevUser,
        [id]: value
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: '',
        general: ''
      }));
    }
  };
  const handleSair = () => {
    navigate('/');
 }

  const handleOnClick = async () => {
    const newErrors = { name: '', email: '', senha: '', confirmPassword: '', general: '' };
    let hasError = false;

    if (!novoUser.name) {
      newErrors.name = 'O campo não pode ser vazio';
      hasError = true;
    }
    if (!novoUser.email) {
      newErrors.email = 'O campo não pode ser vazio';
      hasError = true;
    } else if (!validator.isEmail(novoUser.email)) {
      newErrors.email = 'Email não é válido';
      hasError = true;
    }
    if (!novoUser.senha) {
      newErrors.senha = 'O campo não pode ser vazio';
      hasError = true;
    }
    if (novoUser.senha !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/cadastrarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: novoUser.name,
          email: novoUser.email,
          senha: novoUser.senha
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 409) {
          newErrors.general = 'Email já está cadastrado';
        } else {
          newErrors.general = `Erro: ${response.status} - ${errorData.mensagem || 'Erro desconhecido'}`;
        }
        throw new Error(newErrors.general);
      }

      const data = await response.json();
      console.log('Usuário cadastrado com sucesso:', data);
      alert('Usuário cadastrado com sucesso.');
      setUser(data.nome);
      navigate('/home');

    } catch (error: any) {
      console.error('Houve um problema com a requisição:', error.message);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message
      }));
    }
  };

  return (
    <div className="flex h-screen justify-center items-center p-1">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden m-2 min-h-[500px]">
        <RetanguloVerde />
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-5">
          <h1 className="text-[#0F8982] text-2xl mb-2">Criar conta</h1>
          <p className="text-gray-600 text-sm mb-4">Preencha as informações abaixo para criar uma nova conta no sistema.</p>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col w-full px-8">
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full bg-gray-200`}
                value={novoUser.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block">E-mail</label>
              <input
                type="text"
                id="email"
                name="email"
                className={`p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full bg-gray-200`}
                value={novoUser.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="senha" className="mb-2 block">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                className={`p-2 border ${errors.senha ? 'border-red-500' : 'border-gray-300'} rounded w-full bg-gray-200`}
                value={novoUser.senha}
                onChange={handleChange}
              />
              {errors.senha && <p className="text-red-500 text-xs mt-1">{errors.senha}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="mb-2 block">Confirme a senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded w-full bg-gray-200`}
                value={confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            {errors.general && <p className="text-red-500 text-xs mb-4">{errors.general}</p>}
            <Botao texto="Criar conta" handleOnClick={handleOnClick} />
            <button
                onClick={handleSair}
                className="text-xs text-red-500 hover:underline"
              >cancelar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

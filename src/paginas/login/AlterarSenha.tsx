import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RetanguloVerde } from './componentes/RetanguloVerde';
import { Botao } from './componentes/Botao';

export const AlterarSenha = () => {
  const [formData, setFormData] = useState({ novaSenha: '', confirmeSenha: '' });
  const [errors, setErrors] = useState({ novaSenha: '', confirmeSenha: '', general: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; 

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
  const handleSair = () => {
    navigate('/');
 }

  const handleOnClick = async () => {
    const newErrors = { novaSenha: '', confirmeSenha: '', general: '' };
    let hasError = false;

    if (!formData.novaSenha) {
      newErrors.novaSenha = 'O campo não pode ser vazio';
      hasError = true;
    }

    if (!formData.confirmeSenha) {
      newErrors.confirmeSenha = 'O campo não pode ser vazio';
      hasError = true;
    }

    if (formData.novaSenha !== formData.confirmeSenha) {
      newErrors.confirmeSenha = 'As senhas não coincidem';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/alterarSenha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, novaSenha: formData.novaSenha }),
      });

      if (!response.ok) {
        throw new Error('Erro ao alterar senha');
      }

      alert('Senha alterada com sucesso!');
      navigate('/');
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: 'Erro ao alterar senha',
      }));
    }
  };

  return (
    <div className="flex h-screen justify-center items-center p-1">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden m-2 min-h-[500px]">
        <RetanguloVerde />
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-5">
          <h1 className="text-[#0F8982] text-2xl mb-2">Alterar Senha</h1>
          <p className="text-gray-600 text-sm mb-4">
            Informe a nova senha e confirme para alterar o acesso à sua conta.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col w-full px-8">
            <div className="mb-4">
              <label htmlFor="novaSenha" className="mb-2 block">
                Nova Senha
              </label>
              <input
                type="password"
                id="novaSenha"
                name="novaSenha"
                className={`p-2 border ${errors.novaSenha ? 'border-red-500' : 'border-gray-300'} rounded w-full bg-gray-200`}
                value={formData.novaSenha}
                onChange={handleChange}
              />
              {errors.novaSenha && <p className="text-red-500 text-xs mt-1">{errors.novaSenha}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmeSenha" className="mb-2 block">
                Confirme Nova Senha
              </label>
              <input
                type="password"
                id="confirmeSenha"
                name="confirmeSenha"
                className={`p-2 border ${errors.confirmeSenha ? 'border-red-500' : 'border-gray-300'} rounded w-full bg-gray-200`}
                value={formData.confirmeSenha}
                onChange={handleChange}
              />
              {errors.confirmeSenha && <p className="text-red-500 text-xs mt-1">{errors.confirmeSenha}</p>}
            </div>
            {errors.general && <p className="text-red-500 text-xs mb-4">{errors.general}</p>}
            <Botao texto="Alterar Senha" handleOnClick={handleOnClick} />
            <button
                onClick={handleSair}
                className="text-xs text-red-500 hover:underline"
    
              > cancelar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

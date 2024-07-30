import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RetanguloVerde } from './componentes/RetanguloVerde';
import { Botao } from './componentes/Botao';

export const RecuperarAcesso = () => {
  const [formData, setFormData] = useState({ codigo: '' });
  const [errors, setErrors] = useState({ codigo: '', general: '' });
  const navigate = useNavigate();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => { 
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

  const handleOnClick = () => {
    const newErrors = { codigo: '', general: '' };
    let hasError = false;

    if (!formData.codigo) {
      newErrors.codigo = 'O campo não pode ser vazio';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const codigoEsperado = '123456'; // Substitua pelo método de verificação do código de recuperação
    if (formData.codigo === codigoEsperado) {
      navigate('/alterar');
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        codigo: 'Código incorreto',
      }));
    }
  };

  return (
    <div className="flex h-screen justify-center items-center p-1">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden m-2 min-h-[500px]">
        <RetanguloVerde />
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-5">
          <h1 className="text-[#0F8982] text-2xl mb-2">Recuperar Acesso</h1>
          <p className="text-gray-600 text-sm mb-4">
            Informe o código de recuperação enviado para seu email e recupere o acesso à sua conta.
          </p>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col w-full px-8">
            <div className="mb-4">
              <label htmlFor="codigo" className="mb-2 block">
                Código de recuperação
              </label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                className={`p-2 border ${errors.codigo ? 'border-red-500' : 'border-gray-300'} rounded w-full bg-gray-200`}
                value={formData.codigo}
                onChange={handleChange}
              />
              {errors.codigo && <p className="text-red-500 text-xs mt-1">{errors.codigo}</p>}
            </div>
            {errors.general && <p className="text-red-500 text-xs mb-4">{errors.general}</p>}
            <Botao texto="Verificar" handleOnClick={handleOnClick} />
          </form>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Botao } from './Botao';

interface RetanguloBrancoProps {
  titulo: string;
  descricao?: string;
  fields: { id: string; label: string; type: string }[];
  tituloBotao: string;
  handleOnClick: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: { [key: string]: string };
}

export const RetanguloBranco: React.FC<RetanguloBrancoProps> = ({
  titulo,
  descricao,
  fields,
  tituloBotao,
  handleOnClick,
  handleChange,
  values
}) => {
  return (
    <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-5">
      <h1 className="text-[#0F8982] text-2xl mb-2">{titulo}</h1>
      {descricao && <p className="text-gray-600 text-sm mb-4">{descricao}</p>}
      <form className="flex flex-col w-full px-8">
        {fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="mb-2 block">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              className="p-2 border border-gray-300 rounded w-full bg-gray-200"
              value={values[field.id]}
              onChange={handleChange}
            />
          </div>
        ))}
        <Botao texto={tituloBotao} handleOnClick={handleOnClick} />
      </form>
    </div>
  );
};

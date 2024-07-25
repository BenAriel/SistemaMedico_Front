import React from 'react';

interface BotaoProps {
  texto: string;
  handleOnClick?: () => void;
}

export const Botao: React.FC<BotaoProps> = ({ texto,handleOnClick }) => {
  return (
    <button className="bg-[#0F8982] text-white py-2 px-4 rounded" onClick={handleOnClick}>
      {texto}
    </button>
  );
};



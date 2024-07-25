import React from 'react';
import oitavaLogo from '../../../imagens/oitava_rosado_logo.png';

interface RetanguloVerdeProps {
  imageSrc: string;
}

export const RetanguloVerde = () => {
  return (
    <div className="w-full md:w-1/2 bg-[#0F8982] flex justify-center items-center p-4">
      <img src={oitavaLogo} alt="Centered" className="max-w-full max-h-full m-2 sm:m-4 md:m-6 lg:m-8" />
    </div>
  );
};

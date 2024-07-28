import React, { useState } from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';

export const Bar: React.FC<{ img: string }> = ({ img }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-width duration-300 ${isOpen ? 'w-32' : 'w-16'}`}>
      <div className="flex items-center justify-center h-16">
        <img
          src={img}
          alt="Menu"
          className="w-12 h-12 cursor-pointer"
          onClick={togglebar}
        />
      </div>
      <nav className={`flex flex-col items-${isOpen ? 'start' : 'center'} mt-4 space-y-4`}>
        {isOpen && (
          <>
            <NavItem text="módulo-cadastros" />
            <NavItem text="usuarios" />
            <NavItem text="medicos" />
            <NavItem text="pacientes" />
            <NavItem text="agendamentos" />
          </>
        )}
      </nav>
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center mb-4">
        <a href="#" className="flex items-center text-gray-600 hover:text-[#089B93]">
          <FaSignOutAlt className="mr-2" />
          {isOpen && <span>Sair</span>}
        </a>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ text: string }> = ({ text }) => (
  <a href="#" className="text-black hover:text-[#089B93] px-4 py-2">
    {text}
  </a>
);

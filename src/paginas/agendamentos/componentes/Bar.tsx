import React, { useState } from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const Bar: React.FC<{ img: string }> = ({ img }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-width duration-300 ${isOpen ? 'w-32' : 'w-16'}`}>
      <div className="flex items-center justify-center h-16">
        <img
          src={img}
          alt="Menu"
          className="w-12 h-12 cursor-pointer"
          onClick={toggleBar}
        />
      </div>
      <nav className={`flex flex-col items-${isOpen ? 'start' : 'center'} mt-4 space-y-4`}>
        {isOpen && (
          <>
            <NavItem text="módulo-cadastros" action={() => navigate('/home')} />
            <NavItem text="usuarios" action={() => {}} />
            <NavItem text="medicos" action={() => navigate('/medicos')} />
            <NavItem text="pacientes" action={() => navigate('/pacientes')} />
            <NavItem text="agendamentos" action={() => navigate('/agendamentos')} />
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

const NavItem: React.FC<{ text: string; action: () => void }> = ({ text, action }) => (
  <a onClick={action} className="cursor-pointer text-black hover:text-[#089B93] px-4 py-2">
    {text}
  </a>
);

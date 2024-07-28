import React, { useState, useEffect, useRef } from 'react';
import { FaUserPlus, FaBars, FaEnvelope } from 'react-icons/fa';

export const Header: React.FC<{ nome: string, img: string }> = ({ nome, img }) => {
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const popupsRef = useRef<HTMLDivElement>(null);

  const togglePopup = (icon: string) => {
    setShowPopup(showPopup === icon ? null : icon);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupsRef.current && !popupsRef.current.contains(event.target as Node)) {
      setShowPopup(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#089B93] p-4 flex justify-end items-center">
      <div className="flex items-center space-x-4" ref={popupsRef}>
        <FaUserPlus
          className="text-white cursor-pointer"
          onClick={() => togglePopup('addUser')}
        />
        {showPopup === 'addUser' && (
          <div className="absolute bg-white p-2 rounded shadow-md mt-12">
            Add User Popup
          </div>
        )}
        <FaBars
          className="text-white cursor-pointer"
          onClick={() => togglePopup('menu')}
        />
        {showPopup === 'menu' && (
          <div className="absolute bg-white p-2 rounded shadow-md mt-12">
            Menu Popup
          </div>
        )}
        <div className="border-l border-white h-8 mx-4"></div>
        <FaEnvelope
          className="text-white cursor-pointer"
          onClick={() => togglePopup('email')}
        />
        {showPopup === 'email' && (
          <div className="absolute bg-white p-2 rounded shadow-md mt-12">
            Email Popup
          </div>
        )}
        <div className="border-l border-white h-8 mx-4"></div>
        <div className="text-right mr-4">
          <p className="text-white">Olá, {nome}</p>
          <p className="text-white text-sm">Clínica Oitava-Rosado</p>
        </div>
        <img
          src={img}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
      </div>
    </header>
  );
};

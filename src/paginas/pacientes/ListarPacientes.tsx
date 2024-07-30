import React, { useEffect, useState } from "react";
import { Tabela } from "../agendamentos/componentes/Tabela";
import { Header } from "../agendamentos/componentes/Header";
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import IMGpessoa from '../../imagens/pessoa.png';
import oitavaRosado from '../../imagens/oitava_rosado_logo.png';
import { Bar } from "../agendamentos/componentes/Bar";
import { UseAuth } from "../autenticar/UseAuth";
import { useNavigate } from 'react-router-dom';

export const ListarPacientes = () => {
  const { user } = UseAuth();
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [colunas, setColunas] = useState<GridColDef[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = () => {
    fetch('http://localhost:8080/listarPacientes')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((paciente: any) => ({
          id: paciente.id,
          nomeCompleto: paciente.nomeCompleto,
          cpf: paciente.cpf,
          telefone: paciente.telefone,
          sexo: paciente.sexo,
          dataNascimento: paciente.dataNascimento,
          observacoes: paciente.observacoes || "",
        }));
        setPacientes(formattedData);
        setColunas([
          { field: 'nomeCompleto', headerName: 'Nome', flex: 1 },
          { field: 'cpf', headerName: 'CPF', flex: 1 },
          { field: 'telefone', headerName: 'Telefone', flex: 1 },
          { field: 'sexo', headerName: 'Sexo', flex: 1 },
          { field: 'dataNascimento', headerName: 'Data de Nascimento', flex: 1 },
          { field: 'observacoes', headerName: 'Observações', flex: 1 },
          {
            field: 'acao',
            headerName: 'Ação',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
              <div className="space-x-2">
                <button
                  className="bg-white text-black border border-black px-1 rounded-md hover:bg-gray-100"
                  onClick={() => handleEdit(params.row)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white border border-red-500 px-1 rounded-md hover:bg-red-600 opacity-90"
                  onClick={() => handleDelete(params.row.id)}
                >
                  Excluir
                </button>
              </div>
            ),
          }
        ]);
      });
  };

  const handleEdit = async (row: any) => {
    try{
    const response = await fetch(`http://localhost:8080/paciente/${row.id}`);
    
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    
    const pacienteCompleto = await response.json();
    
    if (pacienteCompleto) {
      console.log(pacienteCompleto);
      navigate(`/editarPacientes`, { state: { paciente: pacienteCompleto } });
    } else {
      alert('Paciente não encontrado.');
    }
  }catch(error: any) {
    console.error('Houve um problema com a requisição:', error.message);
    alert('Houve um problema com a requisição: ' + error.message);
  }
    
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8080/deletarPaciente/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setPacientes(prevPacientes => prevPacientes.filter(paciente => paciente.id !== id));
        alert('Paciente deletado com sucesso.');
      } else {
        alert('Erro ao deletar paciente.');
      }
    })
    .catch(error => {
      console.error('Houve um problema com a requisição:', error.message);
      alert('Houve um problema com a requisição: ' + error.message);
    });
  };

  const handleNovoPaciente = () => {
    navigate('/cadastrarPaciente');
  };

  return (
    <div>
      <Header nome={user || "usuario"} img={IMGpessoa} />
      <div className="bg-[#0F8982] w-full py-20 flex justify-between items-center ">
        <div className="ml-4">
          <h1 className="text-white text-xl ml-20">Pacientes</h1>
          <p className="text-white text-sm ml-20">Gerencie com eficiência e segurança os dados do sistema</p>
        </div>
        <div className="flex space-x-4 mr-4">
          <button
            className="bg-white text-[#0F8982] px-4 py-2 rounded"
            onClick={handleNovoPaciente}
          >
            Cadastrar Novo Paciente
          </button>
        </div>
      </div>
      <Bar img={oitavaRosado} />
      <div className="ml-11 mr-5 mb-2">
        {colunas.length > 0 && pacientes.length > 0 && (
          <Tabela columns={colunas} rows={pacientes} colunaPesquisa="cpf" />
        )}
      </div>
    </div>
  );
};

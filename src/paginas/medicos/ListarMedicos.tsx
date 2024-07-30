import React, { useEffect, useState } from "react";
import { Tabela } from "../../paginas/agendamentos/componentes/Tabela";
import { Header } from "../../paginas/agendamentos/componentes/Header";
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import IMGpessoa from '../../imagens/pessoa.png';
import oitavaRosado from '../../imagens/oitava_rosado_logo.png';
import { Bar } from "../../paginas/agendamentos/componentes/Bar";
import { UseAuth } from "../autenticar/UseAuth";
import { useNavigate } from 'react-router-dom';

export const ListarMedicos = () => {
  const { user } = UseAuth();
  const [medicos, setMedicos] = useState<any[]>([]);
  const [colunas, setColunas] = useState<GridColDef[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicos();
  }, []);

  const fetchMedicos = () => {
    fetch('http://localhost:8080/listarMedicos')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((medico: any) => ({
          id: medico.id,
          nomeCompleto: medico.nomeCompleto,
          executor: medico.executor ? 'Sim' : 'Não',
          conselho: medico.conselhoMedico,
          numeroConselho: medico.numeroConselho,
          cbo: medico.cbo,
          uf: medico.ufConselho,
        }));
        setMedicos(formattedData);
        setColunas([
          { field: 'nomeCompleto', headerName: 'Nome Completo', flex: 1 },
          { field: 'id', headerName: 'ID', flex: 1 },
          { field: 'executor', headerName: 'Executor', flex: 1 },
          { field: 'conselho', headerName: 'Conselho', flex: 1 },
          { field: 'numeroConselho', headerName: 'Número Conselho', flex: 1 },
          { field: 'cbo', headerName: 'CBO', flex: 1 },
          { field: 'uf', headerName: 'UF', flex: 1 },
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
    try {
      const response = await fetch(`http://localhost:8080/medico/${row.id}`);
      
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      
      const medicoCompleto = await response.json();
      
      if (medicoCompleto) {
        console.log(medicoCompleto);
        navigate(`/editarMedicos`, { state: { medico: medicoCompleto } });
      } else {
        console.log('Médico não encontrado.');
        alert('Médico não encontrado.');
      }
    } catch (error: any) {
      console.error('Houve um problema com a requisição:', error.message);
      alert('Houve um problema com a requisição: ' + error.message);
    }
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8080/deletarMedico/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setMedicos(prevMedicos => prevMedicos.filter(medico => medico.id !== id));
        alert('Médico deletado com sucesso.');
      } else {
        alert('Erro ao deletar médico.');
      }
    })
    .catch(error => {
      console.error('Houve um problema com a requisição:', error.message);
      alert('Houve um problema com a requisição: ' + error.message);
    });
  };
  
  const handleNovoMedico = (executor: boolean) => {
    navigate('/cadastrarMedico', { state: { executor } });
  };
  return (
    <div>
      <Header nome={user || "usuario"} img={IMGpessoa} />
      <div className="bg-[#0F8982] w-full py-20 flex justify-between items-center ">
        <div className="ml-4">
          <h1 className="text-white text-xl ml-20">Médicos</h1>
          <p className="text-white text-sm ml-20">Gerencie com eficiência e segurança os dados do sistema</p>
        </div>
        <div className="flex space-x-4 mr-4">
          <button
            className="bg-white text-[#0F8982] px-4 py-2 rounded"
            onClick={() => handleNovoMedico(false)}
          >
            Novo Médico Solicitante
          </button>
          <button
            className="bg-white text-[#0F8982] px-4 py-2 rounded"
            onClick={() => handleNovoMedico(true)}
          >
            Novo Médico Executante
          </button>
        </div>
      </div>
      <Bar img={oitavaRosado} />
      <div className="ml-11 mr-5 mb-2">
        {colunas.length > 0 && medicos.length > 0 && (
          <Tabela columns={colunas} rows={medicos} colunaPesquisa="numeroConselho" />
        )}
      </div>
    </div>
  );
};

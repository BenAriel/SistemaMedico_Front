import React, { useEffect, useState } from "react";
import { Tabela } from "./componentes/Tabela";
import { Header } from "./componentes/Header";
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import IMGpessoa from '../../imagens/pessoa.png';
import oitavaRosado from '../../imagens/oitava_rosado_logo.png';
import { Bar } from "./componentes/Bar";
import { UseAuth } from "../autenticar/UseAuth";
import { useNavigate } from 'react-router-dom';

export const ListarAgendamentos = () => {
  const { user } = UseAuth();
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [colunas, setColunas] = useState<GridColDef[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = () => {
    fetch('http://localhost:8080/listarAgendamentos')
        .then(response => response.json())
        .then(data => {
            const formattedData = data.map((agendamento: any) => ({
                id: agendamento.id,
                medico: agendamento.medico ? `${agendamento.medico.nomeCompleto} - ${agendamento.medico.ufConselho}${agendamento.medico.numeroConselho}` : 'N/A',
                paciente: agendamento.paciente ? `${agendamento.paciente.nomeCompleto} - ${agendamento.paciente.id}` : 'N/A',
                dataHora: `${agendamento.dataConsulta} ${agendamento.horaConsulta}`,
                observacoes: agendamento.observacoes,
            }));
            setAgendamentos(formattedData);
            setColunas([
                { field: 'medico', headerName: 'Médico-crm', flex: 1 },
                { field: 'paciente', headerName: 'Paciente-id', flex: 1 },
                { field: 'dataHora', headerName: 'Data e Hora', flex: 1 },
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
        })
        .catch(error => {
            console.error('Erro ao buscar agendamentos:', error);
            alert('Houve um problema com a requisição: ' + error.message);
        });
};

  const handleEdit = async (row: any) => {
    try {
      const response = await fetch(`http://localhost:8080/agendamento/${row.id}`);
      
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      
      const agendamentoCompleto = await response.json();
      
      if (agendamentoCompleto) {
        console.log(agendamentoCompleto);
        navigate(`/editarAgendamentos`, { state: { agendamento: agendamentoCompleto } });
      } else {
        alert('Agendamento não encontrado.');
      }
    } catch (error: any) {
      console.error('Houve um problema com a requisição:', error.message);
      alert('Houve um problema com a requisição: ' + error.message);
    }
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8080/deletarAgendamento/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setAgendamentos(prevAgendamentos => prevAgendamentos.filter(agendamento => agendamento.id !== id));
        alert('Agendamento deletado com sucesso.');
      } else {
        alert('Erro ao deletar agendamento.');
      }
    })
    .catch(error => {
      console.error('Houve um problema com a requisição:', error.message);
      alert('Houve um problema com a requisição: ' + error.message);
    });
  };

  const handleNovoAgendamento = () => {
    navigate('/cadastrarAgendamento');
  };

  return (
    <div>
      <Header nome={user || "usuario"} img={IMGpessoa} />
      <div className="bg-[#0F8982] w-full py-20 flex justify-between items-center ">
        <div className="ml-4">
          <h1 className="text-white text-xl ml-20">Agendamentos</h1>
          <p className="text-white text-sm ml-20">Gerencie com eficiência e segurança os dados do sistema</p>
        </div>
        <div className="flex space-x-4 mr-4">
          <button
            className="bg-white text-[#0F8982] px-4 py-2 rounded"
            onClick={handleNovoAgendamento}
          >
            Cadastrar Novo Agendamento
          </button>
        </div>
      </div>
      <Bar img={oitavaRosado} />
      <div className="ml-11 mr-5 mb-2">
        {colunas.length > 0 && agendamentos.length > 0 && (
          <Tabela columns={colunas} rows={agendamentos} colunaPesquisa="dataHora" />
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Tabela } from "./componentes/Tabela";
import { Header } from "./componentes/Header";
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import IMGpessoa from '../../imagens/pessoa.png';
import oitavaRosado from '../../imagens/oitava_rosado_logo.png';
import { Bar } from "./componentes/Bar";

export const ListarAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [colunas, setColunas] = useState<GridColDef[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/listarAgendamentos')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const sampleData = data[0];
          const dynamicColumns: GridColDef[] = Object.keys(sampleData).map((key, index) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            flex: 1,
          }));
          dynamicColumns.push({
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
                  onClick={() => handleDelete(params.row)}
                >
                  Excluir
                </button>
              </div>
            )
          });
          setColunas(dynamicColumns);
          setAgendamentos(data);
        }
      });
  }, []);

  const handleEdit = (row: any) => {
    // Lógica para editar o agendamento
    console.log("Editando:", row);
  };

  const handleDelete = (row: any) => {
    // Lógica para excluir o agendamento
    console.log("Excluindo:", row);
  };

  return (
    <div>
      <Header nome="ariel" img={IMGpessoa} />
      <Bar img={oitavaRosado} />
      <div className="ml-11  mr-5 mt-5 mb-2">
        {colunas.length > 0 && agendamentos.length > 0 && (
          <Tabela columns={colunas} rows={agendamentos} />
        )}
      </div>
    </div>
  );
};

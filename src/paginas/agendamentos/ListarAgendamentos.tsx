import React, { useEffect, useState } from "react";
import { Tabela } from "./componentes/Tabela";
import { GridColDef } from '@mui/x-data-grid';

export const ListarAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [colunas, setColunas] = useState<GridColDef[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/listarAgendamentos')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const sampleData = data[0];
          const dynamicColumns = Object.keys(sampleData).map((key, index) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            width: 150,
          }));
          setColunas(dynamicColumns);
          setAgendamentos(data);
        }
      });
  }, []);

  return (
    <div>
      {colunas.length > 0 && agendamentos.length > 0 && (
        <Tabela columns={colunas} rows={agendamentos} />
      )}
    </div>
  );
};

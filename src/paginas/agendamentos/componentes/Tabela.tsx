import * as React from 'react';
import { DataGrid, GridColDef, GridLocaleText } from '@mui/x-data-grid';

const localeText: Partial<GridLocaleText> = {
  // Tradução para o texto da quantidade de linhas por página
  MuiTablePagination: {
    labelRowsPerPage: 'Linhas por página:',
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`,
  },
};

interface TabelaProps {
  columns: GridColDef[];
  rows: any[];
}

export const Tabela: React.FC<TabelaProps> = ({ columns, rows }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        localeText={localeText}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5,10]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'bg-gray-100' : 'bg-white'
        }
        checkboxSelection={false}
      />
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridLocaleText } from '@mui/x-data-grid';

const localeText: Partial<GridLocaleText> = {
  MuiTablePagination: {
    labelRowsPerPage: 'Linhas por página:',
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`,
  },
};

interface TabelaProps {
  columns: GridColDef[];
  rows: any[];
  colunaPesquisa: string;
}

export const Tabela: React.FC<TabelaProps> = ({ columns, rows, colunaPesquisa }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    setFilteredRows(
      rows.filter((row) => {
        const value = row[colunaPesquisa];
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [rows, colunaPesquisa, searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredRows(
      rows.filter((row) => {
        const cellValue = row[colunaPesquisa];
        return cellValue && cellValue.toString().toLowerCase().includes(value);
      })
    );
  };

  return (
    <div className="h-[75vh] w-full mx-auto max-w-6xl">
      <div className="w-full my-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={`Pesquisar por ${colunaPesquisa}`}
          className="px-3 py-2 border border-gray-300 rounded w-full"
        />
      </div>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        localeText={localeText}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'bg-gray-100' : 'bg-white'
        }
        checkboxSelection={false}
        autoHeight
        disableColumnMenu
      />
    </div>
  );
};

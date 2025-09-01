import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridRenderCellParams,
  type GridSortModel,
} from '@mui/x-data-grid';
import type { UserType } from './type';
import { Box, Chip, IconButton, Stack, Tooltip } from '@mui/material';
import {
  Edit as EditIcon,
  PersonOff as PersonOffIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface Props {
  users: UserType[];
  rowCount: number;
  paginationModel: GridPaginationModel;
  setPaginationModel: (model: GridPaginationModel) => void;
  sortModel: GridSortModel;
  setSortModel: (model: GridSortModel) => void;
  handleDelete: (id: number) => void;
  handleDone: (id: number, status: string) => void;
  handleOpenEditDialog: (user: UserType) => void;
}

export const UserTabla = ({ 
  users,
  rowCount,
  paginationModel,
  setPaginationModel,
  setSortModel,
  sortModel,
  handleDelete,
  handleDone,
  handleOpenEditDialog
}: Props) => {
  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 90,
      headerClassName: 'custom-header',
    },
    { 
      field: 'username', 
      headerName: 'Nombre de Usuario', 
      flex: 1,
      headerClassName: 'custom-header',
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ fontWeight: 600, color: '#64A002' }}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 150,
      headerClassName: 'custom-header',
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value === 'active' ? 'Activo' : 'Inactivo'}
          size="small"
          variant="filled"
          sx={{
            fontWeight: 700,
            borderRadius: 3,
            bgcolor: params.value === 'active' ? '#64A002' : '#FE5668',
            color: 'white',
            boxShadow: params.value === 'active' 
              ? '0 2px 8px rgba(100, 160, 2, 0.3)' 
              : '0 2px 8px rgba(254, 86, 104, 0.3)',
            '&:hover': {
              bgcolor: params.value === 'active' ? '#B9D394' : '#FF8D8F',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease',
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      filterable: false,
      width: 200,
      headerClassName: 'custom-header',
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={'row'} spacing={1}>
          <Tooltip title="Editar Usuario">
            <IconButton 
              size="small" 
              onClick={() => handleOpenEditDialog(params.row)}
              sx={{
                color: '#FF8D8F',
                bgcolor: '#0a3364',
                border: '2px solid #FF8D8F',
                '&:hover': {
                  bgcolor: '#FEC1A5',
                  transform: 'scale(1.15)',
                  boxShadow: '0 4px 12px rgba(255, 141, 143, 0.3)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={params.row.status === 'active' ? 'Desactivar Usuario' : 'Activar Usuario'}
          >
            <IconButton
              size="small"
              onClick={() => handleDone(params.row.id, params.row.status)}
              sx={{
                color: 'white',
                bgcolor: params.row.status === 'active' ? '#FE5668' : '#64A002',
                border: `2px solid ${params.row.status === 'active' ? '#FE5668' : '#64A002'}`,
                '&:hover': {
                  bgcolor: params.row.status === 'active' ? '#FF8D8F' : '#B9D394',
                  transform: 'scale(1.15)',
                  boxShadow: params.row.status === 'active' 
                    ? '0 4px 12px rgba(254, 86, 104, 0.4)'
                    : '0 4px 12px rgba(100, 160, 2, 0.4)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {params.row.status === 'active' ? (
                <PersonOffIcon fontSize="small" />
              ) : (
                <PersonIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar Usuario">
            <IconButton
              size="small"
              onClick={() => handleDelete(params.row.id)}
              sx={{
                color: 'white',
                bgcolor: '#d32f2f',
                border: '2px solid #d32f2f',
                '&:hover': {
                  bgcolor: '#f44336',
                  transform: 'scale(1.15)',
                  boxShadow: '0 4px 12px rgba(211, 47, 47, 0.4)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box 
      height={545}
      sx={{
        '& .MuiDataGrid-root': {
          borderRadius: 4,
          border: '3px solid #FEC1A5',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(254, 193, 165, 0.3)',
        },
        '& .custom-header': {
          background: 'linear-gradient(135deg, #FE5668 0%, #FF8D8F 100%)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          textAlign: 'center',
        },
        '& .MuiDataGrid-cell': {
          borderColor: '#FEC1A5',
          py: 1,
        },
        '& .MuiDataGrid-row': {
          '&:hover': {
            bgcolor: '#FEC1A5',
            transform: 'scale(1.005)',
            boxShadow: '0 2px 8px rgba(254, 193, 165, 0.4)',
          },
          '&:nth-of-type(even)': {
            bgcolor: '#FEC1A520',
          },
          transition: 'all 0.2s ease',
        },
        '& .MuiDataGrid-footerContainer': {
          background: '#e3aaaa',
          borderTop: '2px solid #FEC1A5',
          color: 'white',
          fontWeight: 600,
        },
        '& .MuiTablePagination-root': {
          color: 'white',
        },
        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
          color: 'white',
          fontWeight: 600,
        },
        '& .MuiIconButton-root': {
          color: 'white',
        },
      }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortingMode={'server'}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        pageSizeOptions={[5, 10, 20]}
        disableColumnFilter
        disableRowSelectionOnClick
      />
    </Box>
  );
};
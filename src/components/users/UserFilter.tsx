import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import type { UserFilterDoneType } from "./type";

interface Props {
  filterStatus: UserFilterDoneType;
  setFilterStatus: (status: UserFilterDoneType) => void;
  setSearch: (search: string) => void;
}

export const UserFilter = ({ 
  filterStatus,
  setFilterStatus,
  setSearch,
}: Props) => {
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchFilter);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchFilter, setSearch]);

  return (
    <Paper 
      elevation={6} 
      sx={{ 
        p: 2, 
        mb: 3, 
        borderRadius: 4,
        background: 'e4e7e1',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 6px 20px rgba(185, 211, 148, 0.3)',
      }}
    >
      <Toolbar sx={{ gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
        <TextField
          placeholder="Buscar usuario por nombre..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          size="small"
          sx={{ 
            minWidth: 350,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              borderRadius: 3,
              fontWeight: 500,
              '&.Mui-focused fieldset': {
                borderColor: '#FE5668',
                borderWidth: 2,
              },
              '&:hover fieldset': {
                borderColor: '#FF8D8F',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#FE5668',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#64A002' }} />
              </InputAdornment>
            ),
            endAdornment: searchFilter && (
              <InputAdornment position="end">
                <IconButton 
                  size="small" 
                  onClick={() => setSearchFilter('')}
                  sx={{ 
                    color: '#FE5668',
                    '&:hover': { 
                      bgcolor: '#FEC1A5',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControl 
          size="small" 
          sx={{ 
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              borderRadius: 3,
              fontWeight: 500,
              '&.Mui-focused fieldset': {
                borderColor: '#FE5668',
                borderWidth: 2,
              },
              '&:hover fieldset': {
                borderColor: '#FF8D8F',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#FE5668',
              fontWeight: 600,
            },
          }}
        >
          <InputLabel>Estado del Usuario</InputLabel>
          <Select
            value={filterStatus}
            label="Estado del Usuario"
            onChange={(e) => setFilterStatus(e.target.value as UserFilterDoneType)}
          >
            <MenuItem value="all">Todos los usuarios</MenuItem>
            <MenuItem value="active" sx={{ color: '#64A002', fontWeight: 600 }}>
              ✓ Activos
            </MenuItem>
            <MenuItem value="inactive" sx={{ color: '#FE5668', fontWeight: 600 }}>
              ✗ Inactivos
            </MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </Paper>
  );
};
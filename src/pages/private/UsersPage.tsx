import { Box } from "@mui/material";
import {
  UserDialog,
  UserFilter,
  UserHeader,
  UserTabla,
  type UserActionState,
} from '../../components/users';
import { useEffect, useState } from 'react';
import type { UserFilterDoneType, UserType } from '../../components/users/type';
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useAlert, useAxios } from '../../hooks';
import { errorHelper, hanleZodError } from '../../helpers';
import { schemaUser, type UserFormValues } from '../../models';

export const UsersPage = () => {
  const { showAlert } = useAlert();
  const axios = useAxios();

  // Estados para filtros y búsqueda
  const [filterStatus, setFilterStatus] = useState<UserFilterDoneType>('all');
  const [search, setSearch] = useState('');
  
  // Estados para datos y paginación
  const [users, setUsers] = useState<UserType[]>([]);
  const [total, setTotal] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0, // Corregido: debe empezar en 0 para MUI DataGrid
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  
  // Estados para el diálogo
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  // Cargar usuarios cuando cambien los filtros
  useEffect(() => {
    listUsersApi();
  }, [search, filterStatus, paginationModel, sortModel]);

  // Función para obtener usuarios del API
  const listUsersApi = async () => {
    try {
      const orderBy = sortModel[0]?.field;
      const orderDir = sortModel[0]?.sort;
      const response = await axios.get('/users', {
        params: {
          page: paginationModel.page + 1, // El backend espera páginas desde 1
          limit: paginationModel.pageSize,
          orderBy,
          orderDir,
          search,
          status: filterStatus === 'all' ? undefined : filterStatus,
        },
      });
      setUsers(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      showAlert(errorHelper(error), 'error');
    }
  };

  // Funciones para manejar el diálogo
  const handleOpenCreateDialog = () => {
    setOpenDialog(true);
    setSelectedUser(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleOpenEditDialog = (user: UserType) => {
    setOpenDialog(true);
    setSelectedUser(user);
  };

  // Función para crear o editar usuario
  const handleCreateEdit = async (
    _: UserActionState | undefined,
    formdata: FormData
  ): Promise<UserActionState | undefined> => {
    const rawData = {
      username: formdata.get('username') as string,
      password: formdata.get('password') as string,
      confirmPassword: formdata.get('confirmPassword') as string,
    };

    try {
      // Validar datos del formulario
      schemaUser.parse(rawData);
      
      if (selectedUser?.id) {
        // Editar usuario existente
        const updateData = {
          username: rawData.username,
          // Solo incluir password si se proporcionó uno nuevo
          ...(rawData.password && { password: rawData.password })
        };
        await axios.put(`/users/${selectedUser.id}`, updateData);
        showAlert('Usuario actualizado correctamente', 'success');
      } else {
        // Crear nuevo usuario
        await axios.post('/users', {
          username: rawData.username,
          password: rawData.password,
        });
        showAlert('Usuario creado correctamente', 'success');
      }
      
      listUsersApi();
      handleCloseDialog();
      return;
    } catch (error) {
      const err = hanleZodError<UserFormValues>(error, rawData);
      showAlert(err.message, 'error');
      return err;
    }
  };

  // Función para eliminar usuario
  const handleDelete = async (id: number) => {
    try {
      const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.');
      if (!confirmed) return;

      await axios.delete(`/users/${id}`);
      showAlert('Usuario eliminado correctamente', 'success');
      listUsersApi();
    } catch (error) {
      showAlert(errorHelper(error), 'error');
    }
  };

  // Función para activar/desactivar usuario
  const handleToggleStatus = async (id: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const actionText = newStatus === 'active' ? 'activar' : 'desactivar';
      
      const confirmed = window.confirm(`¿Estás seguro de que deseas ${actionText} este usuario?`);
      if (!confirmed) return;

      await axios.patch(`/users/${id}`, { status: newStatus });
      showAlert(`Usuario ${actionText === 'activar' ? 'activado' : 'desactivado'} correctamente`, 'success');
      listUsersApi();
    } catch (error) {
      showAlert(errorHelper(error), 'error');
    }
  };

  return (
    <Box 
      sx={{ 
        width: '100%',
        background: '#e4e7e1',
        minHeight: '100vh',
        p: 3,
        borderRadius: 3,
      }}
    >
      {/* Header con título y botón agregar */}
      <UserHeader handleOpenCreateDialog={handleOpenCreateDialog} />

      {/* Barra de herramientas con filtros y búsquedas */}
      <UserFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setSearch={setSearch}
      />

      {/* Tabla de usuarios */}
      <UserTabla 
        users={users}         
        rowCount={total}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        sortModel={sortModel}
        setSortModel={setSortModel}
        handleDelete={handleDelete}
        handleDone={handleToggleStatus}
        handleOpenEditDialog={handleOpenEditDialog}
      />

      {/* Diálogo para crear/editar usuario */}
      <UserDialog
        open={openDialog}
        user={selectedUser}
        onClose={handleCloseDialog}
        handleCreateEdit={handleCreateEdit}
      />
    </Box>
  );
};
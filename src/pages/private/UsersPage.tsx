import { Box } from "@mui/material";
import {
  UserDialog,
  UserFilter,
  UserHeader1,
  UserTabla1,
  type UserActionState,
} from '../../components';

import { useEffect, useState } from 'react';
import type { UserFilterDoneType, UserType } from '../../components/users/type';
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useAlert, useAxios } from '../../hooks';
import { errorHelper, hanleZodError } from '../../helpers';
import { schemaUser, type UserFormValues1 } from '../../models';

export const UsersPage = () =>{
  const { showAlert } = useAlert();
  const axios = useAxios();

  const [filterStatus, setFilterStatus] = useState<UserFilterDoneType>('all');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<UserType[]>([]);
  const [total, setTotal] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const handleNewUser = () => {
    console.log('Nueva Tarea');
  };

  useEffect(() => {
    listUserApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterStatus, paginationModel, sortModel]);



  const listUserApi = async () => {
    try {
      const orderBy = sortModel[0]?.field;
      const orderDir = sortModel[0]?.sort;
      const response = await axios.get('/users', {
        params: {
          page: paginationModel.page + 1,
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
  const handleOpenCreateDialog = () => {
    setOpenDialog(true);
    setUser(null);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUser(null);
    //console.log(rawData);
  };

  const handleOpenEditDialog = (user: UserType) => {
    setOpenDialog(true);
    setUser(user);
  };

const handleCreateEdit = async (
    _: UserActionState | undefined,
    formdata: FormData
  ) => {
    const rawData = {
      username: formdata.get('username') as string,
      password: formdata.get('password') as string,
      confirmPassword: formdata.get('confirmPassword') as string,
    };

    try {
      schemaUser.parse(rawData);
      if (user?.id) {
        await axios.put(`/users/${user.id}`, rawData);
        showAlert('Usuario editada', 'success');
      } else {
        await axios.post('/users', rawData);
        showAlert('Usuario creada', 'success');
      }
      listUserApi();
      handleCloseDialog();
      return;
    } catch (error) {
      const err = hanleZodError<UserFormValues1>(error, rawData);
      showAlert(err.message, 'error');
      //console.log(err);
      return err;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const confirmed = window.confirm('¿Estas seguro de eliminar?');
      if (!confirmed) return;

      await axios.delete(`/users/${id}`);
      showAlert('Usuario eliminado', 'success');
      listUserApi();
    } catch (error) {
      showAlert(errorHelper(error), 'error');
    }
  };

  const handleDone = async (id: number, status: string) => {
    try {
      const confirmed = window.confirm(
        '¿Estas seguro de que quieres cambiar el estado?'
      );
      if (!confirmed) return;
      await axios.patch(`/users/${id}`, { status: status === 'active' ? 'inactive' : 'active' });
      showAlert('Usuario modificada', 'success');
      listUserApi();
    } catch (error) {
      showAlert(errorHelper(error), 'error');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
        {/* Header con titulo y boton agregar */}
        <UserHeader1 handleOpenCreateDialog={handleOpenCreateDialog} />

        {/* Barra de herramientas con filtros y busquedas */}
        <UserFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setSearch={setSearch}
      ></UserFilter>
    
        {/* Tabla */}
      
      
      <UserTabla1 
        users={ users }         
        rowCount={total}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        sortModel={sortModel}
        setSortModel={setSortModel}
        handleDelete={handleDelete}
        handleDone={handleDone}
        handleOpenEditDialog={handleOpenEditDialog}
        />
        {/* Dialog */}
        <UserDialog
        open={openDialog}
        user={user}
        onClose={handleCloseDialog}
        handleCreateEdit={handleCreateEdit}
      />


    </Box>);
}
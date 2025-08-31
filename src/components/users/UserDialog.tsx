import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import type { UserType } from './type';
import { useActionState } from 'react';
import type { ActionState } from '../../interfaces';
import type { UserFormValues1 } from '../../models';
import { createInitialState } from '../../helpers';

export type UserActionState = ActionState<UserFormValues1>;

interface Props {
  open: boolean;
  user?: UserType | null;
  onClose: () => void;
  handleCreateEdit: (
    _: UserActionState | undefined,
    formData: FormData
  ) => Promise<UserActionState | undefined>;
}
export const UserDialog = ({ onClose, open, user, handleCreateEdit }: Props) => {
  const initialState = createInitialState<UserFormValues1>();

  const [state, submitAction, isPending] = useActionState(
    handleCreateEdit,
    initialState
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth>
      <DialogTitle>{user ? 'Editar usuario' : 'Nueva usuario'}</DialogTitle>
      <Box key={user?.id ?? 'new'} component={'form'} action={submitAction}>
        <DialogContent>
          <TextField
            name="username"
            autoFocus
            margin="dense"
            label="Nombre de usuario"
            fullWidth
            required
            variant="outlined"
            disabled={isPending}
            defaultValue={state?.formData?.username || user?.username || ''}
            error={!!state?.errors?.username}
            helperText={state?.errors?.username}
            sx={{ mb: 2 }}
          />
          <TextField
            name="password"
            autoFocus
            margin="dense"
            label="Pssword"
            fullWidth
            required
            variant="outlined"
            disabled={isPending}
            defaultValue={state?.formData?.password || user?.password|| ''}
            error={!!state?.errors?.password}
            helperText={state?.errors?.password}
            sx={{ mb: 2 }}
          />
          <TextField
            name="confirmPassword"
            autoFocus
            margin="dense"
            label="Pssword"
            fullWidth
            required
            variant="outlined"
            disabled={isPending}
            defaultValue={state?.formData?.confirmPassword || user?.confirmPassword|| ''}
            error={!!state?.errors?.confirmPassword}
            helperText={state?.errors?.confirmPassword}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit" disabled={isPending}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            startIcon={isPending ? <CircularProgress /> : null}
          >
            {user ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { UserType } from './type';
import { useActionState, useState } from 'react';
import type { ActionState } from '../../interfaces';
import type { UserFormValues } from '../../models';
import { createInitialState } from '../../helpers';

export type UserActionState = ActionState<UserFormValues>;

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
  const initialState = createInitialState<UserFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, submitAction, isPending] = useActionState(
    handleCreateEdit,
    initialState
  );

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth>
      <DialogTitle 
        sx={{ 
          bgcolor: '#FE5668', 
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
          py: 3,
        }}
      >
        {user ? 'Editar Usuario' : 'Nuevo Usuario'}
      </DialogTitle>
      <Box key={user?.id ?? 'new'} component={'form'} action={submitAction}>
        <DialogContent sx={{ mt: 2, bgcolor: '#FEC1A5', py: 3 }}>
          <TextField
            name="username"
            autoFocus
            margin="dense"
            label="Nombre de Usuario"
            fullWidth
            required
            variant="outlined"
            disabled={isPending}
            defaultValue={state?.formData?.username || user?.username || ''}
            error={!!state?.errors?.username}
            helperText={state?.errors?.username}
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'white',
                borderRadius: 2,
                '&.Mui-focused fieldset': {
                  borderColor: '#FE5668',
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FE5668',
                fontWeight: 600,
              },
            }}
          />
          
          <TextField
            name="password"
            margin="dense"
            label="Contraseña"
            fullWidth
            required
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            disabled={isPending}
            defaultValue={state?.formData?.password || ''}
            error={!!state?.errors?.password}
            helperText={state?.errors?.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    disabled={isPending}
                    sx={{ color: '#FE5668' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'white',
                borderRadius: 2,
                '&.Mui-focused fieldset': {
                  borderColor: '#FE5668',
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FE5668',
                fontWeight: 600,
              },
            }}
          />

          {!user && (
            <TextField
              name="confirmPassword"
              margin="dense"
              label="Confirmar Contraseña"
              fullWidth
              required
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              disabled={isPending}
              defaultValue={state?.formData?.confirmPassword || ''}
              error={!!state?.errors?.confirmPassword}
              helperText={state?.errors?.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                      disabled={isPending}
                      sx={{ color: '#FE5668' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  borderRadius: 2,
                  '&.Mui-focused fieldset': {
                    borderColor: '#FE5668',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#FE5668',
                  fontWeight: 600,
                },
              }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: '#FF8D8F', gap: 2 }}>
          <Button 
            onClick={onClose} 
            disabled={isPending}
            sx={{
              borderRadius: 3,
              fontWeight: 600,
              px: 3,
              py: 1,
              border: '2px solid white',
              color: '#FE5668',
              bgcolor: 'white',
              '&:hover': {
                bgcolor: '#FEC1A5',
                border: '2px solid #FE5668',
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            startIcon={isPending ? <CircularProgress size={16} /> : null}
            sx={{
              bgcolor: '#e4e7e1',
              borderRadius: 3,
              fontWeight: 600,
              px: 4,
              py: 1,
              boxShadow: 'e4e7e1',
              '&:hover': {
                bgcolor: '#B9D394',
                transform: 'translateY(-1px)',
                boxShadow: '#e4e7e1',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {user ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
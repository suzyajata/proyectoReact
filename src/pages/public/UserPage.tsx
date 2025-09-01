import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useActionState } from 'react';
import { Visibility, VisibilityOff, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import type { ActionState } from '../../interfaces';
import { schemaUser, type UserFormValues } from '../../models';
import { createInitialState, hanleZodError } from '../../helpers';
import { useAlert, useAxios } from '../../hooks';
import { Link, useNavigate } from 'react-router-dom';

type UserActionState = ActionState<UserFormValues>;
const initialState = createInitialState<UserFormValues>();

export const UserPage = () => {
  const axios = useAxios();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const createUserApi = async (
    _: UserActionState | undefined,
    formData: FormData
  ) => {
    const rawData: UserFormValues = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };
    
    try {
      schemaUser.parse(rawData);
      await axios.post('/users', {
        username: rawData.username,
        password: rawData.password,
      });
      showAlert('Usuario creado exitosamente', 'success');
      navigate('/login');
    } catch (error) {
      const err = hanleZodError<UserFormValues>(error, rawData);
      showAlert(err.message, 'error');
      return err;
    }
  };

  const [state, submitAction, isPending] = useActionState(
    createUserApi,
    initialState
  );

  return (
    <Container
      maxWidth={false}
      sx={{
        background: 'linear-gradient(135deg, #FE5668 0%, #FF8D8F 25%, #FEC1A5 50%, #B9D394 75%, #64A002 100%)',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: '100%',
        }}
      >
        <Paper 
          elevation={20} 
          sx={{ 
            p: 5,
            borderRadius: 6,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '3px solid rgba(100, 160, 2, 0.3)',
            boxShadow: '0 20px 40px rgba(100, 160, 2, 0.3)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <PersonAddIcon 
              sx={{ 
                fontSize: 60, 
                color: '#64A002',
                mb: 2,
                filter: 'drop-shadow(2px 2px 4px rgba(100, 160, 2, 0.3))',
              }} 
            />
            <Typography 
              component={'h1'} 
              variant="h3" 
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #64A002 0%, #FE5668 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              NUEVO USUARIO
            </Typography>

            <Typography 
              variant="h6" 
              sx={{ 
                color: '#FE5668',
                fontWeight: 600,
                mb: 3,
              }}
            >
              Crea tu cuenta para comenzar
            </Typography>
          </Box>

          <Box action={submitAction} component={'form'} sx={{ width: '100%' }}>
            <TextField
              name="username"
              margin="normal"
              required
              fullWidth
              label="Nombre de Usuario"
              autoComplete="username"
              autoFocus
              type="text"
              disabled={isPending}
              defaultValue={state?.formData?.username}
              error={!!state?.errors?.username}
              helperText={state?.errors?.username}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'white',
                  '&.Mui-focused fieldset': {
                    borderColor: '#64A002',
                    borderWidth: 2,
                  },
                  '&:hover fieldset': {
                    borderColor: '#B9D394',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#64A002',
                  fontWeight: 600,
                },
              }}
            />

            <TextField
              name="password"
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              disabled={isPending}
              defaultValue={state?.formData?.password}
              error={!!state?.errors?.password}
              helperText={state?.errors?.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      disabled={isPending}
                      sx={{ 
                        color: '#64A002',
                        '&:hover': {
                          bgcolor: '#B9D394',
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'white',
                  '&.Mui-focused fieldset': {
                    borderColor: '#64A002',
                    borderWidth: 2,
                  },
                  '&:hover fieldset': {
                    borderColor: '#B9D394',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#64A002',
                  fontWeight: 600,
                },
              }}
            />

            <TextField
              name="confirmPassword"
              margin="normal"
              required
              fullWidth
              label="Confirmar Contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              disabled={isPending}
              defaultValue={state?.formData?.confirmPassword}
              error={!!state?.errors?.confirmPassword}
              helperText={state?.errors?.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                      disabled={isPending}
                      sx={{ 
                        color: '#64A002',
                        '&:hover': {
                          bgcolor: '#B9D394',
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'white',
                  '&.Mui-focused fieldset': {
                    borderColor: '#64A002',
                    borderWidth: 2,
                  },
                  '&:hover fieldset': {
                    borderColor: '#B9D394',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#64A002',
                  fontWeight: 600,
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isPending}
              startIcon={
                isPending ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <PersonAddIcon />
                )
              }
              sx={{ 
                mt: 2, 
                mb: 3, 
                height: 56,
                borderRadius: 4,
                fontSize: '1.2rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #FE5668 0%, #FF8D8F 100%)',
                boxShadow: '0 8px 20px rgba(254, 86, 104, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF8D8F 0%, #FE5668 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(254, 86, 104, 0.5)',
                },
                '&:disabled': {
                  background: '#FEC1A5',
                  color: 'white',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {isPending ? 'Registrando usuario...' : 'Registrar Usuario'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link 
                to="/login"
                style={{
                  color: '#64A002',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  border: '2px solid #64A002',
                  background: 'white',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#64A002';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#64A002';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ← Volver al Login
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
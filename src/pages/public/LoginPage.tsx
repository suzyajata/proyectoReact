import {
  Alert,
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
import { useActionState, useState } from 'react';
import { shemaLogin, type LoginFormValues } from '../../models';
import type { ActionState } from '../../interfaces';
import { createInitialState, hanleZodError } from '../../helpers';
import { useAlert, useAuth, useAxios } from '../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';

export type LoginActionState = ActionState<LoginFormValues>;
const initialState = createInitialState<LoginFormValues>();

export const LoginPage = () => {
  const axios = useAxios();
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginApi = async (
    _: LoginActionState | undefined,
    formData: FormData
  ) => {
    const rawData: LoginFormValues = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    try {
      shemaLogin.parse(rawData);
      const response = await axios.post('/login', rawData);
      
      if (!response?.data?.token) {
        throw new Error('No se pudo obtener el token de autenticación');
      }
      
      login(response.data.token, { username: rawData.username });
      showAlert(`¡Bienvenido ${rawData.username}!`, 'success');
      navigate('/perfil');
    } catch (error) {
      const err = hanleZodError<LoginFormValues>(error, rawData);
      showAlert(err.message, 'error');
      return err;
    }
  };

  const [state, submitAction, isPending] = useActionState(
    loginApi,
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
          maxWidth: 450,
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
            border: '3px solid rgba(254, 86, 104, 0.3)',
            boxShadow: '0 20px 40px rgba(254, 86, 104, 0.3)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <LoginIcon 
              sx={{ 
                fontSize: 60, 
                color: '#FE5668',
                mb: 2,
                filter: 'drop-shadow(2px 2px 4px rgba(254, 86, 104, 0.3))',
              }} 
            />
            <Typography 
              component={'h1'} 
              variant="h3" 
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #FE5668 0%, #64A002 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              BIENVENIDO
            </Typography>

            <Typography 
              variant="h6" 
              sx={{ 
                color: '#64A002',
                fontWeight: 600,
                mb: 3,
              }}
            >
              Proyecto Diplomado con React 19
            </Typography>
          </Box>

          {/* Alerta de errores */}
          {Object.keys(state?.errors ?? {}).length !== 0 && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                borderRadius: 3,
                bgcolor: '#FE5668',
                color: 'white',
                '& .MuiAlert-icon': {
                  color: 'white',
                },
              }}
            >
              {state?.message}
            </Alert>
          )}

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
                        color: '#FE5668',
                        '&:hover': {
                          bgcolor: '#FEC1A5',
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
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'white',
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
                  <LoginIcon />
                )
              }
              sx={{ 
                mt: 2, 
                mb: 3, 
                height: 56,
                borderRadius: 4,
                fontSize: '1.2rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #64A002 0%, #B9D394 100%)',
                boxShadow: '0 8px 20px rgba(100, 160, 2, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #B9D394 0%, #64A002 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(100, 160, 2, 0.5)',
                },
                '&:disabled': {
                  background: '#FEC1A5',
                  color: 'white',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {isPending ? 'Iniciando sesión...' : 'Ingresar'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link 
                to='/userRegister'
                style={{
                  color: '#FE5668',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  border: '2px solid #FE5668',
                  background: 'white',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FE5668';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#FE5668';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Registrar nuevo usuario
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
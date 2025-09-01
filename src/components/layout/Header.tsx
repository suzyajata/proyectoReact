import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import type { MenuType } from './types';

interface Props {
  username?: string;
  menuOptions: MenuType[];
  logout: () => void;
}

export const Header = ({ username, menuOptions, logout }: Props) => {
  const getPageTitle = () => {
    const currentOption = menuOptions.find(
      (option) => option.path === location.pathname
    );
    return currentOption?.text || 'Mi App';
  };

  return (
    <AppBar
      position="fixed"
      elevation={8}
      sx={{
        background: 'linear-gradient(135deg, #FE5668 0%, #FF8D8F 100%)',
        boxShadow: '0 4px 20px rgba(254, 86, 104, 0.3)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Typography 
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: '0.5px',
          }}
        >
          {getPageTitle()}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: '#64A002',
              border: '3px solid white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              boxShadow: '0 4px 12px rgba(100, 160, 2, 0.4)',
            }}
          >
            {username?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: 'white',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            {username || 'Usuario'}
          </Typography>
          <Button
            color="inherit"
            onClick={logout}
            startIcon={<LogoutIcon />}
            sx={{
              fontWeight: 600,
              borderRadius: 3,
              px: 3,
              py: 1,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                bgcolor: 'white',
                color: '#FE5668',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Salir
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
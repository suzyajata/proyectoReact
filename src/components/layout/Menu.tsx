import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import type { MenuType } from './types';
import { useNavigate } from 'react-router-dom';

interface Props {
  menuOptions: MenuType[];
}

export const Menu = ({ menuOptions }: Props) => {
  const drawerWidth = 280;
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: '#e3aaaa',
          border: 'none',
          boxShadow: '4px 0 20px rgba(100, 160, 2, 0.2)',
        },
        zIndex: 1
      }}
    >
      <Toolbar />

      {/* Menú de navegación */}
      <List sx={{ px: 2, py: 3 }}>
        {menuOptions.map((option) => (
          <ListItem key={option.text} disablePadding sx={{ mb: 2 }}>
            <ListItemButton
              onClick={() => navigate(option.path)}
              selected={location.pathname === option.path}
              sx={{
                borderRadius: 4,
                py: 2,
                px: 3,
                color: 'white',
                fontWeight: 600,
                '&.Mui-selected': {
                  bgcolor: '#FE5668',
                  color: 'white',
                  boxShadow: '0 6px 16px rgba(254, 86, 104, 0.4)',
                  transform: 'scale(1.02)',
                  '&:hover': { 
                    bgcolor: '#FF8D8F',
                    transform: 'scale(1.05)',
                  },
                },
                '&:not(.Mui-selected)': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateX(5px)',
                    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                  },
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === option.path ? 'white' : 'white',
                  minWidth: 45,
                  '& svg': {
                    fontSize: '1.5rem',
                  },
                }}
              >
                {option.icon}
              </ListItemIcon>
              <ListItemText 
                primary={option.text}
                primaryTypographyProps={{
                  fontSize: '1.1rem',
                  fontWeight: location.pathname === option.path ? 700 : 600,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
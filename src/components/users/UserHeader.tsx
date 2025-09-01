import { Box, Button, Typography } from "@mui/material";
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';

interface Props {
  handleOpenCreateDialog: () => void;
}

export const UserHeader = ({ handleOpenCreateDialog }: Props) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        p: 3,
        background: 'linear-gradient(135deg, #FE5668 0%, #FF8D8F 100%)',
        borderRadius: 4,
        boxShadow: '0 8px 24px rgba(254, 86, 104, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <Typography 
        variant="h4" 
        sx={{
          fontWeight: 'bold',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          letterSpacing: '0.5px',
        }}
      >
        Gestión de Usuarios
      </Typography>
      <Button
        variant="contained"
        startIcon={<PersonAddIcon />}
        onClick={handleOpenCreateDialog}
        sx={{ 
          borderRadius: 4,
          bgcolor: '#64A002',
          fontWeight: 700,
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          boxShadow: '0 6px 16px rgba(100, 160, 2, 0.4)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          '&:hover': {
            bgcolor: '#B9D394',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(100, 160, 2, 0.5)',
          },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        Nuevo Usuario
      </Button>
    </Box>
  );
};
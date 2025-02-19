import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import LiquorIcon from '@mui/icons-material/Liquor';

import { useNavigate } from 'react-router-dom';
import AnonymousMenu from './AnounymousMenu.tsx';
import { useAppSelector } from '../../../store/hooks.ts';
import { selectUser } from '../../../features/Users/usersSlice.ts';
import UserMenu from './UserMenu.tsx';

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const goToMainPage = () => {
    navigate('/');
  };
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar sx={{ background: 'purple' }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
            <LiquorIcon />
          </IconButton>
          <Typography onClick={goToMainPage} variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
            Cocktails
          </Typography>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolBar;

import { IUser } from '../../../types';
import { useState } from 'react';

import { logOutThunk } from '../../../features/Users/usersThunk.ts';
import { unsetUser } from '../../../features/Users/usersSlice.ts';
import { Button, CardMedia, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks.ts';
import { apiUrl } from '../../../GlobalConstant.ts';

export interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let pic: string = '';

  if (user.avatar) {
    if (user.googleId) {
      pic = user.avatar;
    } else {
      pic = apiUrl + '/' + user.avatar;
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    await dispatch(logOutThunk());
    dispatch(unsetUser());
    navigate('/');
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        <Typography mr={2} variant="body2" component="p" color="inherit">
          Welcome
        </Typography>
        <strong
          style={{
            textDecoration: 'underline',
            marginRight: '30px',
          }}
        >
          {user.displayName}
        </strong>
        <CardMedia component="img" image={pic} style={{ width: '80px', height: '80px' }} title={user.displayName} />
      </Button>
      <Menu anchorEl={anchorEl} onClose={handleClose} keepMounted open={Boolean(anchorEl)}>
        {user.role == 'user' && <MenuItem onClick={() => navigate('/myCocktails')}>My Cocktails</MenuItem>}
        {user.role == 'user' && <MenuItem onClick={() => navigate('/addCocktail')}>Add Cocktails</MenuItem>}
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;

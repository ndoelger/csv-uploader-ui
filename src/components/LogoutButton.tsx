import { useAuth0 } from '@auth0/auth0-react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Paper } from '@mui/material';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Paper>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        style={{ position: 'absolute', right: '10px', top: '10px' }}
      >
        <LogoutIcon />
      </button>
    </Paper>
  );
};

export default LogoutButton;

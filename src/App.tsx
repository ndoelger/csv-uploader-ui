import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import ExistingCSV from './components/CSVList';
import UploadCSV from './components/UploadCSV';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { user, isAuthenticated } = useAuth0();

  

  console.log(user?.sub?.split('|')[1], isAuthenticated);
  return !isAuthenticated ? (
    <LoginButton />
  ) : (
    <>
      <LogoutButton />
      <UploadCSV userId={user?.sub?.split('|')[1]} />
      <ExistingCSV userId={user?.sub?.split('|')[1]} />
    </>
  );
}

export default App;
